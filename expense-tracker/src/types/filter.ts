export interface FiltersState {
  search: string;
  type: "all" | "income" | "expense";
  category: string;
  month: string;
}
