import Head from "next/head"
import type { NextPage } from "next"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

import Box from "@mui/material/Box"
import CircularProgress from "@mui/material/CircularProgress"

import { Link } from "@ui/Link"
import { Alert } from "@ui/Alert"
import { useApi } from "@hooks/useApi"
import { ENDPOINTS } from "@utils/constants"
import { AcceptInviteForm } from "@forms/auth"
import { HeaderLayout } from "@layouts/Header"
import { useAppContext } from "@contexts/index"

let requested = false
const AcceptInvite: NextPage = () => {
  const API = useApi()
  const router = useRouter()
  const { query } = router
  const { state } = useAppContext()

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
    if (query.token) {
      if (!requested) {
        checkToken()
        requested = true
      }
    }

    // eslint-disable-next-line
  }, [query])

  const checkToken = async () => {
    try {
      const response = await API({
        uri: `${ENDPOINTS.checkInvite}/${query.token}`,
      })

      setUser(response?.data)
      if (response?.data.userExists) {
        setAccepted(true)
      }
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Accept Invite</title>
        <meta name="description" content="Accept Invite" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HeaderLayout>
        <Box
          sx={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Box
            style={{
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
                message="Invitation accepted successfully. You can sign in now"
              />
            ) : error ? (
              <Alert type="error" message={error} />
            ) : (
              <AcceptInviteForm
                name={user?.firstName}
                token={query.token as string}
              />
            )}
          </Box>
          <Box sx={{ mt: 2 }}>
            {state.auth.isAuth ? (
              <Link to="/app">Dashboard</Link>
            ) : (
              <Link to="/auth/login">Sign in</Link>
            )}
          </Box>
        </Box>
      </HeaderLayout>
    </>
  )
}

export default AcceptInvite
