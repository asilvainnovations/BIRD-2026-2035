import * as React from "react"
import { createContext, useContext, useEffect } from "react"

/**
 * BIRD uses ONE theme: the Liquid Glass brand dark palette (deep green #022c22,
 * gold #C9A84C, cream #ecfdf5) — the same as public/roadmap.html and
 * public/dashboard.html.
 *
 * The previous provider offered light / dark / system. But the app shell
 * (Sidebar, Topbar, MEL Dashboard) hard-codes the dark palette, while content
 * panels used `bg-white dark:bg-…` pairs. Whenever the `dark` class was missing
 * (the topbar toggle, or "system" on a light-mode OS) panels turned white while
 * their text stayed cream/gold — the white-on-white bug. A real light theme
 * would need every component redesigned; until then the theme is locked.
 *
 * The API (`theme`, `setTheme`, `Theme`) is kept so existing callers compile;
 * `setTheme` is a no-op.
 */
export type Theme = "dark" | "light" | "system"

interface ThemeProviderProps {
  children: React.ReactNode
  /** Accepted for compatibility; ignored. */
  defaultTheme?: Theme
  /** Accepted for compatibility; ignored. */
  storageKey?: string
}

type ThemeContextType = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | null>(null)
const LOCKED: ThemeContextType = { theme: "dark", setTheme: () => {} }

export function ThemeProvider({ children, storageKey = "bird-theme" }: ThemeProviderProps) {
  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove("light")
    root.classList.add("dark")
    root.style.colorScheme = "dark"
    // Clear stale preferences written by earlier builds.
    try {
      localStorage.removeItem(storageKey)
      localStorage.removeItem("theme")
    } catch {
      /* storage unavailable — nothing to clear */
    }
  }, [storageKey])

  return <ThemeContext.Provider value={LOCKED}>{children}</ThemeContext.Provider>
}

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext)
  if (!context) throw new Error("useTheme must be used within a ThemeProvider")
  return context
}
