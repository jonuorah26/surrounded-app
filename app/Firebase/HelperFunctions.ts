import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./FirebaseConfig";
import { DB_PROPERTY_LABELS, PARTIES } from "../Constants/DbConstants";

export const generatePartyCode = async () => {
  var codeIsUnique = false;
  var code = "";
  while (!codeIsUnique) {
    code = generateRandomCode();
    const partyQuery = query(
      collection(db, PARTIES),
      where(DB_PROPERTY_LABELS.partyCode, "==", code),
      where(DB_PROPERTY_LABELS.isEnded, "==", false)
    );

    const result = await getDocs(partyQuery);
    codeIsUnique = result.empty;
  }
  return code;
};

const generateRandomCode = () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let partyCode = "";
  for (let i = 0; i < 8; i++) {
    partyCode += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }
  return partyCode;
};

export const copyMatchingProperties = (
  source: Record<string, any>,
  target: Record<string, any>
) => {
  return Object.keys(target).reduce((acc, key) => {
    if (key in source) {
      acc[key] = source[key]; // Copy only existing keys
    }
    return acc;
  }, {} as Record<string, any>);
};
