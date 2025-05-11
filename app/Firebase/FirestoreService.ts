import {
  and,
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  QueryDocumentSnapshot,
  runTransaction,
  setDoc,
  startAfter,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import { db } from "./FirebaseConfig";
import {
  emptyParty,
  ParticipantInSeat,
  PartyData,
} from "../Store/PartyReducer";
import {
  DB_PROPERTY_LABELS,
  PARTICIPANTS,
  PARTIES,
} from "../Constants/DbConstants";
import { copyMatchingProperties, generatePartyCode } from "./HelperFunctions";
import {
  emptyParticipant,
  Flag,
  ParticipantData,
} from "../Store/ParticipantReducer";
import { AppError } from "./Types";
import { ref } from "firebase/database";
import {
  removeParticipantPresenceracking,
  stopPresenceUpdates,
} from "./RealtimePresenceService";
import { ParticipantItem, ParticipantItemMap } from "../Types";

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

export const modifyPause = async (partyId: string, pause: boolean) => {
  try {
    var partyRef = doc(db, PARTIES, partyId);

    await updateDoc(partyRef, { isPaused: pause } as Partial<PartyData>);
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

export const createParty = async (partyData: PartyData) => {
  const partyCode = await generatePartyCode();
  var partyRef = doc(collection(db, PARTIES));
  const partyId = `party_${partyRef.id}`;

  partyData.id = partyId;
  partyData.partyCode = partyCode;

  partyRef = doc(db, PARTIES, partyId);

  try {
    await setDoc(partyRef, {
      ...partyData,
      createdAt: new Date(),
    });

    return { partyId, partyCode };
  } catch (err) {
    throw err;
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
      throw new AppError("Could not find party");
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

export const fetchParty = async (partyId: string) => {
  try {
    const partyRef = doc(db, PARTIES, partyId);

    const result = await getDoc(partyRef);
    if (!result.exists()) {
      throw new AppError("Could not find party");
    }

    const partyDoc = result.data() as PartyData;
    if (partyDoc.isEnded) {
      throw new AppError("Party no longer exists");
    }

    var partyData = JSON.parse(JSON.stringify(emptyParty));
    partyData = copyMatchingProperties(partyDoc, partyData) as PartyData;

    return { partyData };
  } catch (err) {
    throw err;
  }
};

export const fetchParticipant = async (
  partyId: string,
  participantId: string
) => {
  try {
    const participantRef = doc(
      db,
      PARTIES,
      partyId,
      PARTICIPANTS,
      participantId
    );

    const result = await getDoc(participantRef);

    if (!result.exists()) {
      throw new AppError("participant does not exist");
    }

    var participantData: ParticipantData = JSON.parse(
      JSON.stringify(emptyParticipant)
    );

    participantData = copyMatchingProperties(
      result.data(),
      participantData
    ) as ParticipantData;

    return { participantData };
  } catch (err) {
    throw err;
  }
};

export const leaveParty = async (partyId: string, participantId: string) => {
  try {
    const partyRef = doc(db, PARTIES, partyId);

    await runTransaction(db, async (transaction) => {
      const partyDoc = await transaction.get(partyRef);
      if (!partyDoc.exists()) {
        throw new AppError("Party does not exist");
      }
      const partyData = partyDoc.data() as PartyData;
      if (partyData.isEnded) {
        throw new AppError("Party no longer exists");
      }
      const participantRef = doc(
        db,
        PARTIES,
        partyId,
        PARTICIPANTS,
        participantId
      );

      const participantDoc = await transaction.get(participantRef);
      if (!participantDoc.exists) {
        throw new AppError("Participant does not exist in party");
      }
      const participantData = participantDoc.data() as ParticipantData;

      transaction.delete(participantRef);

      stopPresenceUpdates();
      removeParticipantPresenceracking(partyId, participantId);

      const updatedData: Partial<PartyData> = {
        participantCount: partyData.participantCount - 1,
      };

      if (participantData.flag.raised) {
        updatedData.flagsRaisedCount = partyData.flagsRaisedCount - 1;
      }

      transaction.update(partyRef, updatedData);
    });
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

      if (partyData.isStarted && !partyData.allowParticipantsDuringSession) {
        throw new AppError(
          "Failed to join. Particpants are not allowed in this party once started"
        );
      }

      // Add new participant
      transaction.set(newParticipantRef, {
        id: participantId,
        participantName,
        isDisabled: false,
        flag: { raised: false, lastChangeBy: "moderator" },
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

export const resetFlags = async (partyId: string) => {
  const partyRef = doc(db, PARTIES, partyId);
  const participantsRef = collection(db, PARTIES, partyId, PARTICIPANTS);

  try {
    const participantsSnapshot = await getDocs(participantsRef);

    if (participantsSnapshot.empty) {
      throw new AppError("No participants to reset flags for.");
    }

    const participants = participantsSnapshot.docs;

    let batch = writeBatch(db);
    let batchCount = 0;

    // Update all participants' isFlagRaised field
    for (const participantDoc of participants) {
      batch.update(participantDoc.ref, {
        flag: { raised: false, lastChangeBy: "moderator" },
      } as Partial<ParticipantData>);
      batchCount++;

      // Commit batch if it reaches 500 operations
      if (batchCount === 500) {
        await batch.commit();
        batch = writeBatch(db);
        batchCount = 0;
      }
    }

    // Commit the last batch if there are remaining updates
    if (batchCount > 0) {
      await batch.commit();
    }

    // Reset the flag count in the party document
    await updateDoc(partyRef, { flagsRaisedCount: 0 } as Partial<PartyData>);
  } catch (err) {
    throw err;
  }
};

export const enterSeat = async (
  partyId: string,
  participant: ParticipantInSeat
) => {
  try {
    const partyRef = doc(db, PARTIES, partyId);

    await runTransaction(db, async (transaction) => {
      const partyDoc = await transaction.get(partyRef);
      if (!partyDoc.exists()) {
        throw new AppError("Party does not exist");
      }
      const partyData = partyDoc.data() as PartyData;
      if (partyData.isEnded) {
        throw new AppError("Party does no longer exists");
      }
      if (partyData.participantInSeat) {
        if (partyData.participantInSeat.id === participant.id) {
          throw new AppError("You are already in the seat.");
        } else {
          throw new AppError("Someone is already in the seat.");
        }
      }

      //const participantRef = doc(db, PARTIES, partyId, PARTICIPANTS, participantId);
      transaction.update(partyRef, {
        participantInSeat: participant,
      } as Partial<PartyData>);
    });
  } catch (err) {
    throw err;
  }
};

export const RemoveFromSeat = async (partyId: string) => {
  try {
    const partyRef = doc(db, PARTIES, partyId);

    await runTransaction(db, async (transaction) => {
      const partyDoc = await transaction.get(partyRef);
      if (!partyDoc.exists()) {
        throw new AppError("Party does not exist");
      }
      const partyData = partyDoc.data() as PartyData;
      if (partyData.isEnded) {
        throw new AppError("Party does no longer exists");
      }
      if (!partyData.participantInSeat) {
        throw new AppError("No one in the seat.");
      }

      transaction.update(partyRef, {
        participantInSeat: null,
      } as Partial<PartyData>);
    });
  } catch (err) {
    throw err;
  }
};

export const fetchParticipantsBatch = async (
  partyId: string,
  batchSize: number,
  lastDoc: QueryDocumentSnapshot<DocumentData> | null = null
): Promise<{
  participantItems: ParticipantItemMap;
  lastVisible: QueryDocumentSnapshot<DocumentData> | null;
  hasMore: boolean;
}> => {
  try {
    const participantsRef = collection(db, PARTIES, partyId, PARTICIPANTS);
    let q = query(
      participantsRef,
      orderBy("participantName"),
      limit(batchSize)
    );

    if (lastDoc) {
      q = query(
        participantsRef,
        orderBy("participantName"),
        orderBy("id"),
        startAfter(lastDoc),
        limit(batchSize)
      );
    }

    const snapshot = await getDocs(q);
    const participantItems: ParticipantItemMap = {};
    var batchCount = 0;
    snapshot.docs.forEach((doc) => {
      const participant = doc.data() as ParticipantData;

      participantItems[doc.id] = {
        id: doc.id,
        name: participant.participantName,
        isDisabled: participant.isDisabled,
        flagRaised: participant.flag.raised,
        status: { status: "", lastSeen: "" },
      };
      ++batchCount;
    });

    return {
      participantItems,
      lastVisible: snapshot.docs.length
        ? snapshot.docs[snapshot.docs.length - 1]
        : null,
      hasMore: batchCount === batchSize,
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const addMockParticipants = async (partyId: string, count: number) => {
  try {
    const participantsRef = collection(db, PARTIES, partyId, PARTICIPANTS);
    let batch = writeBatch(db);
    let batchCount = 0;
    const letters = "GHTUVAIJKQRSBCOPWXYZDEFLMN";

    for (let i = 0; i < count; i++) {
      var newDocRef = doc(participantsRef); // Auto-generates ID
      const participantId = `p_${newDocRef.id}`;
      newDocRef = doc(db, PARTIES, partyId, PARTICIPANTS, participantId);

      const participantData: ParticipantData = {
        id: participantId,
        participantName: `Mock User ${letters[i % letters.length]}-${i + 1}`,
        isDisabled: Math.random() < 0.1, // 10% chance of disabled
        flag: { raised: false, lastChangeBy: "moderator" },
      };

      batch.set(newDocRef, participantData);
      batchCount++;

      // Commit batch every 400 participants (to stay safe under 500 limit)
      if (batchCount === 400) {
        await batch.commit();
        batch = writeBatch(db);
        batchCount = 0;
      }
    }

    // Commit any remaining participants
    if (batchCount > 0) {
      await batch.commit();
    }

    const partyRef = doc(db, PARTIES, partyId);
    await updateDoc(partyRef, {
      participantCount: count, // Set it directly to the number you just added
    });
  } catch (err) {
    console.error("Failed to add mock participants:", err);
    throw err;
  }
};

export const deleteAllParticipants = async (partyId: string) => {
  try {
    const participantsRef = collection(db, PARTIES, partyId, PARTICIPANTS);
    const snapshot = await getDocs(participantsRef);

    if (snapshot.empty) {
      console.log("No participants to delete.");
      return;
    }

    let batch = writeBatch(db);
    let batchCount = 0;

    for (const docSnap of snapshot.docs) {
      batch.delete(docSnap.ref);
      batchCount++;

      // Firestore batch limit is 500 writes max
      if (batchCount === 400) {
        await batch.commit();
        batch = writeBatch(db);
        batchCount = 0;
      }
    }

    if (batchCount > 0) {
      await batch.commit();
    }

    const partyRef = doc(db, PARTIES, partyId);
    await updateDoc(partyRef, {
      participantCount: 0, // No participants left
    });

    console.log(`Successfully deleted ${snapshot.size} participants.`);
  } catch (err) {
    console.error("Failed to delete participants:", err);
    throw err;
  }
};
