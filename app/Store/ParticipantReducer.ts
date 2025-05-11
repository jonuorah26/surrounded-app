import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FlagSystemOption, VoteOutThresholdType } from "./PartyReducer";

export type Flag = {
  raised: boolean;
  lastChangeBy: "moderator" | "participant";
};
export type ParticipantData = {
  id: string;
  participantName: string;
  isDisabled: boolean;
  flag: Flag;
};

export const emptyParticipant: ParticipantData = {
  id: "",
  participantName: "",
  flag: {
    raised: false,
    lastChangeBy: "moderator",
  },
  isDisabled: false,
};

type ParticipantState = {
  participantData: ParticipantData;
  isDeleted: boolean;
};

const initialState: ParticipantState = {
  participantData: {
    id: "",
    participantName: "",
    isDisabled: false,
    flag: {
      raised: false,
      lastChangeBy: "moderator",
    },
  },
  isDeleted: false,
};

const participantSlice = createSlice({
  name: "participant",
  initialState,
  reducers: {
    updateParticipantName: (state, action: PayloadAction<string>) => {
      state.participantData.participantName = action.payload;
    },
    updateIsDisabled: (state, action: PayloadAction<boolean>) => {
      state.participantData.isDisabled = action.payload;
    },
    updateFlag: (state, action: PayloadAction<Flag>) => {
      state.participantData.flag = action.payload;
    },
    updateParticipantId: (state, action: PayloadAction<string>) => {
      state.participantData.id = action.payload;
    },
    updateParticipantProperties: (
      state,
      action: PayloadAction<Partial<ParticipantData>>
    ) => {
      state.participantData = { ...state.participantData, ...action.payload };
    },
    updateIsDeleted: (state, action: PayloadAction<boolean>) => {
      state.isDeleted = action.payload;
    },
    updateParticipant: (state, action: PayloadAction<ParticipantData>) => {
      state.participantData = action.payload;
    },
    reset: (state) => {
      return initialState;
    },
  },
});

export const {
  updateIsDisabled,
  updateFlag,
  updateParticipantName,
  updateParticipantId,
  reset,
  updateParticipantProperties,
  updateIsDeleted,
  updateParticipant,
} = participantSlice.actions;

export default participantSlice.reducer;
