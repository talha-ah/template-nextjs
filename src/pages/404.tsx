import Head from "next/head"

import { Box } from "@mui/material"
import { Typography } from "@mui/material"

import { Button } from "@ui/Button"
import { APP_NAME } from "@utils/constants"
import { HeaderLayout } from "@layouts/Header"

export default function NotFoundTitle() {
  return (
    <>
      <Head>
        <title>NOT FOUND - {APP_NAME}</title>
      </Head>

      <HeaderLayout>
        <Box
          sx={{
            height: "100%",
            display: "flex",
            textAlign: "center",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h1"
            style={{ fontWeight: "bold", marginBottom: 24 }}
          >
            404
          </Typography>

          <Typography
            variant="subtitle1"
            style={{
              marginBottom: 24,
              textAlign: "center",
            }}
          >
            Unfortunately, the page you&apos;re looking for couldn&apos;t be
            found.
          </Typography>

          <Button to="/" variant="contained">
            Home
          </Button>
        </Box>
      </HeaderLayout>
    </>
  )
}
