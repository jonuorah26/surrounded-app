import { useSelector } from "react-redux";
import { RootState } from "../Store/Store";
import { useEffect, useState } from "react";
import { useUserTypeContext } from "../Context/UserTypeContext";
import { useDialog } from "../Context/DialogContext";
import { Platform } from "react-native";
import { MOBILE_OS } from "../Constants";
import { playAlarm } from "../Utilities";

export const useThreshold = () => {
  const {
    voteOutThresholdType,
    customVoteOutThreshold,
    participantCount,
    flagsRaisedCount,
    participantInSeat,
  } = useSelector((state: RootState) => state.party.partyData);
  const { id: participantId } = useSelector(
    (state: RootState) => state.participant.participantData
  );
  const [threshold, setThreshold] = useState<number | null>(null);
  const [thresholdReached, setThresholdReached] = useState(false);
  const { userType } = useUserTypeContext();

  const { dialog } = useDialog();
  const alert =
    Platform.OS in MOBILE_OS
      ? window.alert
      : (msg: string) => dialog("Alert", msg);

  useEffect(() => {
    var updatedThreshold = threshold;

    switch (voteOutThresholdType) {
      case "all":
        updatedThreshold = participantCount - 1;
        break;
      case "custom":
        updatedThreshold = customVoteOutThreshold ?? 0;
        break;
      case "majority":
        updatedThreshold = participantCount - 1;
        updatedThreshold = Math.floor(updatedThreshold / 2) + 1;
        break;
    }
    setThreshold(updatedThreshold);
  }, [voteOutThresholdType, customVoteOutThreshold, participantCount]);

  useEffect(() => {
    if (threshold === null || threshold === 0) return;

    setThresholdReached((prev) => {
      if (participantCount <= 1) return false;

      if (!prev && flagsRaisedCount >= threshold) {
        if (userType === "moderator") {
          playAlarm();
          alert("Threshold Reached!");
        } else {
          if (
            participantInSeat.seatFilled &&
            participantId === participantInSeat?.lastInSeat?.id
          ) {
            alert("You have been voted out!");
          }
        }

        return true;
      }
      return flagsRaisedCount >= threshold;
    });
  }, [
    flagsRaisedCount,
    threshold,
    participantCount,
    participantId,
    participantInSeat?.lastInSeat?.id,
    participantInSeat?.seatFilled,
  ]);

  return { threshold, thresholdReached };
};
