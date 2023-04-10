import { useRouter } from "next/router"
import { useEffect } from "react"

import { Box } from "@mui/material"
import { CircularProgress } from "@mui/material"

import { Logo } from "@ui/Logo"
import { AuthTypes, useAppContext } from "@contexts/index"

export function AuthGuard({ children }: { children: JSX.Element }) {
  const router = useRouter()

  const { state, dispatch } = useAppContext()
  const { user, initializing } = state.auth

  useEffect(() => {
    if (!initializing) {
      // auth is initialized and there is no user
      if (!user) {
        // remember the page that user tried to access
        dispatch({
          type: AuthTypes.SET_REDIRECT,
          payload: { redirect: router.pathname },
        })
        // redirect
        router.push("/auth/login")
      }
    }

    console.log("AuthGuard", { initializing, user })
  }, [initializing, router, user, dispatch])

  /* show loading indicator while the auth provider is still initializing */
  if (initializing) {
    return (
      <Box
        sx={{
          gap: 4,
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <CircularProgress size={64} />

        <Logo variant="text" />
      </Box>
    )
  }

  // if auth initialized with a valid user show protected page
  if (!initializing && user) {
    return <>{children}</>
  }

  /* otherwise don't return anything, will do a redirect from useEffect */
  return null
}
