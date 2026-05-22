"use client"

import {
  useFinance
} from "../lib/context/finance-context"

export default function MonthlySummary() {
  const { transactions } =
    useFinance()

  const currentMonth =
    new Date().getMonth()

  const currentYear =
    new Date().getFullYear()

  const monthlyTransactions =
    transactions.filter(
      (transaction) => {
        const transactionDate =
          new Date(transaction.date)

        return (
          transactionDate.getMonth() ===
            currentMonth &&
          transactionDate.getFullYear() ===
            currentYear
        )
      }
    )

  const monthlyIncome =
    monthlyTransactions
      .filter(
        (transaction) =>
          transaction.type ===
          "income"
      )
      .reduce(
        (acc, transaction) =>
          acc + transaction.amount,
        0
      )

  const monthlyExpenses =
    monthlyTransactions
      .filter(
        (transaction) =>
          transaction.type ===
          "expense"
      )
      .reduce(
        (acc, transaction) =>
          acc + transaction.amount,
        0
      )

  const netSavings =
    monthlyIncome - monthlyExpenses

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
      <h2 className="text-2xl font-bold mb-6">
        Monthly Summary
      </h2>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-zinc-400">
              Monthly Income
            </p>

            <p className="text-2xl font-bold text-green-400">
              ₱
              {monthlyIncome.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-zinc-400">
              Monthly Expenses
            </p>

            <p className="text-2xl font-bold text-red-400">
              ₱
              {monthlyExpenses.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-zinc-400">
              Net Savings
            </p>

            <p
              className={`text-2xl font-bold ${
                netSavings >= 0
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              ₱
              {netSavings.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}