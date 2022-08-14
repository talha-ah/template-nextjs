import Head from "next/head"
import { useEffect } from "react"
import type { NextPage } from "next"
import { useRouter } from "next/router"

import Box from "@mui/material/Box"

import { HeaderLayout } from "@layouts/Header"
import { RecoverPasswordRequestForm } from "@forms/auth"

const RecoverPasswordRequest: NextPage = () => {
  const router = useRouter()

  useEffect(() => {
    router.prefetch("/auth/register")
    router.prefetch("/app")
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <Head>
        <title>Recover Password</title>
        <meta name="description" content="Recover Password" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HeaderLayout>
        <Box
          sx={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <RecoverPasswordRequestForm />
        </Box>
      </HeaderLayout>
    </>
  )
}

export default RecoverPasswordRequest
