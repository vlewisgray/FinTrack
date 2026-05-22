export type Transaction = {
  id: number
  name: string
  category: string
  paymentMethod: string
  amount: number
  date: string
  type: "income" | "expense"
}

export const transactionsData: Transaction[] = [
  {
    id: 1,
    name: "Starbucks",
    category: "Food",
    paymentMethod: "Credit Card A",
    amount: 350,
    date: "May 21, 2026",
    type: "expense"
  },
  {
    id: 2,
    name: "Salary",
    category: "Income",
    paymentMethod: "Bank Transfer",
    amount: 25000,
    date: "May 20, 2026",
    type: "income"
  }
]