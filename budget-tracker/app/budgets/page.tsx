"use client"

import { useState } from "react"

import Sidebar from "../../components/sidebar"

import {
  useFinance
} from "../../lib/context/finance-context"

import { categories } from "../../data/categories"

export default function BudgetsPage() {
  const {
    budgets,
    addBudget,
    deleteBudget
  } = useFinance()

  const [showModal, setShowModal] =
    useState(false)

  const [category, setCategory] =
    useState("")

  const [limit, setLimit] =
    useState("")

  const handleSave = () => {
    if (
      !category ||
      !limit
    ) {
      return
    }

    addBudget({
      id: Date.now(),

      category,

      limit: Number(limit),

      spent: 0
    })

    setCategory("")
    setLimit("")

    setShowModal(false)
  }

  return (
    <div className="flex min-h-screen bg-black text-white">
      <Sidebar />

      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-5xl font-bold">
            Budgets
          </h1>

          <button
            onClick={() =>
              setShowModal(true)
            }
            className="bg-white text-black px-6 py-3 rounded-2xl font-semibold"
          >
            Add Budget
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {budgets.map((budget) => {
            const progress =
              (
                (budget.spent /
                  budget.limit) *
                100
              ).toFixed(0)

            return (
              <div
                key={budget.id}
                className="bg-zinc-900 rounded-3xl p-6 space-y-4"
              >
                <div className="flex justify-between">
                  <h2 className="text-2xl font-bold">
                    {
                      budget.category
                    }
                  </h2>

                  <span className="text-zinc-400">
                    {progress}%
                  </span>
                </div>

                <div className="w-full bg-zinc-800 h-4 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${
                      Number(
                        progress
                      ) > 100
                        ? "bg-red-500"
                        : "bg-green-500"
                    }`}
                    style={{
                      width: `${Math.min(
                        Number(
                          progress
                        ),
                        100
                      )}%`
                    }}
                  />
                </div>

                <div className="flex justify-between">
                  <p>
                    ₱
                    {budget.spent.toLocaleString()}
                  </p>

                  <p className="text-zinc-400">
                    ₱
                    {budget.limit.toLocaleString()}
                  </p>
                </div>

                <button
                  onClick={() =>
                    deleteBudget(
                      budget.id
                    )
                  }
                  className="w-full bg-red-500 py-3 rounded-2xl font-semibold"
                >
                  Delete
                </button>
              </div>
            )
          })}
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
            <div className="bg-zinc-900 p-8 rounded-3xl w-full max-w-md">
              <h2 className="text-3xl font-bold mb-6">
                Add Budget
              </h2>

              <div className="space-y-4">
                <select
                  value={category}
                  onChange={(e) =>
                    setCategory(
                      e.target.value
                    )
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

                <input
                  type="number"
                  placeholder="Budget Limit"
                  value={limit}
                  onChange={(e) =>
                    setLimit(
                      e.target.value
                    )
                  }
                  className="w-full bg-zinc-800 p-4 rounded-2xl"
                />

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