import Head from "next/head"
import type { NextPage } from "next"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import CircularProgress from "@mui/material/CircularProgress"

import Link from "@components/Link"
import { useApi } from "@hooks/useApi"
import { Alert } from "@components/Alert"
import { ENDPOINTS } from "@utils/constants"
import { HeaderLayout } from "@layouts/Header"

const VerifyEmail: NextPage = () => {
  const [api] = useApi()
  const router = useRouter()
  const { query } = router

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
      checkToken()
    }

    // eslint-disable-next-line
  }, [query])

  const checkToken = async () => {
    try {
      await api({
        method: "PUT",
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
            justifyContent: "center",
          }}
        >
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
            ) : verified ? (
              <Typography>
                Email Verified Successfully. You can login now
              </Typography>
            ) : (
              <Alert type="error" message={error} />
            )}
          </Box>
          <Box
            sx={{ mt: 2, flex: 1, display: "flex", justifyContent: "flex-end" }}
          >
            <Link href="/auth/login">{"Already have an account? Sign in"}</Link>
          </Box>
        </Box>
      </HeaderLayout>
    </>
  )
}

export default VerifyEmail
