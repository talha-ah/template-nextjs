import * as React from "react"
import { useEffect, useState } from "react"

import { Box, Fab } from "@mui/material"
import { Menu } from "@mui/icons-material"
import { styled, Theme } from "@mui/material/styles"

import { ActionHeader } from "@ui/ActionHeader"
import { useIsMobile } from "@hooks/useIsMobile"
import { DRAWER_WIDTH, APP_BAR_HEIGHT } from "@utils/constants"

import Drawer from "./Content"

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean
}>(({ theme, open }) => ({
  padding: 0,
  width: "100%",
  height: "100%",
  display: "flex",
  overflow: "hidden",
  flexDirection: "column",
  marginLeft: `-${DRAWER_WIDTH}px`,
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}))

const Children = styled("div")(({ theme }) => ({
  overflow: "auto",
  padding: theme.spacing(2),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  /* width */
  "&::-webkit-scrollbar": {
    width: 5,
    backgroundColor: "transparent",
  },
  /* Track */
  "&::-webkit-scrollbar-track": {
    backgroundColor: "transparent",
  },
  /* Thumb */
  "&::-webkit-scrollbar-thumb": {
    borderRadius: 8,
    backgroundColor: "#babac0",
  },
  /* Thumb:hover */
  "&::-webkit-scrollbar-thumb:hover": {
    backgroundColor: "#babac0",
  },
  /* Button (top and bottom of the scrollbar) */
  "&::-webkit-scrollbar-button": {
    display: "none",
  },
}))

export const DrawerLayout = ({
  title,
  actions,
  children,
  withBackButton,
}: {
  title?: string
  withBackButton?: boolean
  actions?: React.ReactNode
  children: React.ReactNode
}) => {
  const { isMobile } = useIsMobile()

  const [open, setOpen] = useState(true)

  const triggerDrawer = () => setOpen((s) => !s)

  useEffect(() => {
    if (isMobile) setOpen(false)
    else setOpen(true)
  }, [isMobile])

  return (
    <Box
      sx={(theme: Theme) => ({
        width: "100vw",
        height: "100vh",
        display: "flex",
        overflow: "hidden",
        backgroundColor: theme.palette.background.default,
      })}
    >
      {/* Web Page Side Navigation */}
      <Drawer open={open} isMobile={isMobile} triggerDrawer={triggerDrawer} />

      {/* Web Page Content */}
      <Main open={open || isMobile}>
        {/* Page Header */}
        {title && (
          <Box sx={{ px: 2 }}>
            <ActionHeader title={title} withBackButton={withBackButton}>
              {actions}
            </ActionHeader>
          </Box>
        )}

        {/* Page Content */}
        <Children
          sx={{
            width: "100%",
            height: `calc(100% - ${APP_BAR_HEIGHT}px)`,
          }}
        >
          {children}
        </Children>
      </Main>

      {/* Fab Button For Mobile View */}
      {isMobile && (
        <Box
          sx={(theme: Theme) => ({
            position: "fixed",
            bottom: theme.spacing(2),
            right: theme.spacing(2.6),
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
