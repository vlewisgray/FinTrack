"use client"

import { useMemo, useState } from "react"

import Sidebar from "../../components/sidebar"

import {
  useFinance
} from "../../lib/context/finance-context"

import { categories } from "../../data/categories"

export default function TransactionsPage() {
  const {
    transactions,
    addTransaction,
    editTransaction,
    deleteTransaction,
    savingsGoals,
    creditCards
  } = useFinance()

  const [showModal, setShowModal] =
    useState(false)

  const [editingId, setEditingId] =
    useState<number | null>(null)

  const [search, setSearch] =
    useState("")

  const [typeFilter, setTypeFilter] =
    useState("all")

  const [
    categoryFilter,
    setCategoryFilter
  ] = useState("all")

  const [
    paymentFilter,
    setPaymentFilter
  ] = useState("all")

  const [dateFilter, setDateFilter] =
    useState("all")

  const [formData, setFormData] =
    useState({
      name: "",
      amount: "",
      type: "expense",
      category: "",
      paymentMethod: "",
      savingsGoalId: ""
    })

  const paymentMethods = [
    "Cash",
    "GCash",
    "Maya",
    "Bank Transfer",
    ...creditCards.map(
      (card) => card.name
    )
  ]

  const resetForm = () => {
    setFormData({
      name: "",
      amount: "",
      type: "expense",
      category: "",
      paymentMethod: "",
      savingsGoalId: ""
    })

    setEditingId(null)
  }

  const handleSave = () => {
    if (
      !formData.name ||
      !formData.amount
    ) {
      return
    }

    const now = new Date()

    const transaction = {
      id:
        editingId || Date.now(),

      name: formData.name,

      amount: Number(
        formData.amount
      ),

      type: formData.type as
        | "income"
        | "expense"
        | "savings",

      category:
        formData.type ===
        "expense"
          ? formData.category
          : "",

      paymentMethod:
        formData.paymentMethod,

      date:
        now.toLocaleDateString(),

      time:
        now.toLocaleTimeString(),

      savingsGoalId:
        formData.type ===
        "savings"
          ? Number(
              formData.savingsGoalId
            )
          : undefined
    }

    if (editingId) {
      editTransaction(
        transaction
      )
    } else {
      addTransaction(
        transaction
      )
    }

    resetForm()

    setShowModal(false)
  }

  const handleEdit = (
    transaction: any
  ) => {
    setEditingId(
      transaction.id
    )

    setFormData({
      name: transaction.name,

      amount:
        transaction.amount.toString(),

      type: transaction.type,

      category:
        transaction.category,

      paymentMethod:
        transaction.paymentMethod,

      savingsGoalId:
        transaction.savingsGoalId?.toString() ||
        ""
    })

    setShowModal(true)
  }

  const filteredTransactions =
    useMemo(() => {
      return transactions.filter(
        (transaction) => {
          const matchesSearch =
            transaction.name
              .toLowerCase()
              .includes(
                search.toLowerCase()
              )

          const matchesType =
            typeFilter === "all"
              ? true
              : transaction.type ===
                typeFilter

          const matchesCategory =
            categoryFilter ===
            "all"
              ? true
              : transaction.category ===
                categoryFilter

          const matchesPayment =
            paymentFilter === "all"
              ? true
              : transaction.paymentMethod ===
                paymentFilter

          let matchesDate = true

          const today =
            new Date()

          const transactionDate =
            new Date(
              transaction.date
            )

          const difference =
            today.getTime() -
            transactionDate.getTime()

          const days =
            difference /
            (1000 *
              60 *
              60 *
              24)

          if (
            dateFilter === "today"
          ) {
            matchesDate =
              transaction.date ===
              today.toLocaleDateString()
          }

          if (
            dateFilter === "week"
          ) {
            matchesDate =
              days <= 7
          }

          if (
            dateFilter === "month"
          ) {
            matchesDate =
              days <= 30
          }

          return (
            matchesSearch &&
            matchesType &&
            matchesCategory &&
            matchesPayment &&
            matchesDate
          )
        }
      )
    }, [
      transactions,
      search,
      typeFilter,
      categoryFilter,
      paymentFilter,
      dateFilter
    ])

  return (
    <div className="flex min-h-screen bg-black text-white">
      <Sidebar />

      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-5xl font-bold">
            Transactions
          </h1>

          <button
            onClick={() =>
              setShowModal(true)
            }
            className="bg-white text-black px-6 py-3 rounded-2xl font-semibold"
          >
            Add Transaction
          </button>
        </div>

        <div className="bg-zinc-900 rounded-3xl p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
            <input
              type="text"
              placeholder="Search Transaction"
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="bg-zinc-800 p-4 rounded-2xl"
            />

            <select
              value={typeFilter}
              onChange={(e) =>
                setTypeFilter(
                  e.target.value
                )
              }
              className="bg-zinc-800 p-4 rounded-2xl"
            >
              <option value="all">
                All Types
              </option>

              <option value="income">
                Income
              </option>

              <option value="expense">
                Expense
              </option>

              <option value="savings">
                Savings
              </option>
            </select>

            <select
              value={categoryFilter}
              onChange={(e) =>
                setCategoryFilter(
                  e.target.value
                )
              }
              className="bg-zinc-800 p-4 rounded-2xl"
            >
              <option value="all">
                All Categories
              </option>

              {categories.map(
                (category) => (
                  <option
                    key={category}
                    value={category}
                  >
                    {category}
                  </option>
                )
              )}
            </select>

            <select
              value={paymentFilter}
              onChange={(e) =>
                setPaymentFilter(
                  e.target.value
                )
              }
              className="bg-zinc-800 p-4 rounded-2xl"
            >
              <option value="all">
                All Payments
              </option>

              {paymentMethods.map(
                (method) => (
                  <option
                    key={method}
                    value={method}
                  >
                    {method}
                  </option>
                )
              )}
            </select>

            <select
              value={dateFilter}
              onChange={(e) =>
                setDateFilter(
                  e.target.value
                )
              }
              className="bg-zinc-800 p-4 rounded-2xl"
            >
              <option value="all">
                All Time
              </option>

              <option value="today">
                Today
              </option>

              <option value="week">
                This Week
              </option>

              <option value="month">
                This Month
              </option>
            </select>
          </div>
        </div>

        <div className="bg-zinc-900 rounded-3xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-zinc-800">
              <tr>
                <th className="text-left p-5">
                  Name
                </th>

                <th className="text-left p-5">
                  Type
                </th>

                <th className="text-left p-5">
                  Category
                </th>

                <th className="text-left p-5">
                  Payment
                </th>

                <th className="text-left p-5">
                  Date
                </th>

                <th className="text-left p-5">
                  Time
                </th>

                <th className="text-left p-5">
                  Amount
                </th>

                <th className="text-left p-5">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredTransactions.map(
                (transaction) => (
                  <tr
                    key={transaction.id}
                    className="border-t border-zinc-800"
                  >
                    <td className="p-5">
                      {transaction.name}
                    </td>

                    <td className="p-5 capitalize">
                      {transaction.type}
                    </td>

                    <td className="p-5">
                      {transaction.category ||
                        "-"}
                    </td>

                    <td className="p-5">
                      {
                        transaction.paymentMethod
                      }
                    </td>

                    <td className="p-5">
                      {transaction.date}
                    </td>

                    <td className="p-5">
                      {transaction.time}
                    </td>

                    <td className="p-5 font-bold">
                      ₱
                      {transaction.amount.toLocaleString()}
                    </td>

                    <td className="p-5 flex gap-3">
                      <button
                        onClick={() =>
                          handleEdit(
                            transaction
                          )
                        }
                        className="bg-yellow-500 text-black px-4 py-2 rounded-xl"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          deleteTransaction(
                            transaction.id
                          )
                        }
                        className="bg-red-500 px-4 py-2 rounded-xl"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
            <div className="bg-zinc-900 p-8 rounded-3xl w-full max-w-md">
              <h2 className="text-3xl font-bold mb-6">
                {editingId
                  ? "Edit Transaction"
                  : "Add Transaction"}
              </h2>

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      name: e.target.value
                    })
                  }
                  className="w-full bg-zinc-800 p-4 rounded-2xl"
                />

                <input
                  type="number"
                  placeholder="Amount"
                  value={formData.amount}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      amount:
                        e.target.value
                    })
                  }
                  className="w-full bg-zinc-800 p-4 rounded-2xl"
                />

                <select
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      type: e.target.value,
                      category: "",
                      savingsGoalId: ""
                    })
                  }
                  className="w-full bg-zinc-800 p-4 rounded-2xl"
                >
                  <option value="expense">
                    Expense
                  </option>

                  <option value="income">
                    Income
                  </option>

                  <option value="savings">
                    Savings
                  </option>
                </select>

                {formData.type ===
                  "expense" && (
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        category:
                          e.target.value
                      })
                    }
                    className="w-full bg-zinc-800 p-4 rounded-2xl"
                  >
                    <option value="">
                      Select Category
                    </option>

                    {categories.map(
                      (category) => (
                        <option
                          key={category}
                          value={category}
                        >
                          {category}
                        </option>
                      )
                    )}
                  </select>
                )}

                {formData.type ===
                  "savings" && (
                  <select
                    value={
                      formData.savingsGoalId
                    }
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        savingsGoalId:
                          e.target.value
                      })
                    }
                    className="w-full bg-zinc-800 p-4 rounded-2xl"
                  >
                    <option value="">
                      Select Goal
                    </option>

                    {savingsGoals.map(
                      (goal) => (
                        <option
                          key={goal.id}
                          value={goal.id}
                        >
                          {goal.name}
                        </option>
                      )
                    )}
                  </select>
                )}

                <select
                  value={
                    formData.paymentMethod
                  }
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      paymentMethod:
                        e.target.value
                    })
                  }
                  className="w-full bg-zinc-800 p-4 rounded-2xl"
                >
                  <option value="">
                    Payment Method
                  </option>

                  {paymentMethods.map(
                    (method) => (
                      <option
                        key={method}
                        value={method}
                      >
                        {method}
                      </option>
                    )
                  )}
                </select>

                <div className="flex gap-4 pt-4">
                  <button
                    onClick={handleSave}
                    className="flex-1 bg-white text-black py-3 rounded-2xl font-semibold"
                  >
                    Save
                  </button>

                  <button
                    onClick={() => {
                      resetForm()
                      setShowModal(false)
                    }}
                    className="flex-1 bg-zinc-800 py-3 rounded-2xl"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}