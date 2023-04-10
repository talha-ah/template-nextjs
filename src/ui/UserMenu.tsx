import React from "react"
import { useRouter } from "next/router"

import { Avatar } from "@mui/material"

import { Menu } from "@ui/Menu"
import { MenuLink } from "@utils/types"
import { useRouteLinks } from "@hooks/auth"
import { IconButton } from "@ui/IconButton"
import { getInitials } from "@utils/common"
import { useAppContext } from "@contexts/index"

export const UserMenu = ({
  position = "bottom",
}: {
  position?: "bottom" | "top"
}) => {
  const router = useRouter()
  const { state } = useAppContext()
  const { menuLinks } = useRouteLinks()

  return (
    <Menu
      position={position}
      onClick={(option) => {
        if (option.onClick) option.onClick()
        if (option.href) router.push(option.href)
      }}
      options={menuLinks.map((item: MenuLink) => ({
        key: item.value,
        ...item,
      }))}
      trigger={({ toggleOpen, ref }) => (
        <IconButton
          ref={ref}
          size="small"
          tooltip="User menu"
          onClick={toggleOpen}
          aria-label="User menu"
        >
          <Avatar
            sx={(theme) => ({
              width: 32,
              height: 32,
              fontSize: 16,
              bgcolor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
            })}
          >
            {getInitials(state.auth.user)}
          </Avatar>
        </IconButton>
      )}
    />
  )
}
