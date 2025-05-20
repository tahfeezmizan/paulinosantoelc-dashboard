
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { JwtPayload } from "jwt-decode";

export type T_AuthState = {
  accessToken: string;
  user: JwtPayload | null;
  userDetails: {} | null;
  hasSpinCompleted: boolean;
  isSpinning: boolean;
  hasModalOpen: boolean;
};
const initialState: T_AuthState = {
  accessToken: "",
  user: null,
  userDetails: null,
  hasSpinCompleted: false,
  isSpinning: false,
  hasModalOpen: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(
      state,
      action: PayloadAction<{ accessToken: string; user: object | null }>
    ) {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
    },

    setUserDetails(state, action: PayloadAction<{}>) {
      state.userDetails = action.payload;
    },

    startSpin(state) {
      state.isSpinning = true;
    },
    spinComplete(state) {
      state.isSpinning = false;
      state.hasSpinCompleted = true;
    },

    setInitModal(state, action: PayloadAction<boolean>) {
      state.hasModalOpen = action.payload;
    },

    logPersistUserOut: (state) => {
      state.accessToken = "";
      state.user = null;
      state.userDetails = null;
    },
  },
});

export const {
  setUser,
  logPersistUserOut,
  setUserDetails,
  startSpin,
  spinComplete,
  setInitModal,
} = authSlice.actions;
export default authSlice.reducer;
