import { get, getDatabase, onValue, ref } from "firebase/database";
import { SetStateAction, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../Store/Store";
import { PARTICIPANTS, PARTIES } from "../Constants/DbConstants";
import {
  ParticipantItemMap,
  ParticipantPresence,
  ParticipantStatusMap,
  Status,
} from "../Types";
import { rtDb } from "../Firebase/FirebaseConfig";
import { useLoadingToast } from "../Context/LoadingToastContext";
import { useFocusEffect } from "@react-navigation/native";
import { AppError } from "../Firebase/Types";

const ONE_MIN = 60000;
const ONE_HOUR = ONE_MIN * 60;
const ONE_DAY = ONE_HOUR * 24;

/*
export const useParticipantPresence = () => {
  const { dbCollectionId: partyId } = useSelector(
    (state: RootState) => state.party
  );
  const [participantStatusMap, setParticipantStatusMap] =
    useState<ParticipantStatusMap | null>(null);

  useEffect(() => {
    const rtdb = getDatabase();
    const presenceRef = ref(rtdb, `${PARTIES}/${partyId}`);

    const unsubscribe = onValue(presenceRef, (snapshot) => {
      const presenceData = snapshot.val();
      if (presenceData) {
        const now = Date.now();
        const newPresenceStatus: ParticipantStatusMap = {};

        Object.entries(presenceData).forEach(([id, data]) => {
          const presence = data as ParticipantPresence;

          const timeAway = now - presence.lastActive;

          if (timeAway < ONE_MIN) {
            newPresenceStatus[id].status = "active";
            newPresenceStatus[id].minAway = 0;
          } else if (timeAway > ONE_MIN && timeAway < 30 * ONE_MIN) {
            newPresenceStatus[id].status = "away";
            newPresenceStatus[id].minAway = getMinutesAway(timeAway);
          } else if (timeAway > 30 * ONE_MIN) {
            newPresenceStatus[id].status = "offline";
            newPresenceStatus[id].minAway = getMinutesAway(timeAway);
          }
        });

        setParticipantStatusMap((prev) => ({ ...prev, ...newPresenceStatus }));
      }
    });

    return () => unsubscribe();
  }, [partyId]);

  return { participantStatusMap };
};
*/

/*
// For each participant, create a listener like this:
const unsubscribeListeners: Record<string, Function> = {};

export const useParticipantPresence = (
  setParticipants: React.Dispatch<SetStateAction<ParticipantItemMap | null>>
) => {
  const { dbCollectionId: partyId } = useSelector(
    (state: RootState) => state.party
  );
  const { setToastMessage } = useLoadingToast();

  useFocusEffect(
    useCallback(() => {
      try {
        setToastMessage("");
        const presenceRef = ref(rtDb, `${PARTIES}/${partyId}/${PARTICIPANTS}`);

        get(presenceRef).then((docs) => {
          docs.forEach((doc) => {
            const participantId = doc.key;
            const participantRef = ref(
              rtDb,
              `${PARTIES}/${partyId}/${PARTICIPANTS}/${participantId}`
            );
            const unsubscribe = onValue(participantRef, (snapshot) => {
              setParticipants((prev) => {
                if (!snapshot.exists()) {
                  unsubscribeListeners[participantId]?.();
                  return prev;
                }

                if (!prev || !(participantId in prev)) {
                  return prev;
                }

                const presence = snapshot.val() as ParticipantPresence;
                const now = Date.now();
                const newPresenceStatus: Status = {
                  status: "offline",
                  minAway: 60,
                };
                const timeAway = now - presence.lastActive;

                if (
                  newPresenceStatus.status !== "active" &&
                  timeAway < ONE_MIN
                ) {
                  newPresenceStatus.status = "active";
                  newPresenceStatus.minAway = 0;
                } else if (
                  newPresenceStatus.status !== "away" &&
                  timeAway > ONE_MIN &&
                  timeAway < 30 * ONE_MIN
                ) {
                  newPresenceStatus.status = "away";
                  newPresenceStatus.minAway = getMinutesAway(timeAway);
                } else if (
                  newPresenceStatus.status !== "offline" &&
                  timeAway > 30 * ONE_MIN
                ) {
                  newPresenceStatus.status = "offline";
                  newPresenceStatus.minAway = getMinutesAway(timeAway);
                } else {
                  return prev;
                }

                const updatedParticipants = { ...prev };
                updatedParticipants[participantId].status = newPresenceStatus;
                return updatedParticipants;
              });
            });

            unsubscribeListeners[participantId] = unsubscribe;
          });
        });
      } catch (err) {
        setToastMessage("An error occured loading the list");
      }

      return () => {
        Object.entries(unsubscribeListeners).forEach(([id, unsubscribe]) => {
          unsubscribe();
          delete unsubscribeListeners[id];
        });
      };
    }, [partyId])
  );
};
*/

// For each participant, create a listener like this:
const unsubscribeListeners: Record<string, Function> = {};

export const useParticipantPresence = (
  setParticipants: React.Dispatch<SetStateAction<ParticipantItemMap | null>>
) => {
  const { dbCollectionId: partyId } = useSelector(
    (state: RootState) => state.party
  );
  const { setToastMessage } = useLoadingToast();

  const presenceCheck = async () => {
    try {
      setToastMessage(""); // Optional: You may want to add logic for error conditions

      const presenceRef = ref(rtDb, `${PARTIES}/${partyId}/${PARTICIPANTS}`);

      const snapshot = await get(presenceRef);

      if (!snapshot.exists()) {
        return;
      }

      setParticipants((prev) => {
        if (!prev) {
          return prev;
        }

        var updatedParticipants: ParticipantItemMap = { ...prev };
        const now = Date.now();

        snapshot.forEach((doc) => {
          const participantId = doc.key;
          if (!(participantId in prev)) return;

          const presence = doc.val() as ParticipantPresence;
          const timeAway = now - presence.lastActive;

          const newPresenceStatus: Status = {
            status: "offline",
            lastSeen: "",
          };
          const currStatus = prev[participantId].status.status;

          if (currStatus !== "active" && timeAway < ONE_MIN) {
            newPresenceStatus.status = "active";
            newPresenceStatus.lastSeen = "";
          } else if (timeAway > ONE_MIN && timeAway < 30 * ONE_MIN) {
            newPresenceStatus.status = "away";
            newPresenceStatus.lastSeen = getLastSeen(timeAway);
          } else if (timeAway > 30 * ONE_MIN) {
            newPresenceStatus.status = "offline";
            newPresenceStatus.lastSeen = getLastSeen(timeAway);
          } else {
            return;
          }

          updatedParticipants[participantId].status = newPresenceStatus;
        });

        return updatedParticipants;
      });
    } catch (err) {
      setToastMessage("Error occurred loading participants list");
    }
  };

  useFocusEffect(
    useCallback(() => {
      const interval = setInterval(presenceCheck, 10000);

      return () => clearInterval(interval);
    }, [partyId])
  );

  return { presenceCheck };
};

const getLastSeen = (milliseconds: number) => {
  var timeAway;
  if (milliseconds < ONE_HOUR) {
    timeAway = Math.floor(milliseconds / ONE_MIN);
    return `Last seen ${timeAway} min${timeAway > 1 ? "s" : ""} ago`;
  } else if (milliseconds < ONE_DAY) {
    timeAway = Math.floor(milliseconds / ONE_HOUR);
    return `Last seen ${timeAway} hour${timeAway > 1 ? "s" : ""} ago`;
  } else {
    timeAway = Math.floor(milliseconds / ONE_DAY);
    return `Last seen ${timeAway} day${timeAway > 1 ? "s" : ""} ago`;
  }
};
