import * as React from "react"

import { Typography } from "@mui/material"

import { Link } from "@ui/Link"
import { APP_NAME } from "@utils/constants"
import { GradientText } from "@ui/GradientText"

export const Logo = ({ variant }: { variant?: "text" }) => {
  if (variant === "text") {
    return (
      <Typography variant="h5" color="text.primary">
        {APP_NAME}
      </Typography>
    )
  }

  return (
    <Typography to="/" variant="h5" component={Link} color="text.primary">
      <GradientText color="primary">{APP_NAME}</GradientText>
    </Typography>
  )
}
