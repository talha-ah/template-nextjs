import { CssBaseline, StyledEngineProvider } from "@mui/material"
import { createTheme, ThemeProvider } from "@mui/material/styles"

import { theme } from "./theme"

import componentsOverride from "./overrides"
import { useAppContext } from "@contexts/index"

export default function ThemeCustomization({
  children,
}: {
  children: React.ReactNode
}) {
  const { state } = useAppContext()

  const customTheme = createTheme(theme(state.auth.theme))
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
