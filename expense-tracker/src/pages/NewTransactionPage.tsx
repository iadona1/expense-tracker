import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { createTransaction } from "../features/transactions/transactionSlice";
import TransactionForm from "../components/TransactionForm";
import type { TransactionFormData } from "../components/TransactionForm";
import { useState } from "react";
import { useToastContext } from "../app/ToastContext";
import "../styles/FormPage.css";

export default function NewTransactionPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const addToast = useToastContext();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(data: TransactionFormData) {
    setIsSubmitting(true);
    try {
      await dispatch(createTransaction(data)).unwrap();
      addToast("Transaction created successfully!");
      navigate("/transactions");
    } catch (err) {
      addToast("Failed to create transaction.", "error");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="form-page">
      <button className="form-page__back" onClick={() => navigate("/transactions")}>
        ← Back
      </button>
      <h1 style={{ marginBottom: "1.25rem" }}>Add Transaction</h1>
      <div className="form-card">
        <TransactionForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      </div>
    </div>
  );
}