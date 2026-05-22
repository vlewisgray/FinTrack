"use client"

import { useState } from "react"

import Sidebar from "../../components/sidebar"

import {
  useFinance
} from "../../lib/context/finance-context"

import { categories } from "../../data/categories"

export default function RecurringPage() {
  const {
    recurringTransactions,
    addRecurringTransaction,
    deleteRecurringTransaction,
    creditCards
  } = useFinance()

  const [showModal, setShowModal] =
    useState(false)

  const [formData, setFormData] =
    useState({
      name: "",
      amount: "",
      type: "expense",
      category: "",
      paymentMethod: "",
      frequency: "monthly",
      recurringDay: "",
      active: true
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

  const handleSave = () => {
    if (
      !formData.name ||
      !formData.amount ||
      !formData.paymentMethod ||
      !formData.recurringDay
    ) {
      return
    }

    addRecurringTransaction({
      id: Date.now(),

      name: formData.name,

      amount: Number(
        formData.amount
      ),

      type: formData.type as
        | "income"
        | "expense",

      category:
        formData.type ===
        "expense"
          ? formData.category
          : "",

      paymentMethod:
        formData.paymentMethod,

      frequency:
        formData.frequency as
          | "daily"
          | "weekly"
          | "monthly"
          | "yearly",

      nextDueDate:
        formData.recurringDay,

      active: true
    })

    setShowModal(false)

    setFormData({
      name: "",
      amount: "",
      type: "expense",
      category: "",
      paymentMethod: "",
      frequency: "monthly",
      recurringDay: "",
      active: true
    })
  }

  return (
    <div className="flex min-h-screen bg-black text-white">
      <Sidebar />

      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-5xl font-bold">
            Recurring Transactions
          </h1>

          <button
            onClick={() =>
              setShowModal(true)
            }
            className="bg-white text-black px-6 py-3 rounded-2xl font-semibold"
          >
            Add Recurring
          </button>
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
                  Frequency
                </th>

                <th className="text-left p-5">
                  Schedule
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
              {recurringTransactions.map(
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

                    <td className="p-5 capitalize">
                      {
                        transaction.frequency
                      }
                    </td>

                    <td className="p-5">
                      Every{" "}
                      {
                        transaction.nextDueDate
                      }
                    </td>

                    <td className="p-5 font-bold">
                      ₱
                      {transaction.amount.toLocaleString()}
                    </td>

                    <td className="p-5">
                      <button
                        onClick={() =>
                          deleteRecurringTransaction(
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
                Add Recurring
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
                      category: ""
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

                <select
                  value={
                    formData.frequency
                  }
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      frequency:
                        e.target.value,
                      recurringDay: ""
                    })
                  }
                  className="w-full bg-zinc-800 p-4 rounded-2xl"
                >
                  <option value="daily">
                    Daily
                  </option>

                  <option value="weekly">
                    Weekly
                  </option>

                  <option value="monthly">
                    Monthly
                  </option>

                  <option value="yearly">
                    Yearly
                  </option>
                </select>

                {formData.frequency ===
                  "monthly" && (
                  <input
                    type="number"
                    min="1"
                    max="31"
                    placeholder="Every ___ day of month"
                    value={
                      formData.recurringDay
                    }
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        recurringDay:
                          e.target.value
                      })
                    }
                    className="w-full bg-zinc-800 p-4 rounded-2xl"
                  />
                )}

                {formData.frequency ===
                  "weekly" && (
                  <select
                    value={
                      formData.recurringDay
                    }
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        recurringDay:
                          e.target.value
                      })
                    }
                    className="w-full bg-zinc-800 p-4 rounded-2xl"
                  >
                    <option value="">
                      Select Day
                    </option>

                    <option value="Monday">
                      Monday
                    </option>

                    <option value="Tuesday">
                      Tuesday
                    </option>

                    <option value="Wednesday">
                      Wednesday
                    </option>

                    <option value="Thursday">
                      Thursday
                    </option>

                    <option value="Friday">
                      Friday
                    </option>

                    <option value="Saturday">
                      Saturday
                    </option>

                    <option value="Sunday">
                      Sunday
                    </option>
                  </select>
                )}

                {formData.frequency ===
                  "yearly" && (
                  <input
                    type="text"
                    placeholder="Example: March 1"
                    value={
                      formData.recurringDay
                    }
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        recurringDay:
                          e.target.value
                      })
                    }
                    className="w-full bg-zinc-800 p-4 rounded-2xl"
                  />
                )}

                <div className="flex gap-4 pt-4">
                  <button
                    onClick={handleSave}
                    className="flex-1 bg-white text-black py-3 rounded-2xl font-semibold"
                  >
                    Save
                  </button>

                  <button
                    onClick={() =>
                      setShowModal(false)
                    }
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