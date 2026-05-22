import type { Metadata } from "next"

import "./globals.css"

import {
  FinanceProvider
} from "../lib/context/finance-context"

import {
  ThemeProvider
} from "../components/theme-provider"

export const metadata: Metadata = {
  title: "FinTrack",
  description:
    "Finance tracking dashboard"
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider>
          <FinanceProvider>
            {children}
          </FinanceProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}