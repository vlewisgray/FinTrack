"use client"

import { useState } from "react"

import Sidebar from "../../components/sidebar"

import {
  useFinance
} from "../../lib/context/finance-context"

export default function CreditCardsPage() {
  const {
    creditCards,
    addCreditCard,
    deleteCreditCard,
    editCreditCard
  } = useFinance()

  const [showModal, setShowModal] =
    useState(false)

  const [editingId, setEditingId] =
    useState<number | null>(null)

  const [cardName, setCardName] =
    useState("")

  const [cardLimit, setCardLimit] =
    useState("")

  const [cardUsed, setCardUsed] =
    useState("")

  const resetForm = () => {
    setCardName("")
    setCardLimit("")
    setCardUsed("")
    setEditingId(null)
  }

  const handleSave = () => {
    if (
      !cardName ||
      !cardLimit
    ) {
      return
    }

    const card = {
      id:
        editingId || Date.now(),

      name: cardName,

      limit: Number(cardLimit),

      used: Number(cardUsed || 0)
    }

    if (editingId) {
      editCreditCard(card)
    } else {
      addCreditCard(card)
    }

    resetForm()

    setShowModal(false)
  }

  const handleEdit = (
    card: any
  ) => {
    setEditingId(card.id)

    setCardName(card.name)

    setCardLimit(
      card.limit.toString()
    )

    setCardUsed(
      card.used.toString()
    )

    setShowModal(true)
  }

  return (
    <div className="flex min-h-screen bg-black text-white">
      <Sidebar />

      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-5xl font-bold">
            Credit Cards
          </h1>

          <button
            onClick={() =>
              setShowModal(true)
            }
            className="bg-white text-black px-6 py-3 rounded-2xl font-semibold"
          >
            Add Card
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {creditCards.map((card) => {
            const utilization =
              (
                (card.used /
                  card.limit) *
                100
              ).toFixed(0)

            return (
              <div
                key={card.id}
                className="bg-zinc-900 rounded-3xl p-6 space-y-4"
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">
                    {card.name}
                  </h2>

                  <span className="text-zinc-400">
                    {utilization}%
                  </span>
                </div>

                <div className="w-full bg-zinc-800 h-4 rounded-full overflow-hidden">
                  <div
                    className="bg-yellow-400 h-full"
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

                <div className="flex justify-between">
                  <p>
                    ₱
                    {card.used.toLocaleString()}
                  </p>

                  <p className="text-zinc-400">
                    ₱
                    {card.limit.toLocaleString()}
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() =>
                      handleEdit(card)
                    }
                    className="flex-1 bg-yellow-500 text-black py-3 rounded-2xl font-semibold"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      deleteCreditCard(
                        card.id
                      )
                    }
                    className="flex-1 bg-red-500 py-3 rounded-2xl font-semibold"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
            <div className="bg-zinc-900 p-8 rounded-3xl w-full max-w-md">
              <h2 className="text-3xl font-bold mb-6">
                {editingId
                  ? "Edit Credit Card"
                  : "Add Credit Card"}
              </h2>

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Card Name"
                  value={cardName}
                  onChange={(e) =>
                    setCardName(
                      e.target.value
                    )
                  }
                  className="w-full bg-zinc-800 p-4 rounded-2xl"
                />

                <input
                  type="number"
                  placeholder="Credit Limit"
                  value={cardLimit}
                  onChange={(e) =>
                    setCardLimit(
                      e.target.value
                    )
                  }
                  className="w-full bg-zinc-800 p-4 rounded-2xl"
                />

                <input
                  type="number"
                  placeholder="Used Amount"
                  value={cardUsed}
                  onChange={(e) =>
                    setCardUsed(
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