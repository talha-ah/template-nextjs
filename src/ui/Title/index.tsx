import { Typography } from "@mui/material"

import { useIsMobile } from "@hooks/useIsMobile"

export const Title = ({
  sx = {},
  children,
  ...rest
}: {
  sx?: any
  children: React.ReactNode
  [key: string]: any
}) => {
  const { isMobile } = useIsMobile()

  return (
    <Typography sx={sx} variant={isMobile ? "body1" : "h5"} {...rest}>
      {children}
    </Typography>
  )
}

export const Heading = ({
  sx = {},
  children,
}: {
  sx?: any
  children: React.ReactNode
}) => {
  return (
    <Typography variant="subtitle2" sx={{ ...sx }}>
      {children}
    </Typography>
  )
}
