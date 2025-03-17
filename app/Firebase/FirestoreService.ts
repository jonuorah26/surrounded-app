import {
  and,
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "./FirebaseConfig";
import { useSelector } from "react-redux";
import { RootState } from "../Store/Store";
import { PartyData } from "../Store/ModeratorReducer";

const PARTIES = "Parties";
const PARTICIPANTS = "Participants";

export const DB_PROPERTY_LABELS = {
  flagSystem: "flagSystem",
  flagsRaisedCount: "flagsRaisedCount",
  minParticipants: "minParticipants",
  maxParticipants: "maxParticipants",
  participantCount: "participantCount",
  maxSameAsMin: "maxSameAsMin",
  allowParticipantsDuringSession: "allowParticipantsDuringSession",
  voteOutThresholdType: "voteOutThresholdType",
  customVoteOutThreshold: "customVoteOutThreshold",
  partyCode: "partyCode",
  isPaused: "isPaused",
  isStarted: "isStarted",
  isEnded: "isEnded",

  participantName: "participantName",
  isDisabled: "isDisabled",
  isFlagRaised: "isFlagRaised",
  isOnline: "isOnline",
};

export const modifyPartyData = async (
  partyId: string,
  data: Partial<Record<string, any>>,
  wait: boolean = true,
  retries: number = 3,
  delay: number = 1000
) => {
  try {
    var partyRef = doc(db, PARTIES, partyId);
    if (wait) {
      await updateDoc(partyRef, data);
    } else {
      updateDoc(partyRef, data).catch((err) => {
        console.error(`Error updating party ${partyId}:`, err);
        // if (retries > 0) {
        //   setTimeout(
        //     () => modifyPartyData(partyId, data, wait, retries - 1, delay * 2),
        //     delay
        //   ); //try again
        // } else {
        //   console.error(
        //     `Max retries reached. Could not update party ${partyId}`
        //   );
        // }
      });
    }
  } catch (err) {
    console.error(`Error updating party ${partyId}:`, err);
    // if (retries > 0) {
    //   setTimeout(
    //     () => modifyPartyData(partyId, data, wait, retries - 1, delay * 2),
    //     delay
    //   ); //try again
    // } else {
    //   console.error(`Max retries reached. Could not update party ${partyId}`);
    // }
  }
};

export const createParty = async (moderatorData: PartyData) => {
  const partyCode = await generatePartyCode();
  var partyRef = doc(collection(db, PARTIES));
  const partyId = `party_${partyRef.id}`;
  partyRef = doc(db, PARTIES, partyId);

  try {
    await setDoc(partyRef, {
      ...moderatorData,
      partyCode,
      createdAt: new Date(),
    });

    return { partyId, partyCode };
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const addParticipant = async (
  participantName: string,
  partyCode: string
) => {
  const partyQuery = query(
    collection(db, PARTIES),
    where(DB_PROPERTY_LABELS.partyCode, "==", partyCode),
    where(DB_PROPERTY_LABELS.isEnded, "==", false)
  );

  const result = await getDocs(partyQuery);
  if (result.empty || result.docs.length > 1) {
    return {};
  }

  const partyDoc = result.docs[0];
  const partyId = partyDoc.id;
  const partyData = partyDoc.data() as PartyData;

  var participantRef = doc(collection(db, PARTIES, partyId, PARTICIPANTS));
  const participantId = `p_${participantRef.id}`;
  participantRef = doc(db, PARTIES, partyId, PARTICIPANTS, participantId);

  try {
    await setDoc(participantRef, {
      participantName,
      isDisabled: false,
      isFlagRaised: false,
      isOnline: true,
    });
    return { partyId, participantId };
  } catch (err) {
    console.error(err);
    return null;
  }
};

const generatePartyCode = async () => {
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
