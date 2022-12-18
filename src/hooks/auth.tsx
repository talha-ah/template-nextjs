import { useRouter } from "next/router"
import { useEffect, useState, useMemo } from "react"

import { Logout, Person } from "@mui/icons-material"
import { Dashboard, HomeOutlined } from "@mui/icons-material"

import { useApi } from "@hooks/useApi"
import { ENDPOINTS } from "@utils/constants"
import { checkPermission } from "@utils/common"
import { getBrowserItem } from "@utils/browser-utility"
import { AuthTypes, useAppContext } from "@contexts/index"
import { NavLink, MenuLink, SettingsTypes } from "@utils/types"

export const useRouteLinks = () => {
  const router = useRouter()
  const { state, dispatch } = useAppContext()

  const [navLinks, setNavLinks] = useState<NavLink[]>([])
  const [menuLinks, setMenuLinks] = useState<MenuLink[]>([])

  const NavLinks: NavLink[] = useMemo(
    () => [
      {
        type: "group",
        value: "App",
        children: [
          {
            exact: true,
            type: "item",
            value: "Dashboard",
            href: "/app/template",
            icon: <Dashboard color="action" />,
          },
        ],
      },
    ],
    []
  )

  const MenuLinks: MenuLink[] = useMemo(
    () => [
      {
        type: "item",
        href: "/app",
        value: "Home",
        icon: <HomeOutlined fontSize="small" />,
      },
      {
        type: "item",
        value: "Profile",
        href: "/profile",
        icon: <Person fontSize="small" />,
      },
      {
        type: "item",
        color: "error",
        value: "Logout",
        icon: <Logout fontSize="small" color="error" />,
        onClick: () => {
          dispatch({ type: AuthTypes.LOGOUT })
          router.push("/")
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router, dispatch]
  )

  useEffect(() => {
    if (state.auth.user?.permissions) {
      const permissions = state.auth.user.permissions

      const links: NavLink[] = []

      NavLinks.map((link) => {
        if (link.type === "group") {
          const children = (link.children || []).filter((child) =>
            checkPermission(permissions, child.value)
          )

          if (children.length > 0) {
            links.push({ ...link, children })
          }
        } else if (link.type === "item") {
          if (checkPermission(permissions, link.value)) {
            links.push(link)
          }
        }

        return link
      })

      setNavLinks(links)
    }

    setMenuLinks(MenuLinks)
    // eslint-disable-next-line
  }, [router.asPath, state.auth.token])

  return { navLinks, menuLinks }
}

export const AuthWrapper = ({ children }: { children: any }) => {
  const router = useRouter()
  const { dispatch } = useAppContext()
  const { fetchSettings } = useFetchSettings()

  const API = useApi()

  const checkAuth = async () => {
    let route = "/"

    try {
      const token = getBrowserItem()

      if (!token) {
        if (router.asPath.startsWith("/app")) route = "/"
        else route = router.asPath

        dispatch({ type: AuthTypes.LOGOUT })
        return
      }

      const response = await API({
        uri: ENDPOINTS.authProfile,
      })

      dispatch({
        type: AuthTypes.LOGIN,
        payload: {
          token,
          user: response?.data?.user,
          refreshToken: response?.data?.refresh_token,
        },
      })

      // Fetch Metadata
      fetchSettings("inventory")

      if (router.asPath.startsWith("/app")) {
        route = router.asPath
      } else if (
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
    }
  }

  useEffect(() => {
    checkAuth()
    // eslint-disable-next-line
  }, [])

  return children
}

export const useFetchSettings = () => {
  const API = useApi()

  const { dispatch } = useAppContext()

  const [loading, setLoading] = useState<boolean>(true)

  const fetchSettings = async (type: SettingsTypes) => {
    try {
      setLoading(true)

      // const response = await API({
      //   uri: `${ENDPOINTS.settings}/${type}`,
      // })

      // dispatch({
      //   type: InventoryTypes.UPDATE_INVENTORY_SETTINGS,
      //   payload: response.data,
      // })

      // return response.data
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  return { loading, fetchSettings }
}
