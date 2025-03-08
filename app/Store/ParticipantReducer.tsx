import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FlagSystemOption, VoteOutThresholdType } from "./ModeratorReducer";

type ParticipantData = {
  flagSystem: FlagSystemOption;
  flagsRaisedCount: number;
  participantCount: number;
  voteOutThresholdType: VoteOutThresholdType;
  customVoteOutThreshold: number | null;
  sessionCode: string;
  participantName: string;

  isDisabled: boolean;
  isFlagRaised: boolean;
};

const initialState: ParticipantData = {
  flagSystem: "",
  flagsRaisedCount: 0,
  participantCount: 0,
  voteOutThresholdType: "",
  customVoteOutThreshold: null,
  sessionCode: "",
  participantName: "",
  isDisabled: false,
  isFlagRaised: false,
};

const participantSlice = createSlice({
  name: "participant",
  initialState,
  reducers: {
    updateFlagSystem: (state, action: PayloadAction<FlagSystemOption>) => {
      state.flagSystem = action.payload;
    },
    updateFlagsRaisedCount: (state, action: PayloadAction<number>) => {
      state.flagsRaisedCount = action.payload;
    },
    updateParticipantCount: (state, action: PayloadAction<number>) => {
      state.participantCount = action.payload;
    },
    updateVoteOutThresholdType: (
      state,
      action: PayloadAction<VoteOutThresholdType>
    ) => {
      state.voteOutThresholdType = action.payload;
    },
    updateSessionCode: (state, action: PayloadAction<string>) => {
      state.sessionCode = action.payload;
    },
    updateParticipantName: (state, action: PayloadAction<string>) => {
      state.participantName = action.payload;
    },
    updateCustomVoteOutThreshold: (
      state,
      action: PayloadAction<number | null>
    ) => {
      state.customVoteOutThreshold = action.payload;
    },
    updateIsDisabled: (state, action: PayloadAction<boolean>) => {
      state.isDisabled = action.payload;
    },
    updateIsFlagRaised: (state, action: PayloadAction<boolean>) => {
      state.isFlagRaised = action.payload;
    },
  },
});

export const {
  updateCustomVoteOutThreshold,
  updateFlagSystem,
  updateFlagsRaisedCount,
  updateIsDisabled,
  updateIsFlagRaised,
  updateParticipantCount,
  updateSessionCode,
  updateVoteOutThresholdType,
  updateParticipantName,
} = participantSlice.actions;

export default participantSlice.reducer;
