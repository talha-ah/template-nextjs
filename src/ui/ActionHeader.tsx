import * as React from "react"

import { Box } from "@mui/material"
import { Theme } from "@mui/material/styles"

import { Title } from "@ui/Title"
import { BackButton } from "@ui/BackButton"
import { APP_BAR_HEIGHT } from "@utils/constants"

export const ActionHeader = ({
  sx,
  title,
  children,
  withBackButton,
}: {
  sx?: any
  title: string
  withBackButton?: boolean
  children?: React.ReactNode
}) => {
  return (
    <Box
      sx={(theme: Theme) => ({
        py: 2,
        gap: 1,
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        height: `${APP_BAR_HEIGHT}px`,
        justifyContent: "space-between",
        borderBottom: `1px solid ${theme.palette.divider}`,
        ...sx,
      })}
    >
      <Box
        sx={{
          gap: 1,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        {withBackButton && <BackButton />}
        <Title>{title}</Title>
      </Box>

      {children}
    </Box>
  )
}
