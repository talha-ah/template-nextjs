import Head from "next/head"
import { useEffect } from "react"
import type { NextPage } from "next"
import { useRouter } from "next/router"

import Container from "@mui/material/Container"

import { LoginForm } from "@forms/auth"

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
        <title>Login</title>
        <meta name="description" content="Login" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container component="main" maxWidth="xs">
        <LoginForm />
      </Container>
    </>
  )
}

export default Login
