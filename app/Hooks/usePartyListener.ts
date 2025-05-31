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
import { useUserTypeContext } from "../Context/UserTypeContext";
import { useLoadingToast } from "../Context/LoadingToastContext";
import { ParticipantData } from "../Store/ParticipantReducer";

export const usePartyListener = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { partyData } = useSelector((state: RootState) => state.party);
  const partyId = partyData.id;
  const previousDataRef = useRef(partyData); // Store previous values
  const { userType } = useUserTypeContext();
  const { setToastMessage } = useLoadingToast();

  const { participantData } = useSelector(
    (state: RootState) => state.participant
  );
  const participantRef = useRef<ParticipantData | null>(null);
  useEffect(() => {
    if (!participantData) return;

    participantRef.current = participantData;
  }, [participantData]);

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
            dispatch(updatePartyProperties({ [key]: newData[key] }));

            if (key === "participantInSeat") {
              if (
                newData.participantInSeat.lastChangeBy === "participant" &&
                newData.participantInSeat.lastInSeat?.id !==
                  participantRef.current?.id
              ) {
                if (newData.participantInSeat.seatFilled) {
                  let name = newData.participantInSeat.lastInSeat?.name;
                  setToastMessage(`${name} has entered the seat`);
                } else {
                  let name = newData.participantInSeat.lastInSeat?.name;
                  setToastMessage(`${name} has left the seat`);
                }
              } else if (
                newData.participantInSeat.lastChangeBy === "moderator" &&
                participantRef.current?.id !== ""
              ) {
                if (newData.participantInSeat.seatFilled) {
                  if (
                    newData.participantInSeat.lastInSeat?.id ===
                    participantRef.current?.id
                  ) {
                    setToastMessage(`You have been put in the seat!`);
                  } else {
                    let name = newData.participantInSeat.lastInSeat?.name;
                    setToastMessage(`${name} has been put in the seat`);
                  }
                } else {
                  if (
                    newData.participantInSeat.lastInSeat?.id ===
                    participantRef.current?.id
                  ) {
                    setToastMessage(`You have been removed from the seat!`);
                  } else {
                    let name = newData.participantInSeat.lastInSeat?.name;
                    setToastMessage(`${name} has been removed from the seat`);
                  }
                }
              }
            }
          }
        });

        // Update ref with latest data
        previousDataRef.current = newData;
      }
    });

    return () => {
      unsubscribe();
    }; // Cleanup listener on unmount
  }, [partyId, userType]);

  // Keep ref updated when Redux state changes
  useEffect(() => {
    previousDataRef.current = partyData;
  }, [partyData]);
};
