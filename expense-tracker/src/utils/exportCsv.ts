import type { Transaction } from "../types/transaction";

export function exportToCsv(transactions: Transaction[], filename = "transactions.csv") {
  const headers = ["Date", "Description", "Category", "Type", "Amount", "Notes"];

  const rows = transactions.map((t) => [
    t.date,
    `"${t.description.replace(/"/g, '""')}"`,
    t.category,
    t.type,
    t.amount.toString(),
    `"${(t.notes ?? "").replace(/"/g, '""')}"`,
  ]);

  const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}