import Head from "next/head"
import Link from "next/link"
import type { NextPage } from "next"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import CircularProgress from "@mui/material/CircularProgress"

import { useApi } from "@hooks/useApi"
import { Logo } from "@components/Logo"
import { endpoints } from "@utils/constants"

const VerifyEmail: NextPage = () => {
  const [api] = useApi()
  const router = useRouter()
  const { query } = router

  const [verified, setVerified] = useState(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    router.prefetch("/auth/login")
    router.prefetch("/app")
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    checkToken()

    // eslint-disable-next-line
  }, [query])

  const checkToken = async () => {
    try {
      if (query.token) {
        await api({
          method: "PUT",
          uri: `${endpoints.verifyEmail}/${query.token}`,
        })
        setVerified(true)
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
        <title>Verify Email</title>
        <meta name="description" content="Verify Email" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container component="main" maxWidth="xs">
        <Box
          sx={{ my: 8, flex: 1, display: "center", justifyContent: "center" }}
        >
          <Logo />
        </Box>

        <Box style={{ height: "100%" }}>
          {loading ? (
            <CircularProgress />
          ) : verified ? (
            <>
              <Typography>Email Verified Successfully</Typography>
              <Link href="/auth/login" passHref>
                <Button component="a">Login</Button>
              </Link>
            </>
          ) : (
            <Typography color={"red"}>Email not verified {error}</Typography>
          )}
        </Box>
      </Container>
    </>
  )
}

export default VerifyEmail
