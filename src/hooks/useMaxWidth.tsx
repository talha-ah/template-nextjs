import { useState, useEffect } from "react"

import { useTheme } from "@mui/material/styles"

import { useWindowResize } from "@hooks/useWindowResize"

export const useMaxWidth = (margin?: number) => {
  const theme = useTheme()

  const [windowWidth] = useWindowResize()
  const [maxWidth, setMaxWidth] = useState(0)

  useEffect(() => {
    setMaxWidth(windowWidth - (margin || +theme.spacing(4).replace("px", "")))
  }, [theme, margin, windowWidth])

  return { width: windowWidth, maxWidth }
}
