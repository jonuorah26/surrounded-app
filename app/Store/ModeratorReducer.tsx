import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type FlagSystemOption = "red" | "green" | "";
export type VoteOutThresholdType = "majority" | "all" | "custom" | "";

export type PartyData = {
  flagSystem: FlagSystemOption;
  flagsRaisedCount: number;
  minParticipants: number;
  maxParticipants: number | null;
  participantCount: number;
  maxSameAsMin: boolean;
  allowParticipantsDuringSession: boolean;

  voteOutThresholdType: VoteOutThresholdType;
  customVoteOutThreshold: number | null;
  partyCode: string;

  isPaused: boolean;
  isStarted: boolean;
  isEnded: boolean;
};

type PartyState = {
  moderatorData: PartyData;
  dbCollectionId: string;
};

const initialState: PartyState = {
  moderatorData: {
    flagSystem: "",
    flagsRaisedCount: 0,
    minParticipants: 0,
    maxParticipants: null,
    maxSameAsMin: false,
    participantCount: 0,
    allowParticipantsDuringSession: false,
    partyCode: "",
    voteOutThresholdType: "",
    customVoteOutThreshold: null,
    isPaused: false,
    isStarted: false,
    isEnded: false,
  },
  dbCollectionId: "",
};

const moderatorSlice = createSlice({
  name: "moderator",
  initialState,
  reducers: {
    updateFlagSystem: (state, action: PayloadAction<FlagSystemOption>) => {
      state.moderatorData.flagSystem = action.payload;
    },
    updateFlagsRaisedCount: (state, action: PayloadAction<number>) => {
      state.moderatorData.flagsRaisedCount = action.payload;
    },
    updateMinParticipants: (state, action: PayloadAction<number>) => {
      state.moderatorData.minParticipants = action.payload;
    },
    updateMaxParticipants: (state, action: PayloadAction<number | null>) => {
      state.moderatorData.maxParticipants = action.payload;
    },
    updateMaxSameAsMinOption: (state, action: PayloadAction<boolean>) => {
      state.moderatorData.maxSameAsMin = action.payload;
    },
    updateParticipantCount: (state, action: PayloadAction<number>) => {
      state.moderatorData.participantCount = action.payload;
    },
    updateAllowParticipantsDuringSessionOption: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.moderatorData.allowParticipantsDuringSession = action.payload;
    },
    updateVoteOutThresholdType: (
      state,
      action: PayloadAction<VoteOutThresholdType>
    ) => {
      state.moderatorData.voteOutThresholdType = action.payload;
    },
    updatePartyCode: (state, action: PayloadAction<string>) => {
      state.moderatorData.partyCode = action.payload;
    },
    updateCustomVoteOutThreshold: (
      state,
      action: PayloadAction<number | null>
    ) => {
      state.moderatorData.customVoteOutThreshold = action.payload;
    },
    startParty: (state) => {
      state.moderatorData.isStarted = true;
    },
    endParty: (state) => {
      state.moderatorData.isEnded = true;
    },
    updateIsPaused: (state, action: PayloadAction<boolean>) => {
      state.moderatorData.isPaused = action.payload;
    },
    reset: (state) => {
      return initialState;
    },
    updateDbCollectionId: (state, action: PayloadAction<string>) => {
      state.dbCollectionId = action.payload;
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
  updatePartyCode,
  updateVoteOutThresholdType,
  updateCustomVoteOutThreshold,
  updateFlagsRaisedCount,
  updateIsPaused,
  endParty,
  startParty,
  reset,
  updateDbCollectionId,
} = moderatorSlice.actions;

export default moderatorSlice.reducer;
