import * as React from "react"

import { Toolbar } from "@mui/material"
import { styled } from "@mui/material/styles"
import MenuIcon from "@mui/icons-material/Menu"
import IconButton from "@mui/material/IconButton"
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar"

import { drawerWidth } from "@utils/config"

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: `${drawerWidth}px`,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

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
    <AppBar
      elevation={0}
      color="inherit"
      position="fixed"
      variant="outlined"
      open={open && !isMobile}
    >
      <Toolbar
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <IconButton onClick={triggerDrawer} aria-label="open drawer">
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}
