import { PaletteMode } from "@mui/material"
import { grey } from "@mui/material/colors"

import { ThemeMode } from "@utils/types"

export const Palette = (mode: ThemeMode) => {
  mode = getMode(mode)

  if (mode === "dark") return darkPalette()
  return lightPalette()
}

const getMode = (mode: ThemeMode) => {
  if (mode === "system") {
    mode = window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark"
  }

  return mode || "light"
}

const lightPalette = () => {
  return {
    mode: "light" as PaletteMode,
  }
}

const darkPalette = () => {
  return {
    mode: "dark" as PaletteMode,
    background: {
      paper: grey[900],
    },
  }
}
