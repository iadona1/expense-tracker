import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import DashboardPage from "./pages/DashBoardPage";
import TransactionsPage from "./pages/TransactionPage";
import NewTransactionPage from "./pages/NewTransactionPage";
import TransactionDetailsPage from "./pages/TransactionDetailsPage";
import Toast from "./components/Toast";
import { useToast } from "./app/useToast";
import { ToastContext } from "./app/ToastContext";

export default function App() {
  const { toasts, addToast, removeToast } = useToast();

  return (
    <ToastContext.Provider value={addToast}>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/transactions" element={<TransactionsPage />} />
          <Route path="/transactions/new" element={<NewTransactionPage />} />
          <Route path="/transactions/:id" element={<TransactionDetailsPage />} />
        </Routes>
      </main>
      <Toast toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
}