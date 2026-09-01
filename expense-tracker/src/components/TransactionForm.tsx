import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CATEGORIES } from "../types/transaction";

const schema = z.object({
  description: z.string().min(1, "Description is required"),
  amount: z.number().gt(0, "Amount must be greater than 0"),
  type: z.enum(["income", "expense"], { message: "Type is required" }),
  category: z.string().min(1, "Category is required"),
  date: z.string().min(1, "Date is required"),
  notes: z.string().optional(),
});

export type TransactionFormData = z.infer<typeof schema>;

interface TransactionFormProps {
  defaultValues?: Partial<TransactionFormData>;
  onSubmit: (data: TransactionFormData) => void;
  isSubmitting?: boolean;
}

export default function TransactionForm({
  defaultValues,
  onSubmit,
  isSubmitting,
}: TransactionFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TransactionFormData, unknown, TransactionFormData>({
    resolver: zodResolver(schema) as any,
    defaultValues: defaultValues ?? {
      date: new Date().toISOString().split("T")[0],
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit as any)}>
      <div className="form-field">
        <label>Type</label>
        <select {...register("type")}>
          <option value="">Select type</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        {errors.type && <span>{errors.type.message}</span>}
      </div>

      <div className="form-field">
        <label>Description</label>
        <input type="text" {...register("description")} placeholder="e.g. Grocery shopping" />
        {errors.description && <span>{errors.description.message}</span>}
      </div>

      <div className="form-field">
        <label>Amount</label>
        <input type="number" step="0.01" {...register("amount", { valueAsNumber: true })} placeholder="0.00" />
        {errors.amount && <span>{errors.amount.message}</span>}
      </div>

      <div className="form-field">
        <label>Category</label>
        <select {...register("category")}>
          <option value="">Select category</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        {errors.category && <span>{errors.category.message}</span>}
      </div>

      <div className="form-field">
        <label>Date</label>
        <input type="date" {...register("date")} />
        {errors.date && <span>{errors.date.message}</span>}
      </div>

      <div className="form-field">
        <label>Notes (optional)</label>
        <textarea {...register("notes")} placeholder="Any additional notes..." rows={3} />
      </div>

      <div className="form-actions">
        <button type="submit" className="btn-primary" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Transaction"}
        </button>
      </div>
    </form>
  );
}