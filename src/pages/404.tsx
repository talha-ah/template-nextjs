import { Box } from "@mui/material"
import { Button } from "@mui/material"
import { Typography } from "@mui/material"

import { NextLinkComposed } from "@components/Link"

export default function NotFoundTitle() {
  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Typography
        variant="h1"
        style={{ fontWeight: "bold", marginBottom: 24, color: "white" }}
      >
        404
      </Typography>

      <Typography
        variant="subtitle1"
        style={{
          color: "white",
          marginBottom: 24,
          textAlign: "center",
        }}
      >
        Unfortunately, the page you&apos;re looking for couldn&apos;t be found.
      </Typography>

      <Button to="/" variant="contained" component={NextLinkComposed}>
        Home
      </Button>
    </Box>
  )
}
