"use client"

import * as React from "react"
import { createContext, useContext, useEffect, useState } from "react"

export type Theme = "dark" | "light" | "system"

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  enableSystem?: boolean;
  disableTransitionOnChange?: boolean;
  attribute?: string;
  value?: Record<string, string>;
  [key: string]: any;
}

type ThemeContextType = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | null>(null)

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "theme",
  value: _value,
  ...props
}: ThemeProviderProps) {
  // NOTE: `storageKey` was previously declared in the props interface, passed by
  // App.tsx as "bird-theme", and then never read — the provider hard-coded
  // "theme" for both read and write. Any value already persisted under
  // "theme" by an earlier build therefore silently overrode defaultTheme="dark",
  // which is how users ended up in light mode on a shell that only ever had a
  // dark palette. The key is now honoured on both sides.
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem(storageKey)
      return (savedTheme && (savedTheme === "dark" || savedTheme === "light" || savedTheme === "system")
        ? savedTheme
        : defaultTheme) as Theme
    }
    return defaultTheme as Theme
  })

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove("light", "dark")

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light"
      root.classList.add(systemTheme)
      return
    }

    root.classList.add(theme)
  }, [theme])

  const value: ThemeContextType = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme)
      setTheme(theme)
    },
  }

  return (
    <ThemeContext.Provider value={value} {...props}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}