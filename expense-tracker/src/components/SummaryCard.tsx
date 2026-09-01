import "../styles/SummaryCard.css";
import type { SummaryCardProps } from "../types/summaryCard";

export default function SummaryCard({ title, value, type = "default" }: SummaryCardProps) {
  return (
    <div className={`summary-card summary-card--${type}`}>
      <p className="summary-card__title">{title}</p>
      <h2 className="summary-card__value">{value}</h2>
    </div>
  );
}