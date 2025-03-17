import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FlagSystemOption, VoteOutThresholdType } from "./PartyReducer";

type ParticipantData = {
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
    updateParticipantName: (state, action: PayloadAction<string>) => {
      state.participantData.participantName = action.payload;
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
  updateIsDisabled,
  updateIsFlagRaised,
  updateParticipantName,
  updateDbCollectionId,
  reset,
} = participantSlice.actions;

export default participantSlice.reducer;
