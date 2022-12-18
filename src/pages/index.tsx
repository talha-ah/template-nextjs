import React from "react"
import Head from "next/head"
import type { NextPage } from "next"

import { Box } from "@mui/material"
import { Typography } from "@mui/material"

import { APP_NAME } from "@utils/constants"
import { HeaderLayout } from "@layouts/Header"

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>{APP_NAME}</title>
        <meta name="description" content={APP_NAME} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HeaderLayout>
        <Box
          sx={{
            pt: 4,
          }}
        >
          <Typography align="center" variant="h4">
            {APP_NAME}
          </Typography>
          <Typography
            component="p"
            align="center"
            color="text.secondary"
            sx={{
              mt: 2,
            }}
          >
            A Next.js starter template with Material-UI and TypeScript.
          </Typography>
        </Box>
      </HeaderLayout>
    </>
  )
}

export default Home
