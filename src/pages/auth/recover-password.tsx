import Head from "next/head"
import { useEffect } from "react"
import type { NextPage } from "next"
import { useRouter } from "next/router"

import Container from "@mui/material/Container"

import { ForgotPasswordForm } from "@forms/auth"

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
        <title>Recover Password</title>
        <meta name="description" content="Recover Password" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container component="main" maxWidth="xs">
        <ForgotPasswordForm />
      </Container>
    </>
  )
}

export default Login
