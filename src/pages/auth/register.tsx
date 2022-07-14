import Head from "next/head"
import { useEffect } from "react"
import type { NextPage } from "next"
import { useRouter } from "next/router"

import Container from "@mui/material/Container"

import { Registerform } from "@forms/auth"

const Register: NextPage = () => {
  const router = useRouter()

  useEffect(() => {
    router.prefetch("/auth/login")
    router.prefetch("/app")
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <Head>
        <title>Register</title>
        <meta name="description" content="Register" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container component="main" maxWidth="xs">
        <Registerform />
      </Container>
    </>
  )
}

export default Register
