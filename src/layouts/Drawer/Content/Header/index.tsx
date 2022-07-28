import * as React from "react"

import Box from "@mui/material/Box"
import { Theme } from "@mui/material/styles"
import IconButton from "@mui/material/IconButton"
import DarkModeIcon from "@mui/icons-material/DarkMode"
import LightModeIcon from "@mui/icons-material/LightMode"

import { Logo } from "@components/Logo"
import { useAppContext, AuthTypes } from "@contexts/index"

export default function Header() {
  const { state, dispatch } = useAppContext()

  return (
    <Box
      sx={(theme: Theme) => ({
        py: 2,
        width: "100%",
        height: "64px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
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

        <IconButton
          color="primary"
          onClick={() => {
            dispatch({ type: AuthTypes.TRIGGER_THEME })
          }}
        >
          {state.auth.theme === "light" ? (
            <DarkModeIcon fontSize="small" />
          ) : (
            <LightModeIcon fontSize="small" />
          )}
        </IconButton>
      </Box>
    </Box>
  )
}
