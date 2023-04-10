import { useState, useEffect } from "react"

import { ThemeMode } from "@utils/types"

export const useSystemTheme = () => {
  const [theme, setTheme] = useState<ThemeMode>("light")

  useEffect(() => {
    if (typeof window === "undefined") return

    setTheme(
      window.matchMedia("(prefers-color-scheme: light)").matches
        ? "light"
        : "dark"
    )
  }, [])

  return { theme }
}
