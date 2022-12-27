import React from "react"

import { Box, Typography } from "@mui/material"

import { NavGroup } from "./NavGroup"
import { NavLink } from "@utils/types"
import { useRouteLinks } from "@hooks/auth"

const Navigation = () => {
  const { navLinks } = useRouteLinks()

  const navGroups = navLinks.map((item: NavLink) => {
    switch (item.type) {
      case "group":
        return <NavGroup key={item.value} item={item} />
      default:
        return (
          <Typography
            variant="h6"
            color="error"
            align="center"
            key={item.value}
          >
            Fix - Navigation Group
          </Typography>
        )
    }
  })

  return <Box sx={{ pt: 1 }}>{navGroups}</Box>
}

export default Navigation
