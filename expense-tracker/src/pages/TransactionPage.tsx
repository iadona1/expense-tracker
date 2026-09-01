import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  setSearch,
  setType,
  setCategory,
  setMonth,
  resetFilters,
} from "../features/filters/filtersSlice";
import {
  selectFilteredTransactions,
  selectTransactionsLoading,
  selectTransactionsError,
} from "../features/transactions/transactionSelectors";
import TransactionRow from "../components/TransactionRow";
import { CATEGORIES } from "../types/transaction";
import { Link } from "react-router-dom";
import { exportToCsv } from "../utils/exportCsv";
import "../styles/TransactionPage.css";

const PAGE_SIZE = 10;

type SortField = "date" | "amount";
type SortDirection = "asc" | "desc";

export default function TransactionsPage() {
  const dispatch = useAppDispatch();
  const transactions = useAppSelector(selectFilteredTransactions);
  const loading = useAppSelector(selectTransactionsLoading);
  const error = useAppSelector(selectTransactionsError);
  const filters = useAppSelector((state) => state.filters);

  const [sortField, setSortField] = useState<SortField>("date");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [filters]);

  function handleSort(field: SortField) {
    if (sortField === field) {
      setSortDirection((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  }

  const sorted = [...transactions].sort((a, b) => {
    if (sortField === "date") {
      const diff = new Date(a.date).getTime() - new Date(b.date).getTime();
      return sortDirection === "asc" ? diff : -diff;
    } else {
      const diff = a.amount - b.amount;
      return sortDirection === "asc" ? diff : -diff;
    }
  });

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const paginated = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function sortLabel(field: SortField) {
    if (sortField !== field) return "↕";
    return sortDirection === "asc" ? "↑" : "↓";
  }

  if (loading) return <p>Loading transactions...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="page">
      <div className="page__header">
        <h1>Transactions</h1>
        <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
          <button
            className="filters__reset"
            onClick={() => exportToCsv(sorted, "transactions.csv")}
            disabled={sorted.length === 0}
          >
            ↓ Export CSV
          </button>
          <Link
            to="/transactions/new"
            className="header__cta"
            style={{ padding: "0.45rem 1rem" }}
          >
            + Add Transaction
          </Link>
        </div>
      </div>

      <div className="filters">
        <input
          type="text"
          placeholder="Search by description..."
          value={filters.search}
          onChange={(e) => dispatch(setSearch(e.target.value))}
        />
        <select
          value={filters.type}
          onChange={(e) =>
            dispatch(setType(e.target.value as "all" | "income" | "expense"))
          }
        >
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select
          value={filters.category}
          onChange={(e) => dispatch(setCategory(e.target.value))}
        >
          <option value="all">All Categories</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <input
          type="month"
          value={filters.month}
          onChange={(e) => dispatch(setMonth(e.target.value))}
        />
        <button
          className="filters__reset"
          onClick={() => dispatch(resetFilters())}
        >
          Reset
        </button>
      </div>

      <p className="results-count">
        {transactions.length} transaction{transactions.length !== 1 ? "s" : ""}{" "}
        found
      </p>

      {paginated.length === 0 ? (
        <p className="empty-text">
          No transactions match your filters.{" "}
          <Link to="/transactions/new">Add one!</Link>
        </p>
      ) : (
        <div className="table-card">
          <table>
            <thead>
              <tr>
                <th>
                  <button
                    className="sort-btn"
                    onClick={() => handleSort("date")}
                  >
                    Date {sortLabel("date")}
                  </button>
                </th>
                <th>Description</th>
                <th>Category</th>
                <th>Type</th>
                <th>
                  <button
                    className="sort-btn"
                    onClick={() => handleSort("amount")}
                  >
                    Amount {sortLabel("amount")}
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((t) => (
                <TransactionRow key={t.id} transaction={t} />
              ))}
            </tbody>
          </table>
        </div>
      )}

      {totalPages > 1 && (
        <div className="pagination">
          <button
            className="pagination__btn"
            onClick={() => setPage((p) => p - 1)}
            disabled={page === 1}
          >
            Previous
          </button>
          <span className="pagination__info">
            Page {page} of {totalPages}
          </span>
          <button
            className="pagination__btn"
            onClick={() => setPage((p) => p + 1)}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}