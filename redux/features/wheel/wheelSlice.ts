import { createSlice } from "@reduxjs/toolkit";

export type T_WheelState = {
  isModalOpen: boolean;
  isResultModalOpen: boolean;
};
const initialState: T_WheelState = {
  isModalOpen: false,
  isResultModalOpen: false,
};

const wheelSlice = createSlice({
  name: "wheel;",
  initialState,
  reducers: {
    setIsModalOpen: (state) => {
      state.isModalOpen = !state.isModalOpen;
    },

    setIsChildModalOpen: (state) => {
      console.log(state.isResultModalOpen);
      state.isResultModalOpen = !state.isResultModalOpen;
    },
  },
});

export const { setIsModalOpen, setIsChildModalOpen } = wheelSlice.actions;
export default wheelSlice.reducer;
