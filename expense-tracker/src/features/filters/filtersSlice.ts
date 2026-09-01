import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { FiltersState } from "../../types/filter";

const initialState: FiltersState = {
  search: "",
  type: "all",
  category: "all",
  month: "",
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    setType(state, action: PayloadAction<FiltersState["type"]>) {
      state.type = action.payload;
    },
    setCategory(state, action: PayloadAction<string>) {
      state.category = action.payload;
    },
    setMonth(state, action: PayloadAction<string>) {
      state.month = action.payload;
    },
    resetFilters(state) {
      state.search = "";
      state.type = "all";
      state.category = "all";
      state.month = "";
    },
  },
});

export const { setSearch, setType, setCategory, setMonth, resetFilters } =
  filtersSlice.actions;
export default filtersSlice.reducer;