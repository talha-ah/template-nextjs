import * as React from "react"

import { Box } from "@mui/material"
import { Theme } from "@mui/material/styles"

import { Logo } from "@ui/Logo"
import { SelectTheme } from "@forms/profile"
import { APP_BAR_HEIGHT } from "@utils/constants"

export default function Header() {
  return (
    <Box
      sx={(theme: Theme) => ({
        py: 2,
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        height: `${APP_BAR_HEIGHT}px`,
        borderBottom: `1px solid ${theme.palette.divider}`,
      })}
    >
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Logo />
      </Box>

      <SelectTheme view="icons" />
    </Box>
  )
}
