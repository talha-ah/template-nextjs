import Head from "next/head"
import { useEffect } from "react"
import type { NextPage } from "next"
import { useRouter } from "next/router"

import Box from "@mui/material/Box"

import { HeaderLayout } from "@layouts/Header"
import { ForgotPasswordForm } from "@forms/auth"

const RecoverPasswordRequest: NextPage = () => {
  const router = useRouter()

  useEffect(() => {
    router.prefetch("/auth/login")
    router.prefetch("/app")
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <Head>
        <title>Forgot Password</title>
        <meta name="description" content="Forgot Password" />
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
          <ForgotPasswordForm />
        </Box>
      </HeaderLayout>
    </>
  )
}

export default RecoverPasswordRequest
