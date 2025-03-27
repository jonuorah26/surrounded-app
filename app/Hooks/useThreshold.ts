import { useSelector } from "react-redux";
import { RootState } from "../Store/Store";
import { useEffect, useState } from "react";
import { useUserTypeContext } from "../Context/UserTypeContext";

export const useThreshold = () => {
  const {
    voteOutThresholdType,
    customVoteOutThreshold,
    participantCount,
    flagsRaisedCount,
    participantInSeat,
  } = useSelector((state: RootState) => state.party.partyData);
  const { dbCollectionId: participantId } = useSelector(
    (state: RootState) => state.participant
  );
  const [threshold, setThreshold] = useState<number | null>(null);
  const [thresholdReached, setThresholdReached] = useState(false);
  const { userType } = useUserTypeContext();

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
    if (threshold === null) return;

    setThresholdReached((prev) => {
      if (!prev && flagsRaisedCount >= threshold) {
        if (userType === "moderator") {
          alert("Threshold Reached!");
        } else {
          if (participantId === participantInSeat?.id) {
            alert("You have been voted out!");
          }
        }

        return true;
      }
      return flagsRaisedCount >= threshold;
    });
  }, [flagsRaisedCount, threshold]);

  return { threshold, thresholdReached };
};
