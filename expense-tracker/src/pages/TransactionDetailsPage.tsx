import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  updateTransaction,
  deleteTransaction,
} from "../features/transactions/transactionSlice";
import { selectAllTransactions } from "../features/transactions/transactionSelectors";
import TransactionForm from "../components/TransactionForm";
import type { TransactionFormData } from "../components/TransactionForm";
import ConfirmDialog from "../components/ConfirmDialog";
import * as transactionService from "../services/transactionService";
import type { Transaction } from "../types/transaction";
import { useToastContext } from "../app/ToastContext";
import "../styles/FormPage.css";

export default function TransactionDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const transactions = useAppSelector(selectAllTransactions);
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const addToast = useToastContext();


  useEffect(() => {
    if (!id) return;

    const found = transactions.find((t) => t.id === id);
    if (found) {
      setTransaction(found);
      return;
    }

    setLoading(true);
    transactionService
      .getById(id)
      .then(setTransaction)
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [id, transactions]);

async function handleUpdate(data: TransactionFormData) {
  if (!id) return;
  setIsSubmitting(true);
  try {
    await dispatch(updateTransaction({ id, data })).unwrap();
    addToast("Transaction updated successfully!");
    navigate("/transactions");
  } catch (err) {
    addToast("Failed to update transaction.", "error");
    console.error(err);
  } finally {
    setIsSubmitting(false);
  }
}

async function handleDelete() {
  if (!id) return;
  try {
    await dispatch(deleteTransaction(id)).unwrap();
    addToast("Transaction deleted.");
    navigate("/transactions");
  } catch (err) {
    addToast("Failed to delete transaction.", "error");
    console.error(err);
  }
}

  if (loading)
    return (
      <div className="form-page">
        <p style={{ color: "var(--text-secondary)" }}>Loading...</p>
      </div>
    );

  if (notFound)
    return (
      <div className="form-page">
        <p style={{ color: "var(--text-secondary)" }}>Transaction not found.</p>
        <button className="form-page__back" onClick={() => navigate("/transactions")}>
          ← Go back
        </button>
      </div>
    );

  if (!transaction)
    return (
      <div className="form-page">
        <p style={{ color: "var(--text-secondary)" }}>Loading...</p>
      </div>
    );

  return (
    <div className="form-page">
      <button className="form-page__back" onClick={() => navigate("/transactions")}>
        ← Back
      </button>
      <h1 style={{ marginBottom: "1.25rem" }}>Edit Transaction</h1>
      <div className="form-card">
        <TransactionForm
          defaultValues={{
            description: transaction.description,
            amount: transaction.amount,
            type: transaction.type,
            category: transaction.category,
            date: transaction.date,
            notes: transaction.notes ?? "",
          }}
          onSubmit={handleUpdate}
          isSubmitting={isSubmitting}
        />
        <button className="btn-danger" onClick={() => setShowConfirm(true)}>
          Delete Transaction
        </button>
      </div>

      {showConfirm && (
        <ConfirmDialog
          message="Are you sure you want to delete this transaction? This cannot be undone."
          onConfirm={handleDelete}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </div>
  );
}