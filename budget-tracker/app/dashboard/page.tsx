"use client"

import { useMemo, useState } from "react"

import Sidebar from "../../components/sidebar"

import StatCard from "../../components/stat-card"

import SavingsGoalCard from "../../components/savings-goal-card"

import {
  calculateBalance,
  calculateExpenses,
  calculateIncome,
  calculateDailyExpenses,
  calculateWeeklyExpenses
} from "../../lib/finance"

import {
  useFinance
} from "../../lib/context/finance-context"

export default function DashboardPage() {
  const {
    transactions,
    creditCards,
    savingsGoals,
    addSavingsGoal,
    deleteSavingsGoal,
    budgets,
    recurringTransactions
  } = useFinance()

  const [showModal, setShowModal] =
    useState(false)

  const [goalName, setGoalName] =
    useState("")

  const [goalTarget, setGoalTarget] =
    useState("")

  const [goalDate, setGoalDate] =
    useState("")

  const income =
    calculateIncome(transactions)

  const expenses =
    calculateExpenses(transactions)

  const balance =
    calculateBalance(transactions)

  const dailyExpenses =
    calculateDailyExpenses(
      transactions
    )

  const weeklyExpenses =
    calculateWeeklyExpenses(
      transactions
    )

  const upcomingRecurring =
    recurringTransactions
      .filter(
        (transaction) =>
          transaction.active
      )
      .slice(0, 5)

  const projectedExpenses =
    recurringTransactions
      .filter(
        (transaction) =>
          transaction.type ===
            "expense" &&
          transaction.active
      )
      .reduce(
        (
          acc,
          transaction
        ) =>
          acc +
          transaction.amount,
        0
      )

  const projectedIncome =
    recurringTransactions
      .filter(
        (transaction) =>
          transaction.type ===
            "income" &&
          transaction.active
      )
      .reduce(
        (
          acc,
          transaction
        ) =>
          acc +
          transaction.amount,
        0
      )

  const projectedBalance =
    balance +
    projectedIncome -
    projectedExpenses

  const expenseTransactions =
    transactions.filter(
      (transaction) =>
        transaction.type ===
        "expense"
    )

  const totalExpenseAnalytics =
    expenseTransactions.reduce(
      (
        acc,
        transaction
      ) =>
        acc + transaction.amount,
      0
    )

  const categoryAnalytics =
    useMemo(() => {
      const grouped: Record<
        string,
        number
      > = {}

      expenseTransactions.forEach(
        (transaction) => {
          if (
            !grouped[
              transaction.category
            ]
          ) {
            grouped[
              transaction.category
            ] = 0
          }

          grouped[
            transaction.category
          ] += transaction.amount
        }
      )

      return Object.entries(
        grouped
      ).sort(
        (a, b) => b[1] - a[1]
      )
    }, [transactions])

  const financialInsights =
    useMemo(() => {
      const insights: string[] = []

      budgets.forEach((budget) => {
        const percentage =
          (budget.spent /
            budget.limit) *
          100

        if (percentage >= 100) {
          insights.push(
            `${budget.category} budget exceeded`
          )
        } else if (
          percentage >= 80
        ) {
          insights.push(
            `${budget.category} nearing limit`
          )
        }
      })

      creditCards.forEach((card) => {
        const utilization =
          (card.used /
            card.limit) *
          100

        if (utilization >= 80) {
          insights.push(
            `${card.name} utilization is high`
          )
        }
      })

      if (
        projectedBalance < 0
      ) {
        insights.push(
          "Projected cashflow deficit detected"
        )
      }

      if (
        expenses > income
      ) {
        insights.push(
          "Expenses exceed income"
        )
      }

      if (
        insights.length === 0
      ) {
        insights.push(
          "Financial health stable"
        )
      }

      return insights
    }, [
      budgets,
      creditCards,
      projectedBalance,
      expenses,
      income
    ])

  const handleSaveGoal = () => {
    if (
      !goalName ||
      !goalTarget ||
      !goalDate
    ) {
      return
    }

    addSavingsGoal({
      id: Date.now(),

      name: goalName,

      target: Number(goalTarget),

      saved: 0,

      targetDate: goalDate
    })

    setGoalName("")
    setGoalTarget("")
    setGoalDate("")

    setShowModal(false)
  }

  const formatRecurringSchedule = (
    frequency: string,
    due: string
  ) => {
    if (
      frequency === "monthly"
    ) {
      const suffix =
        due === "1"
          ? "st"
          : due === "2"
            ? "nd"
            : due === "3"
              ? "rd"
              : "th"

      return `${due}${suffix} of every month`
    }

    if (
      frequency === "weekly"
    ) {
      return `Every ${due}`
    }

    if (
      frequency === "yearly"
    ) {
      return `Every ${due}`
    }

    return "Daily"
  }

  return (
    <div className="flex min-h-screen bg-black text-white">
      <Sidebar />

      <main className="flex-1 p-8">
        <h1 className="text-5xl font-bold mb-10">
          Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">
          <StatCard
            title="Total Balance"
            value={`₱${balance.toLocaleString()}`}
          />

          <StatCard
            title="Income"
            value={`₱${income.toLocaleString()}`}
            color="text-green-400"
          />

          <StatCard
            title="Total Expenses"
            value={`₱${expenses.toLocaleString()}`}
            color="text-red-400"
          />

          <StatCard
            title="Daily Expenses"
            value={`₱${dailyExpenses.toLocaleString()}`}
            color="text-orange-400"
          />

          <StatCard
            title="Weekly Expenses"
            value={`₱${weeklyExpenses.toLocaleString()}`}
            color="text-pink-400"
          />

          <StatCard
            title="Projected Balance"
            value={`₱${projectedBalance.toLocaleString()}`}
            color="text-cyan-400"
          />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-12">
          <div className="bg-zinc-900 rounded-3xl p-8">
            <h2 className="text-3xl font-bold mb-6">
              Upcoming Recurring
            </h2>

            <div className="space-y-4">
              {upcomingRecurring.map(
                (transaction) => (
                  <div
                    key={transaction.id}
                    className="bg-zinc-800 rounded-2xl p-5 flex justify-between"
                  >
                    <div>
                      <p className="font-bold text-lg">
                        {
                          transaction.name
                        }
                      </p>

                      <p className="text-zinc-400">
                        {
                          transaction.frequency
                        }
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="font-bold">
                        ₱
                        {transaction.amount.toLocaleString()}
                      </p>

                      <p className="text-zinc-400">
                        {formatRecurringSchedule(
                          transaction.frequency,
                          transaction.nextDueDate
                        )}
                      </p>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          <div className="bg-zinc-900 rounded-3xl p-8">
            <h2 className="text-3xl font-bold mb-6">
              Financial Insights
            </h2>

            <div className="space-y-4">
              {financialInsights.map(
                (
                  insight,
                  index
                ) => (
                  <div
                    key={index}
                    className="bg-zinc-800 rounded-2xl p-5"
                  >
                    {insight}
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6">
            Expense Analytics
          </h2>

          <div className="space-y-5">
            {categoryAnalytics.map(
              ([category, amount]) => {
                const percentage =
                  totalExpenseAnalytics >
                  0
                    ? (
                        (amount /
                          totalExpenseAnalytics) *
                        100
                      ).toFixed(0)
                    : "0"

                return (
                  <div
                    key={category}
                    className="bg-zinc-900 p-5 rounded-2xl"
                  >
                    <div className="flex justify-between mb-2">
                      <span>
                        {category}
                      </span>

                      <span>
                        ₱
                        {amount.toLocaleString()}{" "}
                        ({percentage}
                        %)
                      </span>
                    </div>

                    <div className="w-full bg-zinc-800 h-4 rounded-full overflow-hidden">
                      <div
                        className="bg-green-500 h-full"
                        style={{
                          width: `${Math.min(
                            Number(
                              percentage
                            ),
                            100
                          )}%`
                        }}
                      />
                    </div>
                  </div>
                )
              }
            )}
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6">
            Credit Card Utilization
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {creditCards.map((card) => {
              const utilization =
                card.limit > 0
                  ? (
                      (card.used /
                        card.limit) *
                      100
                    ).toFixed(0)
                  : "0"

              return (
                <div
                  key={card.id}
                  className="bg-zinc-900 rounded-3xl p-6"
                >
                  <div className="flex justify-between mb-4">
                    <h3 className="text-2xl font-bold">
                      {card.name}
                    </h3>

                    <span className="text-yellow-400 font-bold">
                      {utilization}%
                    </span>
                  </div>

                  <div className="w-full bg-zinc-800 h-4 rounded-full overflow-hidden mb-4">
                    <div
                      className="bg-green-500 h-full"
                      style={{
                        width: `${Math.min(
                          Number(
                            utilization
                          ),
                          100
                        )}%`
                      }}
                    />
                  </div>

                  <div className="flex justify-between text-sm">
                    <span>
                      ₱
                      {card.used.toLocaleString()}
                    </span>

                    <span className="text-zinc-400">
                      ₱
                      {card.limit.toLocaleString()}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">
            Savings Goals
          </h2>

          <button
            onClick={() =>
              setShowModal(true)
            }
            className="bg-white text-black px-5 py-3 rounded-2xl font-semibold"
          >
            Add Goal
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {savingsGoals.map((goal) => (
            <div
              key={goal.id}
              className="space-y-3"
            >
              <SavingsGoalCard
                name={goal.name}
                target={goal.target}
                saved={goal.saved}
                targetDate={
                  goal.targetDate
                }
                balance={balance}
              />

              <button
                onClick={() =>
                  deleteSavingsGoal(
                    goal.id
                  )
                }
                className="w-full bg-red-500 py-2 rounded-2xl font-semibold"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}