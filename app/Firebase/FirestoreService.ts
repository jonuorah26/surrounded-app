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
import { emptyParty, PartyData } from "../Store/PartyReducer";
import {
  DB_PROPERTY_LABELS,
  PARTICIPANTS,
  PARTIES,
} from "../Constants/DbConstants";
import { copyMatchingProperties, generatePartyCode } from "./HelperFunctions";

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

export const findParty = async (partyCode: string) => {
  try {
    const partyQuery = query(
      collection(db, PARTIES),
      where(DB_PROPERTY_LABELS.partyCode, "==", partyCode),
      where(DB_PROPERTY_LABELS.isEnded, "==", false)
    );

    const result = await getDocs(partyQuery);
    if (result.empty || result.docs.length > 1) {
      return null;
    }

    const partyDoc = result.docs[0];
    const partyId = partyDoc.id;
    var partyData = emptyParty;
    partyData = copyMatchingProperties(partyDoc.data(), partyData) as PartyData;

    return { partyId, partyData };
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const addParticipantToParty = async (
  participantName: string,
  partyId: string
) => {
  try {
    var participantRef = doc(collection(db, PARTIES, partyId, PARTICIPANTS));
    const participantId = `p_${participantRef.id}`;
    participantRef = doc(db, PARTIES, partyId, PARTICIPANTS, participantId);

    await setDoc(participantRef, {
      participantName,
      isDisabled: false,
      isFlagRaised: false,
      isOnline: true,
    });
    return { participantId };
  } catch (err) {
    console.error(err);
    return null;
  }
};
