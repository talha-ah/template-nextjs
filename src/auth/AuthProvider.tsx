import { useEffect } from "react"
import { useRouter } from "next/router"

import { useApi } from "@hooks/useApi"
import { ENDPOINTS } from "@utils/constants"
import { useSystemTheme } from "@hooks/useSystemTheme"
import { getBrowserItem } from "@utils/browser-utility"
import { AuthTypes, useAppContext } from "@contexts/index"

export const AuthProvider = ({ children }: { children: any }) => {
  const router = useRouter()

  const { theme } = useSystemTheme()
  const { dispatch } = useAppContext()

  const API = useApi()

  const checkAuth = async () => {
    let route = "/"

    try {
      const token = getBrowserItem()

      if (!token) {
        route = router.asPath

        dispatch({ type: AuthTypes.LOGOUT })
        return
      }

      const response = await API({
        uri: ENDPOINTS.authProfile,
      })

      dispatch({
        type: AuthTypes.LOGIN,
        payload: response?.data,
      })

      if (
        router.asPath.startsWith("/auth/login") ||
        router.asPath.startsWith("/auth/register")
      ) {
        route = "/"
      } else if (router.asPath.startsWith("/auth")) {
        route = router.asPath
      } else {
        route = router.asPath
      }
    } catch (error: any) {
    } finally {
      if (route !== router.asPath) router.replace(route)
      dispatch({
        type: AuthTypes.SET_INITIALIZED,
        payload: { initializing: false },
      })
    }
  }

  useEffect(() => {
    checkAuth()
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    dispatch({ type: AuthTypes.SET_THEME, payload: { theme } })
  }, [theme, dispatch])

  return children
}
