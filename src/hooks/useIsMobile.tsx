import { useMediaQuery } from "@mui/material"
import { useTheme } from "@mui/material/styles"

export const useIsMobile = () => {
  const theme = useTheme()

  const isMobile = useMediaQuery(`(max-width:${theme.breakpoints.values.md}px)`)

  return { isMobile }
}
