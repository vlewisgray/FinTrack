type Props = {
  name: string

  target: number

  saved: number

  targetDate: string

  balance: number
}

export default function SavingsGoalCard({
  name,
  target,
  saved,
  targetDate,
  balance
}: Props) {
  const progress =
    (saved / target) * 100

  const targetDay =
    new Date(targetDate)

  const now = new Date()

  const difference =
    targetDay.getTime() -
    now.getTime()

  const daysLeft = Math.ceil(
    difference /
      (1000 * 60 * 60 * 24)
  )

  const remaining =
    target - saved

  const monthlyNeeded =
    daysLeft > 0
      ? remaining /
        (daysLeft / 30)
      : remaining

  const dailyNeeded =
    daysLeft > 0
      ? remaining / daysLeft
      : remaining

  const recommendedSavings =
    balance > 0
      ? balance * 0.2
      : 0

  const isAffordable =
    recommendedSavings >=
    dailyNeeded * 30

  return (
    <div className="bg-zinc-900 rounded-3xl p-6">
      <div className="flex justify-between mb-4">
        <h3 className="text-2xl font-bold">
          {name}
        </h3>

        <span className="text-zinc-400">
          {progress.toFixed(0)}%
        </span>
      </div>

      <div className="w-full bg-zinc-800 h-4 rounded-full overflow-hidden mb-6">
        <div
          className="bg-green-500 h-full rounded-full"
          style={{
            width: `${progress}%`
          }}
        />
      </div>

      <div className="space-y-3">
        <div className="flex justify-between">
          <p className="text-lg font-bold">
            ₱{saved.toLocaleString()}
          </p>

          <p className="text-zinc-400">
            ₱{target.toLocaleString()}
          </p>
        </div>

        <div className="bg-zinc-800 rounded-2xl p-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-zinc-400">
              Remaining
            </span>

            <span>
              ₱
              {remaining.toLocaleString()}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-zinc-400">
              Monthly Needed
            </span>

            <span>
              ₱
              {monthlyNeeded.toFixed(0)}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-zinc-400">
              Daily Needed
            </span>

            <span>
              ₱
              {dailyNeeded.toFixed(0)}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-zinc-400">
              Recommended Savings
            </span>

            <span className="text-green-400 font-bold">
              ₱
              {recommendedSavings.toFixed(
                0
              )}
            </span>
          </div>
        </div>

        <div className="flex justify-between items-center pt-2">
          <p className="text-sm text-zinc-500">
            {daysLeft > 0
              ? `${daysLeft} days left`
              : "Goal overdue"}
          </p>

          <span
            className={`text-sm font-semibold ${
              isAffordable
                ? "text-green-400"
                : "text-red-400"
            }`}
          >
            {isAffordable
              ? "Affordable"
              : "High Risk"}
          </span>
        </div>
      </div>
    </div>
  )
}