import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { Transaction } from "../../types/transaction";
import * as transactionService from "../../services/transactionService";
import type { RootState } from "../../app/store";

interface TransactionsState {
  theme: any;
  items: Transaction[];
  loading: boolean;
  error: string | null;
}

const initialState: TransactionsState = {
  items: [],
  loading: false,
  error: null,
  theme: undefined
};


export const fetchTransactions = createAsyncThunk(
  "transactions/fetchAll",
  async () => {
    return await transactionService.getAll();
  },
  {
    condition: (_, { getState }) => {
      const state = getState() as RootState;
      return !state.transactions.loading;
    },
  }
);

export const createTransaction = createAsyncThunk(
  "transactions/create",
  async (data: Omit<Transaction, "id">) => {
    return await transactionService.create(data);
  }
);

export const updateTransaction = createAsyncThunk(
  "transactions/update",
  async ({ id, data }: { id: string; data: Partial<Transaction> }) => {
    return await transactionService.update(id, data);
  }
);

export const deleteTransaction = createAsyncThunk(
  "transactions/delete",
  async (id: string) => {
    await transactionService.remove(id);
    return id;
  }
);

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch transactions";
      })
      .addCase(createTransaction.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateTransaction.fulfilled, (state, action) => {
        const index = state.items.findIndex((t) => t.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.items = state.items.filter((t) => t.id !== action.payload);
      });
  },
});

export default transactionsSlice.reducer;