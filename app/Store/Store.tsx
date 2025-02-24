import { configureStore } from "@reduxjs/toolkit";
import moderatorReducer from "./ModeratorReducer";
import participantReducer from "./ParticipantReducer";

export const store = configureStore({
  reducer: {
    moderator: moderatorReducer,
    participant: participantReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
