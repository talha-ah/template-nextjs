import React from "react"

import { Box, Typography } from "@mui/material"
import InboxIcon from "@mui/icons-material/MoveToInbox"

import NavGroup from "./NavGroup"
import { NavLink } from "@utils/types"

const NavLinks: NavLink[] = [
  {
    type: "group",
    label: "App",
    children: [
      {
        type: "item",
        label: "Dashboard",
        href: "/app",
        icon: <InboxIcon fontSize="small" />,
        exact: true,
      },
      {
        type: "item",
        label: "Settings",
        href: "/app/settings",
        icon: <InboxIcon fontSize="small" />,
      },
    ],
  },
]

const Navigation = () => {
  const navGroups = NavLinks.map((item: NavLink) => {
    switch (item.type) {
      case "group":
        return <NavGroup key={item.label} item={item} />
      default:
        return (
          <Typography
            variant="h6"
            color="error"
            align="center"
            key={item.label}
          >
            Fix - Navigation Group
          </Typography>
        )
    }
  })

  return <Box sx={{ pt: 1 }}>{navGroups}</Box>
}

export default Navigation
