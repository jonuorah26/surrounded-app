import { createSlice } from "@reduxjs/toolkit";

type ParticipantData = {
  flagSystem: "red" | "green" | "";

  flagsRaisedCount: number;
};

const initialState: ParticipantData = {
  flagSystem: "",
  flagsRaisedCount: 0,
};

const participantSlice = createSlice({
  name: "participant",
  initialState,
  reducers: {},
});

export const {} = participantSlice.actions;

export default participantSlice.reducer;
