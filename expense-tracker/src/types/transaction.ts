export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  date: string;
  notes?: string;
}

export type TransactionType = "income" | "expense";

export const CATEGORIES = [
  "Food",
  "Housing",
  "Transport",
  "Entertainment",
  "Shopping",
  "Salary",
  "Freelance",
  "Health",
  "Utilities",
  "Other",
] as const;

export type Category = (typeof CATEGORIES)[number];