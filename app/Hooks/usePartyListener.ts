import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../Firebase/FirebaseConfig";
import { PartyData, updatePartyProperties } from "../Store/PartyReducer";
import { AppDispatch, RootState } from "../Store/Store";
import {
  DB_PROPERTY_LABELS_NOT_IN_REDUX,
  PARTIES,
} from "../Constants/DbConstants";
import { isEqual } from "./useParticipantListener";

export const usePartyListener = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { partyData } = useSelector((state: RootState) => state.party);
  const partyId = partyData.id;
  const previousDataRef = useRef(partyData); // Store previous values

  useEffect(() => {
    if (!partyId) return;

    const partyRef = doc(db, PARTIES, partyId);

    const unsubscribe = onSnapshot(partyRef, (docSnap) => {
      if (docSnap.exists()) {
        const newData: PartyData = docSnap.data() as PartyData;

        // Detect changed properties
        Object.keys(newData).forEach((objKey) => {
          if (objKey in DB_PROPERTY_LABELS_NOT_IN_REDUX) {
            return;
          }

          const key = objKey as keyof PartyData;

          if (!isEqual(previousDataRef.current[key], newData[key])) {
            // console.log(`Property '${key}' changed:`, {
            //   oldValue: previousDataRef.current[key],
            //   newValue: newData[key],
            // });

            // Dispatch Redux update for changed fields
            dispatch(updatePartyProperties({ [key]: newData[key] }));
          }
        });

        // Update ref with latest data
        previousDataRef.current = newData;
      }
    });

    return () => {
      unsubscribe();
    }; // Cleanup listener on unmount
  }, [partyId]);

  // Keep ref updated when Redux state changes
  useEffect(() => {
    previousDataRef.current = partyData;
  }, [partyData]);
};
