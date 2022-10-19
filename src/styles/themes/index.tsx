import { useMemo } from "react"

import { CssBaseline, StyledEngineProvider } from "@mui/material"
import { createTheme, ThemeProvider } from "@mui/material/styles"

import Palette from "./palette"
// import Typography from "./typography"
import { ThemeMode } from "@utils/types"
import componentsOverride from "./overrides"
import { useAppContext } from "@contexts/index"

const getTheme = (theme: ThemeMode): "light" | "dark" => {
  if (theme === "system") {
    theme = window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark"
  }

  return theme || "light"
}

export default function ThemeCustomization({
  children,
}: {
  children: React.ReactNode
}) {
  const { state } = useAppContext()

  const theme = useMemo(
    () => ({
      breakpoints: {
        values: {
          xs: 400,
          sm: 768,
          md: 1024,
          lg: 1266,
          xl: 1536,
        },
      },
      direction: "ltr" as "ltr" | "rtl",
      mixins: {
        toolbar: {
          minHeight: 60,
          paddingTop: 8,
          paddingBottom: 8,
        },
      },
      shape: {
        borderRadius: 4,
      },
      palette: Palette(getTheme(state.auth.theme)),
      // typography: Typography,
    }),
    [state.auth.theme]
  )

  const customTheme = createTheme(theme)
  customTheme.components = componentsOverride(customTheme)

  return (
    <StyledEngineProvider injectFirst>
      {/* Inject Emotion before JSS */}
      <ThemeProvider theme={customTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  )
}
