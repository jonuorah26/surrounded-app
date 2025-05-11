import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type FlagSystemOption = "red" | "green" | "";
export type VoteOutThresholdType = "majority" | "all" | "custom" | "";
export type ParticipantInSeat = {
  name: string;
  id: string;
};

export type PartyData = {
  id: string;
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

  participantInSeat: ParticipantInSeat | null;
};

type PartyState = {
  partyData: PartyData;
};

export const emptyParty: PartyData = {
  id: "",
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
  participantInSeat: null,
};

const initialState: PartyState = {
  partyData: { ...emptyParty },
};

const partySlice = createSlice({
  name: "party",
  initialState,
  reducers: {
    updateFlagSystem: (state, action: PayloadAction<FlagSystemOption>) => {
      state.partyData.flagSystem = action.payload;
    },
    updateFlagsRaisedCount: (state, action: PayloadAction<number>) => {
      state.partyData.flagsRaisedCount = action.payload;
    },
    updateMinParticipants: (state, action: PayloadAction<number>) => {
      state.partyData.minParticipants = action.payload;
    },
    updateMaxParticipants: (state, action: PayloadAction<number | null>) => {
      state.partyData.maxParticipants = action.payload;
    },
    updateMaxSameAsMinOption: (state, action: PayloadAction<boolean>) => {
      state.partyData.maxSameAsMin = action.payload;
    },
    updateParticipantCount: (state, action: PayloadAction<number>) => {
      state.partyData.participantCount = action.payload;
    },
    updateAllowParticipantsDuringSessionOption: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.partyData.allowParticipantsDuringSession = action.payload;
    },
    updateVoteOutThresholdType: (
      state,
      action: PayloadAction<VoteOutThresholdType>
    ) => {
      state.partyData.voteOutThresholdType = action.payload;
    },
    updatePartyCode: (state, action: PayloadAction<string>) => {
      state.partyData.partyCode = action.payload;
    },
    updateCustomVoteOutThreshold: (
      state,
      action: PayloadAction<number | null>
    ) => {
      state.partyData.customVoteOutThreshold = action.payload;
    },
    startParty: (state) => {
      state.partyData.isStarted = true;
    },
    updateIsPaused: (state, action: PayloadAction<boolean>) => {
      state.partyData.isPaused = action.payload;
    },
    reset: (state) => {
      return initialState;
    },
    updatePartyId: (state, action: PayloadAction<string>) => {
      state.partyData.id = action.payload;
    },
    updateParty: (state, action: PayloadAction<PartyData>) => {
      state.partyData = action.payload;
    },
    updatePartyProperties: (
      state,
      action: PayloadAction<Partial<PartyData>>
    ) => {
      state.partyData = { ...state.partyData, ...action.payload };
    },
    updateParticipantInSeat: (
      state,
      action: PayloadAction<ParticipantInSeat>
    ) => {
      state.partyData.participantInSeat = action.payload;
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
  startParty,
  reset,
  updatePartyId,
  updateParty,
  updatePartyProperties,
  updateParticipantInSeat,
} = partySlice.actions;

export default partySlice.reducer;
