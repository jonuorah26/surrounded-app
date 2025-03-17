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
  isOnline: boolean;
};

type ParticipantState = {
  participantData: ParticipantData;
  dbCollectionId: string;
};

const initialState: ParticipantState = {
  participantData: {
    flagSystem: "",
    flagsRaisedCount: 0,
    participantCount: 0,
    voteOutThresholdType: "",
    customVoteOutThreshold: null,
    sessionCode: "",
    participantName: "",
    isDisabled: false,
    isFlagRaised: false,
    isOnline: true,
  },
  dbCollectionId: "",
};

const participantSlice = createSlice({
  name: "participant",
  initialState,
  reducers: {
    updateFlagSystem: (state, action: PayloadAction<FlagSystemOption>) => {
      state.participantData.flagSystem = action.payload;
    },
    updateFlagsRaisedCount: (state, action: PayloadAction<number>) => {
      state.participantData.flagsRaisedCount = action.payload;
    },
    updateParticipantCount: (state, action: PayloadAction<number>) => {
      state.participantData.participantCount = action.payload;
    },
    updateVoteOutThresholdType: (
      state,
      action: PayloadAction<VoteOutThresholdType>
    ) => {
      state.participantData.voteOutThresholdType = action.payload;
    },
    updateSessionCode: (state, action: PayloadAction<string>) => {
      state.participantData.sessionCode = action.payload;
    },
    updateParticipantName: (state, action: PayloadAction<string>) => {
      state.participantData.participantName = action.payload;
    },
    updateCustomVoteOutThreshold: (
      state,
      action: PayloadAction<number | null>
    ) => {
      state.participantData.customVoteOutThreshold = action.payload;
    },
    updateIsDisabled: (state, action: PayloadAction<boolean>) => {
      state.participantData.isDisabled = action.payload;
    },
    updateIsFlagRaised: (state, action: PayloadAction<boolean>) => {
      state.participantData.isFlagRaised = action.payload;
    },
    updateDbCollectionId: (state, action: PayloadAction<string>) => {
      state.dbCollectionId = action.payload;
    },
    reset: (state) => {
      return initialState;
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
  updateDbCollectionId,
  reset,
} = participantSlice.actions;

export default participantSlice.reducer;
