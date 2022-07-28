import React from "react"
import { useRouter } from "next/router"

import Box from "@mui/material/Box"
import Menu from "@mui/material/Menu"
import { Theme } from "@mui/material"
import MenuItem from "@mui/material/MenuItem"
import Logout from "@mui/icons-material/Logout"
import IconButton from "@mui/material/IconButton"
import Settings from "@mui/icons-material/Settings"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import AccountCircle from "@mui/icons-material/AccountCircle"
import AnalyticsOutlinedIcon from "@mui/icons-material/AnalyticsOutlined"

import { drawerWidth } from "@utils/constants"
import { useAppContext, AuthTypes } from "@contexts/index"

type userMenuItem = {
  href?: string
  label: string
  color?: string
  icon?: React.ReactElement
  onClick?: () => void
}

export const UserMenu = ({
  position = "bottom",
}: {
  position?: "bottom" | "top"
}) => {
  const router = useRouter()
  const { dispatch } = useAppContext()

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  )

  const openUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const closeUserMenu = () => setAnchorElUser(null)

  const userMenu = [
    {
      href: "/app",
      label: "Dashboard",
      icon: <AnalyticsOutlinedIcon fontSize="small" />,
    },
    {
      type: "item",
      label: "Settings",
      href: "/app/settings",
      icon: <Settings fontSize="small" />,
    },
    {
      color: "red",
      label: "Logout",
      icon: <Logout fontSize="small" />,
      onClick: () => {
        dispatch({ type: AuthTypes.LOGOUT })
        router.push("/")
      },
    },
  ]

  return (
    <Box>
      <IconButton onClick={openUserMenu}>
        <AccountCircle sx={{ fontSize: 32 }} />
      </IconButton>
      <Menu
        keepMounted
        id="user-menu"
        anchorEl={anchorElUser}
        onClose={closeUserMenu}
        open={Boolean(anchorElUser)}
        anchorOrigin={
          position === "top"
            ? { vertical: "top", horizontal: "center" }
            : {
                vertical: "bottom",
                horizontal: "right",
              }
        }
        transformOrigin={
          position === "top"
            ? { vertical: "bottom", horizontal: "center" }
            : {
                vertical: "top",
                horizontal: "right",
              }
        }
        sx={(theme: Theme) => ({
          "& .MuiMenu-paper": {
            py: 0,
            px: 1,
            boxShadow: 3,
            mt: position === "top" ? -1 : 1,
            width: drawerWidth - +theme.spacing(4).replace("px", ""),
          },
        })}
      >
        {userMenu.map((item: userMenuItem) => (
          <MenuItem
            key={item.label}
            onClick={() => {
              if (item.onClick) {
                item.onClick()
              }
              if (item.href) {
                router.push(item.href)
              }
              closeUserMenu()
            }}
          >
            {item.icon && (
              <ListItemIcon color={item.color}>{item.icon}</ListItemIcon>
            )}

            <ListItemText primary={item.label} disableTypography />
          </MenuItem>
        ))}
      </Menu>
    </Box>
  )
}
