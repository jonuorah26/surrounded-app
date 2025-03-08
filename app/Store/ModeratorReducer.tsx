import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type FlagSystemOption = "red" | "green" | "";
export type VoteOutThresholdType = "majority" | "all" | "custom" | "";

type ModeratorData = {
  flagSystem: FlagSystemOption;
  flagsRaisedCount: number;
  minParticipants: number;
  maxParticipants: number | null;
  participantCount: number;
  maxSameAsMin: boolean;
  allowParticipantsDuringSession: boolean;

  voteOutThresholdType: VoteOutThresholdType;
  customVoteOutThreshold: number;
  sessionCode: string;
};

const initialState: ModeratorData = {
  flagSystem: "",
  flagsRaisedCount: 0,
  minParticipants: 0,
  maxParticipants: null,
  maxSameAsMin: false,
  participantCount: 0,
  allowParticipantsDuringSession: false,
  sessionCode: "",
  voteOutThresholdType: "",
  customVoteOutThreshold: 0,
};

const moderatorSlice = createSlice({
  name: "moderator",
  initialState,
  reducers: {
    updateFlagSystem: (state, action: PayloadAction<FlagSystemOption>) => {
      state.flagSystem = action.payload;
    },
    updateMinParticipants: (state, action: PayloadAction<number>) => {
      state.minParticipants = action.payload;
    },
    updateMaxParticipants: (state, action: PayloadAction<number | null>) => {
      state.maxParticipants = action.payload;
    },
    updateMaxSameAsMinOption: (state, action: PayloadAction<boolean>) => {
      state.maxSameAsMin = action.payload;
    },
    updateParticipantCount: (state, action: PayloadAction<number>) => {
      state.participantCount = action.payload;
    },
    updateAllowParticipantsDuringSessionOption: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.allowParticipantsDuringSession = action.payload;
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
    updateCustomVoteOutThreshold: (state, action: PayloadAction<number>) => {
      state.customVoteOutThreshold = action.payload;
    },
  },
});

export const {
  updateFlagSystem,
  updateMaxParticipants,
  updateMaxSameAsMinOption,
  updateMinParticipants,
  updateAllowParticipantsDuringSessionOption,
  updateParticipantCount,
  updateSessionCode,
  updateVoteOutThresholdType,
  updateCustomVoteOutThreshold,
} = moderatorSlice.actions;

export default moderatorSlice.reducer;
