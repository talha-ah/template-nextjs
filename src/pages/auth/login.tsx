import Head from "next/head"
import { useEffect } from "react"
import type { NextPage } from "next"
import { useRouter } from "next/router"

import { Box } from "@mui/material"

import { LoginForm } from "@forms/auth"
import { APP_NAME } from "@utils/constants"
import { HeaderLayout } from "@layouts/Header"

const Login: NextPage = () => {
  const router = useRouter()

  useEffect(() => {
    router.prefetch("/auth/register")
    router.prefetch("/app")
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <Head>
        <title>Login - {APP_NAME}</title>
        <meta name="description" content="Login" />
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
          <LoginForm />
        </Box>
      </HeaderLayout>
    </>
  )
}

export default Login
