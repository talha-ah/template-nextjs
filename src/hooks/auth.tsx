import { useRouter } from "next/router"
import { useEffect, useState, useMemo } from "react"

import { Person } from "@mui/icons-material"
import { Logout } from "@mui/icons-material"
import { HomeOutlined } from "@mui/icons-material"
import { AnalyticsOutlined } from "@mui/icons-material"

import { useApi } from "@hooks/useApi"
import { ENDPOINTS } from "@utils/constants"
import { checkPermission } from "@utils/common"
import { setOrgMetadata } from "@utils/browser-utility"
import { getBrowserItem } from "@utils/browser-utility"
import { AuthTypes, useAppContext } from "@contexts/index"
import { NavLink, MenuLink, Metadata } from "@utils/types"

export const useRouteLinks = () => {
  const router = useRouter()
  const { state, dispatch } = useAppContext()

  const [navLinks, setNavLinks] = useState<NavLink[]>([])
  const [menuLinks, setMenuLinks] = useState<MenuLink[]>([])

  const NavLinks: NavLink[] = useMemo(
    () => [
      {
        type: "group",
        label: "App",
        children: [
          {
            type: "item",
            label: "Dashboard",
            href: "/app/dashboard",
            icon: <AnalyticsOutlined fontSize="small" color="primary" />,
            exact: true,
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
        label: "Home",
        icon: <HomeOutlined fontSize="small" />,
      },
      {
        type: "item",
        label: "Profile",
        href: "/profile",
        icon: <Person fontSize="small" />,
      },
      {
        type: "item",
        color: "error",
        label: "Logout",
        icon: <Logout fontSize="small" />,
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
            checkPermission(permissions, child.label)
          )

          if (children.length > 0) {
            links.push({ ...link, children })
          }
        } else if (link.type === "item") {
          if (checkPermission(permissions, link.label)) {
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
  const { fetchMetadata } = useFetchMetadata()

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
        payload: { token, user: response?.data?.user },
      })

      // Fetch Metadata
      fetchMetadata()

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

export const useFetchMetadata = () => {
  const API = useApi()

  const [metadata, setMetadata] = useState<Metadata | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  const fetchMetadata = async () => {
    try {
      setLoading(true)

      const response = await API({
        uri: `${ENDPOINTS.organizationMetadata}?filter=`,
      })

      setMetadata(response?.data)

      setOrgMetadata(response?.data)
    } catch (error) {
    } finally {
      setLoading(true)
    }
  }

  return { loading, metadata, fetchMetadata }
}
