import type { Transaction } from "../types/transaction";

export function groupByCategory(transactions: Transaction[]) {
  return transactions
    .filter((t) => t.type === "expense")
    .reduce<Record<string, number>>((acc, t) => {
      acc[t.category] = (acc[t.category] ?? 0) + t.amount;
      return acc;
    }, {});
}

export function groupByCategoryForChart(transactions: Transaction[]) {
  const grouped = groupByCategory(transactions);
  return Object.entries(grouped).map(([name, value]) => ({ name, value }));
}