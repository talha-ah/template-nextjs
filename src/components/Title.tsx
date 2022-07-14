import Typography from "@mui/material/Typography"

export const Title = ({
  sx = {},
  children,
}: {
  sx?: any
  children: React.ReactNode
}) => {
  return (
    <Typography variant="h2" sx={{ mb: 3, fontWeight: "bold", ...sx }}>
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
    <Typography variant="h5" sx={{ mb: 1, ...sx }}>
      {children}
    </Typography>
  )
}
