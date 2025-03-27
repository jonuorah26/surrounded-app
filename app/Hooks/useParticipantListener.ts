import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../Firebase/FirebaseConfig";
import { AppDispatch, RootState } from "../Store/Store";
import {
  DB_PROPERTY_LABELS_NOT_IN_REDUX,
  PARTICIPANTS,
  PARTIES,
} from "../Constants/DbConstants";
import {
  ParticipantData,
  updateParticipantProperties,
} from "../Store/ParticipantReducer";

export const useParticipantListener = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { participantData, dbCollectionId: participantId } = useSelector(
    (state: RootState) => state.participant
  );
  const { dbCollectionId: partyId } = useSelector(
    (state: RootState) => state.party
  );
  const previousDataRef = useRef(participantData); // Store previous values

  useEffect(() => {
    if (!participantId) return;

    const participantRef = doc(
      db,
      PARTIES,
      partyId,
      PARTICIPANTS,
      participantId
    );

    const unsubscribe = onSnapshot(participantRef, (docSnap) => {
      if (docSnap.exists()) {
        const newData = docSnap.data() as ParticipantData;

        // Detect changed properties
        Object.keys(newData).forEach((objKey) => {
          if (objKey in DB_PROPERTY_LABELS_NOT_IN_REDUX) {
            return;
          }

          const key = objKey as keyof ParticipantData;

          if (!isEqual(previousDataRef.current[key], newData[key])) {
            // Dispatch Redux update for changed fields
            dispatch(updateParticipantProperties({ [key]: newData[key] }));
          }
        });

        // Update ref with latest data
        previousDataRef.current = newData;
      }
    });

    return () => {
      unsubscribe();
    }; // Cleanup listener on unmount
  }, [participantId]);

  // Keep ref updated when Redux state changes
  useEffect(() => {
    previousDataRef.current = participantData;
  }, [participantData]);
};

export const isEqual = (obj1: any, obj2: any): boolean => {
  if (obj1 === obj2) return true; // If they're the same reference, return true
  if (
    typeof obj1 !== "object" ||
    typeof obj2 !== "object" ||
    obj1 === null ||
    obj2 === null
  ) {
    return obj1 === obj2; // If either is not an object, compare directly
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false; // If different number of keys, not equal

  for (const key of keys1) {
    if (!keys2.includes(key) || !isEqual(obj1[key], obj2[key])) {
      return false; // If key doesn't exist in both or values are different, not equal
    }
  }

  return true;
};
