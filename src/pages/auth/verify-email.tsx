import Head from "next/head"
import type { NextPage } from "next"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

import { Box } from "@mui/material"
import { CircularProgress } from "@mui/material"

import { Link } from "@ui/Link"
import { Alert } from "@ui/Alert"
import { useApi } from "@hooks/useApi"
import { ENDPOINTS } from "@utils/constants"
import { HeaderLayout } from "@layouts/Header"
import { useAppContext } from "@contexts/index"

let requested = false
const VerifyEmail: NextPage = () => {
  const API = useApi()
  const router = useRouter()
  const { query } = router
  const { state } = useAppContext()

  const [verified, setVerified] = useState(false)
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
      await API({
        method: "PUT",
        notifyError: false,
        uri: `${ENDPOINTS.verifyEmail}/${query.token}`,
      })

      setVerified(true)
      setLoading(false)
    } catch (error: any) {
      setError(error.message)
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Verify Email</title>
        <meta name="description" content="Verify Email" />
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
            ) : verified ? (
              <Alert
                type="success"
                message={"Email verified successfully. You can sign in now"}
              />
            ) : (
              <Alert type="error" message={error} />
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

export default VerifyEmail
