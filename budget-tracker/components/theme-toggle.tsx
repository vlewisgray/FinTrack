"use client"

import { useEffect, useState } from "react"

import { useTheme } from "next-themes"

export default function ThemeToggle() {
  const {
    theme,
    setTheme
  } = useTheme()

  const [mounted, setMounted] =
    useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <button
      onClick={() =>
        setTheme(
          theme === "dark"
            ? "light"
            : "dark"
        )
      }
      className="w-full bg-zinc-800 hover:bg-zinc-700 text-white py-3 rounded-xl transition"
    >
      {theme === "dark"
        ? "Light Mode"
        : "Dark Mode"}
    </button>
  )
}