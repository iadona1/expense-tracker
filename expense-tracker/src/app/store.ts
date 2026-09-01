import { configureStore } from "@reduxjs/toolkit";
import transactionsReducer from "../features/transactions/transactionSlice";
import filtersReducer from "../features/filters/filtersSlice";
import settingsReducer from "../features/settings/settingsSlice";

export const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
    filters: filtersReducer,
    settings: settingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;