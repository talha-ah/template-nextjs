import Head from "next/head"
import type { NextPage } from "next"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import CircularProgress from "@mui/material/CircularProgress"

import Link from "@components/Link"
import { useApi } from "@hooks/useApi"
import { Logo } from "@components/Logo"
import { Alert } from "@components/Alert"
import { endpoints } from "@utils/constants"
import { AcceptInviteForm } from "@forms/auth"

let requested = false
const AcceptInvite: NextPage = () => {
  const [api] = useApi()
  const router = useRouter()
  const { query } = router

  const [user, setUser] = useState<any>()
  const [accepted, setAccepted] = useState(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    router.prefetch("/auth/login")
    router.prefetch("/app")
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (query.token && !requested) {
      checkToken()
      requested = true
    }

    // eslint-disable-next-line
  }, [query])

  const checkToken = async () => {
    try {
      const response = await api({
        uri: `${endpoints.checkInvite}/${query.token}`,
      })

      setUser(response?.data)
      if (response?.data.userExists) {
        setAccepted(true)
      }
      setLoading(false)
    } catch (error: any) {
      setError(error.message)
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Accept Invite</title>
        <meta name="description" content="Accept Email" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container component="main" maxWidth="xs">
        <Box
          sx={{ my: 8, flex: 1, display: "center", justifyContent: "center" }}
        >
          <Logo />
        </Box>

        <Box
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {loading ? (
            <CircularProgress />
          ) : accepted ? (
            <Alert
              type="success"
              message="Your account has been created. You can now login with your email"
            />
          ) : error ? (
            <Alert type="error" message={error} />
          ) : (
            <AcceptInviteForm
              token={query.token as string}
              name={user?.firstName}
            />
          )}
        </Box>
        <Box
          sx={{ mt: 2, flex: 1, display: "flex", justifyContent: "flex-end" }}
        >
          <Link href="/auth/login">{"Sign in"}</Link>
        </Box>
      </Container>
    </>
  )
}

export default AcceptInvite
