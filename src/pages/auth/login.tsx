import Head from "next/head"
import { useEffect } from "react"
import type { NextPage } from "next"
import { useRouter } from "next/router"

import Box from "@mui/material/Box"
import Container from "@mui/material/Container"

import { LoginForm } from "@forms/auth"
import { Logo } from "@components/Logo"

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
        <title>Login - Six Wraps</title>
        <meta name="description" content="Login" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container component="main" maxWidth="xs">
        <Box
          sx={{ my: 8, flex: 1, display: "center", justifyContent: "center" }}
        >
          <Logo />
        </Box>
        <LoginForm />
      </Container>
    </>
  )
}

export default Login
