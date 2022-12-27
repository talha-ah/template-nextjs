import { useState, useEffect } from "react"

import { ThemeMode } from "@utils/types"

export const useMaxWidth = () => {
  const [theme, setTheme] = useState<ThemeMode>("light")

  useEffect(() => {
    setTheme(
      window.matchMedia("(prefers-color-scheme: light)").matches
        ? "light"
        : "dark"
    )
  }, [])

  return { theme }
}
