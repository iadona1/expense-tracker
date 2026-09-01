import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchTransactions } from "../features/transactions/transactionSlice";
import {
  selectAllTransactions,
  selectTotalIncome,
  selectTotalExpenses,
  selectBalance,
  selectRecentTransactions,
  selectTransactionsLoading,
  selectTransactionsError,
} from "../features/transactions/transactionSelectors";
import { groupByCategoryForChart } from "../utils/calculations";
import SummaryCard from "../components/SummaryCard";
import TransactionRow from "../components/TransactionRow";
import { formatCurrency } from "../utils/currency";
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import { Link } from "react-router-dom";
import "../styles/Dashboard.css";

const COLORS = ["#6366f1","#22c55e","#f59e0b","#ef4444","#3b82f6","#ec4899","#14b8a6","#f97316","#8b5cf6","#64748b"];

export default function DashboardPage() {
  const dispatch = useAppDispatch();
  const transactions = useAppSelector(selectAllTransactions);
  const loading = useAppSelector(selectTransactionsLoading);
  const error = useAppSelector(selectTransactionsError);
  const totalIncome = useAppSelector(selectTotalIncome);
  const totalExpenses = useAppSelector(selectTotalExpenses);
  const balance = useAppSelector(selectBalance);
  const recentTransactions = useAppSelector(selectRecentTransactions);
  const chartData = groupByCategoryForChart(transactions);

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  if (loading) return <div className="page-state"><p>Loading...</p></div>;
  if (error) return <div className="page-state"><p className="error-text">Error: {error}</p></div>;

  return (
    <div className="page">
      <div className="page__header">
        <h1>Dashboard</h1>
      </div>

      <div className="summary-grid">
        <SummaryCard title="Balance" value={formatCurrency(balance)} type="default" />
        <SummaryCard title="Total Income" value={formatCurrency(totalIncome)} type="income" />
        <SummaryCard title="Total Expenses" value={formatCurrency(totalExpenses)} type="expense" />
      </div>

      <div className="dashboard-grid">
        <div className="card">
          <h2 className="card__title">Expenses by Category</h2>
          {chartData.length > 0 ? (
<ResponsiveContainer width="100%" height={300}>
  <PieChart>
    <Pie
      data={chartData}
      dataKey="value"
      nameKey="name"
      cx="50%"
      cy="50%"
      outerRadius={80}
      label={({ name, percent }) =>
        `${name} ${((percent ?? 0) * 100).toFixed(0)}%`
      }
    >
      {chartData.map((_, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
      ))}
    </Pie>
    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
    <Legend />
  </PieChart>
</ResponsiveContainer>
          ) : (
            <p className="empty-text">No expense data yet.</p>
          )}
        </div>

        <div className="card">
          <div className="card__header">
            <h2 className="card__title">Recent Transactions</h2>
            <Link to="/transactions">View all</Link>
          </div>
          {recentTransactions.length === 0 ? (
            <p className="empty-text">No transactions yet. <Link to="/transactions/new">Add one!</Link></p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Category</th>
                  <th>Type</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions.map((t) => (
                  <TransactionRow key={t.id} transaction={t} />
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}