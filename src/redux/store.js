import { configureStore } from "@reduxjs/toolkit";
import contactsSlice from "./contactsSlice";
import filterReducer from "./filtersSlice";

export const store = configureStore({
  reducer: {
    contacts: contactsSlice,
    filter: filterReducer,
  },
});
