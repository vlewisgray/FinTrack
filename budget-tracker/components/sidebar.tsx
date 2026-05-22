"use client"

import Link from "next/link"

import { usePathname } from "next/navigation"

export default function Sidebar() {
  const pathname =
    usePathname()

  const links = [
    {
      name: "Dashboard",
      href: "/dashboard"
    },

    {
      name: "Transactions",
      href: "/transactions"
    },

    {
      name: "Budgets",
      href: "/budgets"
    },

    {
      name: "Credit Cards",
      href: "/credit-cards"
    },

    {
      name: "Recurring",
      href: "/recurring"
    },

    {
      name: "Reports",
      href: "/reports"
    }
  ]

  return (
    <aside className="w-72 bg-zinc-950 border-r border-zinc-900 p-8">
      <h1 className="text-5xl font-bold mb-14">
        FinTrack
      </h1>

      <nav className="space-y-4">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`block px-5 py-4 rounded-2xl text-xl transition ${
              pathname ===
              link.href
                ? "bg-white text-black font-bold"
                : "hover:bg-zinc-900"
            }`}
          >
            {link.name}
          </Link>
        ))}
      </nav>
    </aside>
  )
}