import Head from "next/head"
import { useEffect } from "react"
import type { NextPage } from "next"
import { useRouter } from "next/router"

import Box from "@mui/material/Box"

import { Registerform } from "@forms/auth"
import { HeaderLayout } from "@layouts/Header"

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

      <HeaderLayout>
        <Box
          sx={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Registerform />
        </Box>
      </HeaderLayout>
    </>
  )
}

export default Register
