import React from "react"
import Head from "next/head"
import type { NextPage } from "next"

import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

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
            Lorem Ipsum
          </Typography>
          <Typography
            component="p"
            align="center"
            color="text.secondary"
            sx={{
              mt: 2,
            }}
          >
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industrys standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </Typography>
        </Box>
      </HeaderLayout>
    </>
  )
}

export default Home
