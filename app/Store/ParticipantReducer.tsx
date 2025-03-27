import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FlagSystemOption, VoteOutThresholdType } from "./PartyReducer";

export type Flag = {
  raised: boolean;
  lastChangeBy: "moderator" | "participant";
};
export type ParticipantData = {
  participantName: string;
  isDisabled: boolean;
  flag: Flag;
  isOnline: boolean;
};

type ParticipantState = {
  participantData: ParticipantData;
  dbCollectionId: string;
};

const initialState: ParticipantState = {
  participantData: {
    participantName: "",
    isDisabled: false,
    flag: {
      raised: false,
      lastChangeBy: "moderator",
    },
    isOnline: true,
  },
  dbCollectionId: "",
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
    updateDbCollectionId: (state, action: PayloadAction<string>) => {
      state.dbCollectionId = action.payload;
    },
    updateParticipantProperties: (
      state,
      action: PayloadAction<Partial<ParticipantData>>
    ) => {
      state.participantData = { ...state.participantData, ...action.payload };
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
  updateDbCollectionId,
  reset,
  updateParticipantProperties,
} = participantSlice.actions;

export default participantSlice.reducer;
