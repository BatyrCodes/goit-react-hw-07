import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: { name: "" },
  reducers: {
    setFilter(state, action) {
      state.name = action.payload || "";
    },
  },
});

export const { setFilter } = filterSlice.actions;
export const selectNameFilter = (state) => state.filter.name;

export default filterSlice.reducer;
