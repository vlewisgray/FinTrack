"use client"

import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react"

import {
  Budget,
  CreditCard,
  RecurringTransaction,
  SavingsGoal,
  Transaction
} from "../../types"

type FinanceContextType = {
  transactions: Transaction[]

  addTransaction: (
    transaction: Transaction
  ) => void

  editTransaction: (
    transaction: Transaction
  ) => void

  deleteTransaction: (
    id: number
  ) => void

  creditCards: CreditCard[]

  addCreditCard: (
    card: CreditCard
  ) => void

  editCreditCard: (
    card: CreditCard
  ) => void

  deleteCreditCard: (
    id: number
  ) => void

  savingsGoals: SavingsGoal[]

  addSavingsGoal: (
    goal: SavingsGoal
  ) => void

  deleteSavingsGoal: (
    id: number
  ) => void

  budgets: Budget[]

  addBudget: (
    budget: Budget
  ) => void

  editBudget: (
    budget: Budget
  ) => void

  deleteBudget: (
    id: number
  ) => void

  recurringTransactions: RecurringTransaction[]

  addRecurringTransaction: (
    recurring: RecurringTransaction
  ) => void

  deleteRecurringTransaction: (
    id: number
  ) => void
}

const FinanceContext =
  createContext<
    FinanceContextType | undefined
  >(undefined)

export function FinanceProvider({
  children
}: {
  children: React.ReactNode
}) {
  const [
    transactions,
    setTransactions
  ] = useState<Transaction[]>([])

  const [
    creditCards,
    setCreditCards
  ] = useState<CreditCard[]>([])

  const [
    savingsGoals,
    setSavingsGoals
  ] = useState<SavingsGoal[]>([])

  const [budgets, setBudgets] =
    useState<Budget[]>([])

  const [
    recurringTransactions,
    setRecurringTransactions
  ] = useState<
    RecurringTransaction[]
  >([])

  useEffect(() => {
    const storedTransactions =
      localStorage.getItem(
        "transactions"
      )

    const storedCards =
      localStorage.getItem(
        "creditCards"
      )

    const storedGoals =
      localStorage.getItem(
        "savingsGoals"
      )

    const storedBudgets =
      localStorage.getItem(
        "budgets"
      )

    const storedRecurring =
      localStorage.getItem(
        "recurringTransactions"
      )

    if (storedTransactions) {
      setTransactions(
        JSON.parse(
          storedTransactions
        )
      )
    }

    if (storedCards) {
      setCreditCards(
        JSON.parse(storedCards)
      )
    }

    if (storedGoals) {
      setSavingsGoals(
        JSON.parse(storedGoals)
      )
    }

    if (storedBudgets) {
      setBudgets(
        JSON.parse(storedBudgets)
      )
    }

    if (storedRecurring) {
      setRecurringTransactions(
        JSON.parse(storedRecurring)
      )
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(
      "transactions",
      JSON.stringify(transactions)
    )
  }, [transactions])

  useEffect(() => {
    localStorage.setItem(
      "creditCards",
      JSON.stringify(creditCards)
    )
  }, [creditCards])

  useEffect(() => {
    localStorage.setItem(
      "savingsGoals",
      JSON.stringify(savingsGoals)
    )
  }, [savingsGoals])

  useEffect(() => {
    localStorage.setItem(
      "budgets",
      JSON.stringify(budgets)
    )
  }, [budgets])

  useEffect(() => {
    localStorage.setItem(
      "recurringTransactions",
      JSON.stringify(
        recurringTransactions
      )
    )
  }, [recurringTransactions])

  const addTransaction = (
    transaction: Transaction
  ) => {
    setTransactions((prev) => [
      transaction,
      ...prev
    ])

    if (
      transaction.type ===
      "savings"
    ) {
      setSavingsGoals((prev) =>
        prev.map((goal) =>
          goal.id ===
          transaction.savingsGoalId
            ? {
                ...goal,
                saved:
                  goal.saved +
                  transaction.amount
              }
            : goal
        )
      )
    }

    const matchingCard =
      creditCards.find(
        (card) =>
          card.name ===
          transaction.paymentMethod
      )

    if (
      matchingCard &&
      transaction.type ===
        "expense"
    ) {
      setCreditCards((prev) =>
        prev.map((card) =>
          card.name ===
          transaction.paymentMethod
            ? {
                ...card,
                used:
                  card.used +
                  transaction.amount
              }
            : card
        )
      )
    }

    setBudgets((prev) =>
      prev.map((budget) =>
        budget.category ===
          transaction.category &&
        transaction.type ===
          "expense"
          ? {
              ...budget,
              spent:
                budget.spent +
                transaction.amount
            }
          : budget
      )
    )
  }

  const editTransaction = (
    updated: Transaction
  ) => {
    setTransactions((prev) =>
      prev.map((transaction) =>
        transaction.id === updated.id
          ? updated
          : transaction
      )
    )
  }

  const deleteTransaction = (
    id: number
  ) => {
    setTransactions((prev) =>
      prev.filter(
        (transaction) =>
          transaction.id !== id
      )
    )
  }

  const addCreditCard = (
    card: CreditCard
  ) => {
    setCreditCards((prev) => [
      ...prev,
      card
    ])
  }

  const editCreditCard = (
    updated: CreditCard
  ) => {
    setCreditCards((prev) =>
      prev.map((card) =>
        card.id === updated.id
          ? updated
          : card
      )
    )
  }

  const deleteCreditCard = (
    id: number
  ) => {
    setCreditCards((prev) =>
      prev.filter(
        (card) =>
          card.id !== id
      )
    )
  }

  const addSavingsGoal = (
    goal: SavingsGoal
  ) => {
    setSavingsGoals((prev) => [
      ...prev,
      goal
    ])
  }

  const deleteSavingsGoal = (
    id: number
  ) => {
    setSavingsGoals((prev) =>
      prev.filter(
        (goal) =>
          goal.id !== id
      )
    )
  }

  const addBudget = (
    budget: Budget
  ) => {
    setBudgets((prev) => [
      ...prev,
      budget
    ])
  }

  const editBudget = (
    updated: Budget
  ) => {
    setBudgets((prev) =>
      prev.map((budget) =>
        budget.id === updated.id
          ? updated
          : budget
      )
    )
  }

  const deleteBudget = (
    id: number
  ) => {
    setBudgets((prev) =>
      prev.filter(
        (budget) =>
          budget.id !== id
      )
    )
  }

  const addRecurringTransaction =
    (
      recurring: RecurringTransaction
    ) => {
      setRecurringTransactions(
        (prev) => [
          ...prev,
          recurring
        ]
      )
    }

  const deleteRecurringTransaction =
    (id: number) => {
      setRecurringTransactions(
        (prev) =>
          prev.filter(
            (
              recurring
            ) =>
              recurring.id !== id
          )
      )
    }

  return (
    <FinanceContext.Provider
      value={{
        transactions,
        addTransaction,
        editTransaction,
        deleteTransaction,

        creditCards,
        addCreditCard,
        editCreditCard,
        deleteCreditCard,

        savingsGoals,
        addSavingsGoal,
        deleteSavingsGoal,

        budgets,
        addBudget,
        editBudget,
        deleteBudget,

        recurringTransactions,
        addRecurringTransaction,
        deleteRecurringTransaction
      }}
    >
      {children}
    </FinanceContext.Provider>
  )
}

export function useFinance() {
  const context =
    useContext(
      FinanceContext
    )

  if (!context) {
    throw new Error(
      "useFinance must be used within FinanceProvider"
    )
  }

  return context
}