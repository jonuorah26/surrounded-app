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

// For each participant, create a listener like this:
const unsubscribeListeners: Record<string, Function> = {};

export const useParticipantPresence = (
  setParticipants: React.Dispatch<SetStateAction<ParticipantItemMap | null>>
) => {
  const { id: partyId } = useSelector(
    (state: RootState) => state.party.partyData
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
