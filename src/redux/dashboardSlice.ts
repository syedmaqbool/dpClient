import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Nullable } from "../interfaces/CommonInterface";
import { Slot } from "../interfaces/DashboardInterface";

export interface DashboardState {
  selectedSlot: Nullable<Slot>;
}

const initialState: DashboardState = {
  selectedSlot: null,
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setSelectedSlot: (state, action: PayloadAction<Slot>) => {
      state.selectedSlot = action.payload;
    },
    removeSelectedSlot: (state) => {
      state.selectedSlot = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSelectedSlot, removeSelectedSlot } = dashboardSlice.actions;

export default dashboardSlice.reducer;
