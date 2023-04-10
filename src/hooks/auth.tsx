import { useRouter } from "next/router"
import { useEffect, useState, useMemo } from "react"

import { Logout, Person } from "@mui/icons-material"
import { Dashboard, HomeOutlined } from "@mui/icons-material"

import { useApi } from "@hooks/useApi"
import { checkPermission } from "@utils/common"
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
            href: "/app",
            value: "Dashboard",
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
        href: "/",
        type: "item",
        value: "Home",
        icon: HomeOutlined,
      },
      {
        type: "item",
        icon: Person,
        value: "Profile",
        href: "/profile",
      },
      {
        type: "item",
        icon: Logout,
        color: "error",
        value: "Logout",
        onClick: () => {
          router.push("/")
          dispatch({ type: AuthTypes.LOGOUT })
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
  }, [router.asPath, state.auth.accessToken])

  return { navLinks, menuLinks }
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
