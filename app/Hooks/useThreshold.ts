import { useSelector } from "react-redux";
import { RootState } from "../Store/Store";
import { useEffect, useState } from "react";

export const useThreshold = () => {
  const {
    voteOutThresholdType,
    customVoteOutThreshold,
    participantCount,
    flagsRaisedCount,
  } = useSelector((state: RootState) => state.party.partyData);
  const [threshold, setThreshold] = useState(0);
  const [thresholdReached, setThresholdReached] = useState(false);

  useEffect(() => {
    var updatedThreshold = threshold;

    switch (voteOutThresholdType) {
      case "all":
        updatedThreshold = participantCount;
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
    if (flagsRaisedCount >= threshold) {
      setThresholdReached(true);
    } else {
      setThresholdReached(false);
    }
  }, [flagsRaisedCount, threshold]);

  return { threshold, thresholdReached };
};
