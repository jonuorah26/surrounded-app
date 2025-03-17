import { configureStore } from "@reduxjs/toolkit";
import partyReducer from "./PartyReducer";
import participantReducer from "./ParticipantReducer";

export const store = configureStore({
  reducer: {
    party: partyReducer,
    participant: participantReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
