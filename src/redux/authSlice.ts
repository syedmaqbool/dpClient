import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Nullable } from "../interfaces/CommonInterface";
import { User } from "../interfaces/AuthServiceInterface";

export interface AuthState {
  user: Nullable<User>;
}

const initialState: AuthState = {
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLoginAction: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    userLogoutAction: (state) => {
      state.user = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { userLoginAction, userLogoutAction } = authSlice.actions;

export default authSlice.reducer;
