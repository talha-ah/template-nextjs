import Typography from "@mui/material/Typography"

export const Title = ({
  sx = {},
  children,
  ...rest
}: {
  sx?: any
  children: React.ReactNode
  [key: string]: any
}) => {
  return (
    <Typography variant="h5" sx={{ fontWeight: "bold", ...sx }} {...rest}>
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
