import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface SettingsState {
  currency: string;
  theme: "light" | "dark";
}

const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;

const initialState: SettingsState = {
  currency: "USD",
  theme: savedTheme ?? "dark",
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setCurrency(state, action: PayloadAction<string>) {
      state.currency = action.payload;
    },
    toggleTheme(state) {
      state.theme = state.theme === "dark" ? "light" : "dark";
      localStorage.setItem("theme", state.theme);
    },
  },
});

export const { setCurrency, toggleTheme } = settingsSlice.actions;
export default settingsSlice.reducer;