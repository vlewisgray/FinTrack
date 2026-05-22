import { Transaction } from "../types"

export function calculateIncome(
  transactions: Transaction[]
) {
  return transactions
    .filter(
      (t) => t.type === "income"
    )
    .reduce(
      (acc, t) => acc + t.amount,
      0
    )
}

export function calculateExpenses(
  transactions: Transaction[]
) {
  return transactions
    .filter((t) => {
      if (
        t.type !== "expense" &&
        t.type !== "savings"
      ) {
        return false
      }

      const isCreditCardExpense =
        t.paymentMethod &&
        t.paymentMethod !==
          "Cash" &&
        t.paymentMethod !==
          "GCash" &&
        t.paymentMethod !==
          "Maya" &&
        t.paymentMethod !==
          "Bank Transfer"

      return !isCreditCardExpense
    })
    .reduce(
      (acc, t) => acc + t.amount,
      0
    )
}

export function calculateBalance(
  transactions: Transaction[]
) {
  return (
    calculateIncome(
      transactions
    ) -
    calculateExpenses(
      transactions
    )
  )
}

export function calculateDailyExpenses(
  transactions: Transaction[]
) {
  const today =
    new Date().toLocaleDateString()

  return transactions
    .filter(
      (t) =>
        (t.type === "expense" ||
          t.type ===
            "savings") &&
        t.date === today
    )
    .reduce(
      (acc, t) => acc + t.amount,
      0
    )
}

export function calculateWeeklyExpenses(
  transactions: Transaction[]
) {
  const now = new Date()

  return transactions
    .filter((t) => {
      if (
        t.type !== "expense" &&
        t.type !== "savings"
      ) {
        return false
      }

      const transactionDate =
        new Date(t.date)

      const difference =
        now.getTime() -
        transactionDate.getTime()

      const days =
        difference /
        (1000 * 60 * 60 * 24)

      return days <= 7
    })
    .reduce(
      (acc, t) => acc + t.amount,
      0
    )
}