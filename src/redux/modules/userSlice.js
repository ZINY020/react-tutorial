import { createSlice } from "@reduxjs/toolkit";

const initialState = [];
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUserInfo(state, action) {
      return [action.payload];
    },

    resetUserInfo(state) {
      return (state = initialState);
    },
  },
});

export default userSlice.reducer;
export const { getUserInfo, resetUserInfo } = userSlice.actions;
