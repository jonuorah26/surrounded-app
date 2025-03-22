import {
  and,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  runTransaction,
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
import { Flag, ParticipantData } from "../Store/ParticipantReducer";
import { AppError } from "./Types";

export const modifyFlag = async (
  partyId: string,
  participantId: string,
  flag: Flag
) => {
  try {
    const partyRef = doc(db, PARTIES, partyId);
    const participantRef = doc(
      db,
      PARTIES,
      partyId,
      PARTICIPANTS,
      participantId
    );

    await runTransaction(db, async (transaction) => {
      const partyDoc = await transaction.get(partyRef);
      if (!partyDoc.exists()) {
        throw new AppError("Party does not exist");
      }

      const partyData = partyDoc.data() as PartyData;
      if (partyData.isEnded) {
        throw new AppError("This party no longer exists");
      }

      // Update participant's flag
      transaction.update(participantRef, {
        flag,
      } as Partial<ParticipantData>);

      const flagsRaisedCount = partyData.flagsRaisedCount;
      const newFlagRaisedCount = flag.raised
        ? flagsRaisedCount + 1
        : flagsRaisedCount - 1;

      // Increment flag count safely
      transaction.update(partyRef, {
        flagsRaisedCount: newFlagRaisedCount,
      } as Partial<PartyData>);
    });
  } catch (err) {
    throw err;
  }
};

export const endParty = async (partyId: string, wait = true) => {
  try {
    var partyRef = doc(db, PARTIES, partyId);
    if (wait) {
      await updateDoc(partyRef, { isEnded: true } as Partial<PartyData>);
    } else {
      updateDoc(partyRef, { isEnded: true } as Partial<PartyData>);
    }
  } catch (err) {
    throw err;
  }
};

export const startParty = async (partyId: string) => {
  try {
    var partyRef = doc(db, PARTIES, partyId);
    await updateDoc(partyRef, { isStarted: true } as Partial<PartyData>);
  } catch (err) {
    throw err;
  }
};

// export const modifyPartyData = async (
//   partyId: string,
//   data: Partial<PartyData>,
//   wait: boolean = true,
//   retries: number = 3,
//   delay: number = 1000
// ) => {
//   try {
//     var partyRef = doc(db, PARTIES, partyId);
//     if (wait) {
//       await updateDoc(partyRef, data);
//     } else {
//       updateDoc(partyRef, data).catch((err) => {
//         console.error(`Error updating party ${partyId}:`, err);
//         // if (retries > 0) {
//         //   setTimeout(
//         //     () => modifyPartyData(partyId, data, wait, retries - 1, delay * 2),
//         //     delay
//         //   ); //try again
//         // } else {
//         //   console.error(
//         //     `Max retries reached. Could not update party ${partyId}`
//         //   );
//         // }
//       });
//     }
//   } catch (err) {
//     console.error(`Error updating party ${partyId}:`, err);
//     // if (retries > 0) {
//     //   setTimeout(
//     //     () => modifyPartyData(partyId, data, wait, retries - 1, delay * 2),
//     //     delay
//     //   ); //try again
//     // } else {
//     //   console.error(`Max retries reached. Could not update party ${partyId}`);
//     // }
//   }
// };

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
    throw err;
  }
};

export const addParticipantToParty = async (
  participantName: string,
  partyId: string
) => {
  try {
    const partyRef = doc(db, PARTIES, partyId);
    const participantRef = doc(collection(db, PARTIES, partyId, PARTICIPANTS));

    return await runTransaction(db, async (transaction) => {
      const partyDoc = await transaction.get(partyRef);
      if (!partyDoc.exists()) {
        throw new AppError("Party does not exist");
      }

      const partyData = partyDoc.data() as PartyData;
      if (partyData.isEnded) {
        throw new AppError("Party no longer exists");
      }

      // Generate participant ID
      const participantId = `p_${participantRef.id}`;
      const newParticipantRef = doc(
        db,
        PARTIES,
        partyId,
        PARTICIPANTS,
        participantId
      );

      const newParticipantCount = partyData.participantCount + 1;
      const max = partyData.maxParticipants;
      if (max && newParticipantCount > max) {
        throw new AppError("Failed to join. Party is at capacity.");
      }

      // Add new participant
      transaction.set(newParticipantRef, {
        participantName,
        isDisabled: false,
        flag: { raised: false, lastChangeBy: "moderator" },
        isOnline: true,
      } as ParticipantData);

      // Increment participant count safely
      transaction.update(partyRef, {
        participantCount: newParticipantCount,
      } as Partial<PartyData>);

      return {
        participantId,
        participantCount: newParticipantCount,
      };
    });
  } catch (err) {
    throw err;
  }
};
