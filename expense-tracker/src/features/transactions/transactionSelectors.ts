import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

const selectTransactionsState = (state: RootState) => state.transactions.items;
const selectFiltersState = (state: RootState) => state.filters;

export const selectAllTransactions = (state: RootState) =>
  state.transactions.items;

export const selectTransactionsLoading = (state: RootState) =>
  state.transactions.loading;

export const selectTransactionsError = (state: RootState) =>
  state.transactions.error;

export const selectTotalIncome = createSelector(
  selectTransactionsState,
  (items) =>
    items
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0)
);

export const selectTotalExpenses = createSelector(
  selectTransactionsState,
  (items) =>
    items
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0)
);

export const selectBalance = createSelector(
  selectTotalIncome,
  selectTotalExpenses,
  (income, expenses) => income - expenses
);

export const selectRecentTransactions = createSelector(
  selectTransactionsState,
  (items) =>
    [...items]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5)
);

export const selectFilteredTransactions = createSelector(
  selectTransactionsState,
  selectFiltersState,
  (items, filters) => {
    const { search, type, category, month } = filters;
    return items.filter((t) => {
      const matchesSearch = t.description
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesType = type === "all" || t.type === type;
      const matchesCategory = category === "all" || t.category === category;
      const matchesMonth = month === "" || t.date.startsWith(month);
      return matchesSearch && matchesType && matchesCategory && matchesMonth;
    });
  }
);