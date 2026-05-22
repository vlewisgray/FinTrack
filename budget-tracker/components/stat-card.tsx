type Props = {
  title: string

  value: string

  color?: string
}

export default function StatCard({
  title,
  value,
  color = "text-white"
}: Props) {
  return (
    <div className="bg-zinc-900 rounded-3xl p-6">
      <p className="text-zinc-400 mb-3">
        {title}
      </p>

      <h2
        className={`text-4xl font-bold ${color}`}
      >
        {value}
      </h2>
    </div>
  )
}