import React from "react"
import router from "next/router"

import { ArrowBack } from "@mui/icons-material"

import { IconButton } from "@ui/IconButton"

export const BackButton = () => {
  return (
    <IconButton onClick={() => router.back()}>
      <ArrowBack fontSize="inherit" />
    </IconButton>
  )
}
