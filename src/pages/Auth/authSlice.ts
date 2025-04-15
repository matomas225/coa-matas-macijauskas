import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/state/store";

interface FormState {
  value: boolean;
}

const initialState: FormState = {
  value: true,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    changeValue: (state, action: PayloadAction<boolean | undefined>) => {
      if (action.payload !== undefined) {
        state.value = action.payload;
      } else {
        state.value = !state.value;
      }
    },
  },
});

export const { changeValue } = authSlice.actions;

export const getFormState = (state: RootState) => state.auth.value;

export default authSlice.reducer;
