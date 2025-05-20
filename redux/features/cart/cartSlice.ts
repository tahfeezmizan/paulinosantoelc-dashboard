import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type T_AuthState = {
  cartDetails: [] | null;
};
const initialState: T_AuthState = {
  cartDetails: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartDetails(state, action: PayloadAction<[]>) {
      state.cartDetails = action.payload;
    },
  },
});

export const { setCartDetails } = cartSlice.actions;
export default cartSlice.reducer;
