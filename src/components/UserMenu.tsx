import React from "react"
import { useRouter } from "next/router"

import { Box } from "@mui/material"
import { Menu } from "@mui/material"
import { Theme } from "@mui/material"
import { MenuItem } from "@mui/material"
import { IconButton } from "@mui/material"
import { ListItemIcon } from "@mui/material"
import { ListItemText } from "@mui/material"
import { AccountCircle } from "@mui/icons-material"

import { MenuLink } from "@utils/types"
import { useRouteLinks } from "@hooks/auth"
import { DRAWER_WIDTH } from "@utils/constants"

export const UserMenu = ({
  position = "bottom",
}: {
  position?: "bottom" | "top"
}) => {
  const router = useRouter()
  const { menuLinks } = useRouteLinks()

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  )

  const openUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const closeUserMenu = () => setAnchorElUser(null)

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
            mt: position === "top" ? -1 : 1,
            width: DRAWER_WIDTH - +theme.spacing(4).replace("px", ""),
          },
        })}
      >
        {menuLinks.map((item: MenuLink) => (
          <MenuItem
            key={item.label}
            onClick={() => {
              if (item.onClick) item.onClick()

              if (item.href) {
                router.push(item.href)
              }
              closeUserMenu()
            }}
          >
            {item.icon && (
              <ListItemIcon color={item?.color}>{item.icon}</ListItemIcon>
            )}

            <ListItemText primary={item.label} disableTypography />
          </MenuItem>
        ))}
      </Menu>
    </Box>
  )
}
