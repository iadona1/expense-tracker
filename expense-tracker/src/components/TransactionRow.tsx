import { Link } from "react-router-dom";
import type { Transaction } from "../types/transaction";
import { formatCurrency } from "../utils/currency";
import "../styles/TransactionRow.css";

interface TransactionRowProps {
  transaction: Transaction;
}

export default function TransactionRow({ transaction }: TransactionRowProps) {
  return (
    <tr>
      <td>{new Date(transaction.date).toLocaleDateString()}</td>
      <td>
        <Link to={`/transactions/${transaction.id}`}>{transaction.description}</Link>
      </td>
      <td>{transaction.category}</td>
      <td>
        <span className={`badge badge--${transaction.type}`}>
          {transaction.type}
        </span>
      </td>
      <td className={`amount amount--${transaction.type}`}>
        {transaction.type === "income" ? "+" : "-"}{formatCurrency(transaction.amount)}
      </td>
    </tr>
  );
}