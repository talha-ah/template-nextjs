import * as React from "react"

import Box from "@mui/material/Box"
import Drawer from "@mui/material/Drawer"
import { Theme } from "@mui/material/styles"

import { drawerWidth } from "@utils/constants"

import Header from "./Header"
import Navigation from "./Navigation"
import { UserMenu } from "@components/UserMenu"

export default function DrawerLayout({
  open,
  isMobile,
  triggerDrawer,
}: {
  open: boolean
  isMobile: boolean
  triggerDrawer: () => void
}) {
  return (
    <Drawer
      open={open}
      anchor="left"
      onClose={triggerDrawer}
      variant={isMobile ? "temporary" : "persistent"}
      sx={(theme: Theme) => ({
        flexShrink: 0,
        width: drawerWidth,
        "& .MuiDrawer-paper": {
          px: 2,
          display: "flex",
          width: drawerWidth,
          flexDirection: "column",
          boxSizing: "border-box",
          backgroundColor: theme.palette.background.default,
        },
      })}
    >
      <Header />

      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Navigation />

        <Box
          sx={(theme: Theme) => ({
            width: "100%",
            height: "64px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderTop: `1px solid ${theme.palette.divider}`,
          })}
        >
          <UserMenu position="top" />
        </Box>
      </Box>
    </Drawer>
  )
}
