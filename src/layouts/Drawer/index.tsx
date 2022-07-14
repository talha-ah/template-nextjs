import * as React from "react"
import { useEffect, useState } from "react"

import Box from "@mui/material/Box"
import Fab from "@mui/material/Fab"
import Menu from "@mui/icons-material/Menu"
import useMediaQuery from "@mui/material/useMediaQuery"
import { styled, Theme, useTheme } from "@mui/material/styles"

import { drawerWidth } from "@utils/config"

import DrawerContent from "./DrawerContent"

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(2),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}))

export const DrawerLayout = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme()

  const [open, setOpen] = useState(true)
  const isMobile = useMediaQuery(`(max-width:${theme.breakpoints.values.md}px)`)

  const triggerDrawer = () => setOpen((s) => !s)

  useEffect(() => {
    if (isMobile) {
      setOpen(false)
    } else {
      setOpen(true)
    }
  }, [isMobile])

  return (
    <Box
      sx={(theme: Theme) => ({
        height: "100vh",
        display: "flex",
        backgroundColor: theme.palette.background.default,
      })}
    >
      <DrawerContent
        open={open}
        isMobile={isMobile}
        triggerDrawer={triggerDrawer}
      />
      <Main open={open || isMobile}>{children}</Main>
      {isMobile && (
        <Box
          sx={(theme: Theme) => ({
            right: theme.spacing(2),
            bottom: theme.spacing(2),
            position: "absolute",
          })}
        >
          <Fab color="primary" onClick={triggerDrawer} size="medium">
            <Menu />
          </Fab>
        </Box>
      )}
    </Box>
  )
}
