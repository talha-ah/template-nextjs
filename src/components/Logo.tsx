import * as React from "react"

import { Typography } from "@mui/material"

import { Link } from "@components/Link"
import { APP_NAME } from "@utils/constants"
import { GradientText } from "@components/GradientText"

export const Logo = () => {
  return (
    <Typography to="/" variant="h5" component={Link} color="text.primary">
      <GradientText color="primary">{APP_NAME}</GradientText>
    </Typography>
  )
}
