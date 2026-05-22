export type Transaction = {
  id: number

  name: string

  amount: number

  type:
    | "income"
    | "expense"
    | "savings"

  category: string

  paymentMethod: string

  date: string

  time: string

  savingsGoalId?: number
}

export type CreditCard = {
  id: number

  name: string

  limit: number

  used: number
}

export type SavingsGoal = {
  id: number

  name: string

  target: number

  saved: number

  targetDate: string
}

export type Budget = {
  id: number

  category: string

  limit: number

  spent: number
}

export type RecurringTransaction =
  {
    id: number

    name: string

    amount: number

    type:
      | "income"
      | "expense"

    category: string

    paymentMethod: string

    frequency:
      | "daily"
      | "weekly"
      | "monthly"
      | "yearly"

    nextDueDate: string

    active: boolean
  }