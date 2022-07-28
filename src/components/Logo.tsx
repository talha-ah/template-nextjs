import * as React from "react"

import Typography from "@mui/material/Typography"

import Link from "@components/Link"

export const Logo = () => {
  return (
    <Typography
      href="/"
      variant="h5"
      component={Link}
      sx={{
        textDecoration: "none",
        color: "text.primary",
        "&:hover": { textDecoration: "none" },
      }}
    >
      Six Wraps
    </Typography>
  )
}
