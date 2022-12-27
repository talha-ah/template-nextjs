import { ThemeMode } from "@utils/types"

import { Palette } from "./palette"
// import Typography from "./typography"

export const theme = (mode: ThemeMode) => {
  return {
    palette: Palette(mode),
    // typography: Typography,
    direction: "ltr" as "ltr" | "rtl",
    shape: {
      borderRadius: 4,
    },
    breakpoints: {
      values: {
        xs: 400,
        sm: 768,
        md: 1024,
        lg: 1266,
        xl: 1536,
      },
    },
    mixins: {
      toolbar: {
        minHeight: 60,
        paddingTop: 8,
        paddingBottom: 8,
      },
    },
  }
}
