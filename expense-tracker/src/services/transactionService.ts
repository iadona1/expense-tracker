import type { Transaction } from "../types/transaction";

const BASE_URL = import.meta.env.VITE_API_URL;

export async function getAll(): Promise<Transaction[]> {
  const res = await fetch(`${BASE_URL}/transactions`);
  if (!res.ok) throw new Error("Failed to fetch transactions");
  return res.json();
}

export async function getById(id: string): Promise<Transaction> {
  const res = await fetch(`${BASE_URL}/transactions/${id}`);
  if (!res.ok) throw new Error("Transaction not found");
  return res.json();
}

export async function create(data: Omit<Transaction, "id">): Promise<Transaction> {
  const res = await fetch(`${BASE_URL}/transactions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create transaction");
  return res.json();
}

export async function update(id: string, data: Partial<Transaction>): Promise<Transaction> {
  const res = await fetch(`${BASE_URL}/transactions/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update transaction");
  return res.json();
}

export async function remove(id: string): Promise<void> {
  const res = await fetch(`${BASE_URL}/transactions/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete transaction");
}