import { createSlice } from "@reduxjs/toolkit";

type ModeratorData = {
  flagSystem: "red" | "green" | "";

  flagsRaisedCount: number;
};

const initialState: ModeratorData = {
  flagSystem: "",
  flagsRaisedCount: 0,
};

const moderatorSlice = createSlice({
  name: "moderator",
  initialState,
  reducers: {},
});

export const {} = moderatorSlice.actions;

export default moderatorSlice.reducer;
