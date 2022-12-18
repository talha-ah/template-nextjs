import Head from "next/head"
import type { NextPage } from "next"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

import { Box } from "@mui/material"
import { CircularProgress } from "@mui/material"

import { Alert } from "@ui/Alert"
import { useApi } from "@hooks/useApi"
import { ENDPOINTS } from "@utils/constants"
import { HeaderLayout } from "@layouts/Header"
import { RecoverPasswordForm } from "@forms/auth"

const RecoverPasswordRequest: NextPage = () => {
  const API = useApi()
  const router = useRouter()
  const { query } = router

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
      await API({
        uri: `${ENDPOINTS.checkToken}/${query.token}`,
      })
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Recover Password</title>
        <meta name="description" content="Recover Password" />
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
            ) : error ? (
              <Alert type="error" message={error} />
            ) : (
              <RecoverPasswordForm token={query.token as string} />
            )}
          </Box>
        </Box>
      </HeaderLayout>
    </>
  )
}

export default RecoverPasswordRequest
