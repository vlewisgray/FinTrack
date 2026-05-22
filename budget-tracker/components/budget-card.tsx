"use client"

type BudgetCardProps = {
  category: string
  limit: number
  spent: number
}

export default function BudgetCard({
  category,
  limit,
  spent
}: BudgetCardProps) {
  const remaining =
    limit - spent

  const percentage = Math.min(
    (spent / limit) * 100,
    100
  )

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">
          {category}
        </h2>

        <p className="text-zinc-400">
          ₱{limit.toLocaleString()}
        </p>
      </div>

      <div className="w-full bg-zinc-800 rounded-full h-4 mb-4">
        <div
          className={`h-4 rounded-full ${
            percentage >= 100
              ? "bg-red-500"
              : percentage >= 80
              ? "bg-yellow-500"
              : "bg-green-500"
          }`}
          style={{
            width: `${percentage}%`
          }}
        />
      </div>

      <div className="flex items-center justify-between">
        <div>
          <p className="text-zinc-400 text-sm">
            Spent
          </p>

          <p className="font-bold text-red-400">
            ₱{spent.toLocaleString()}
          </p>
        </div>

        <div className="text-right">
          <p className="text-zinc-400 text-sm">
            Remaining
          </p>

          <p className="font-bold text-green-400">
            ₱
            {remaining.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  )
}