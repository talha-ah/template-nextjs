import { useRouter } from "next/router"
import { useEffect, useState } from "react"

import AnalyticsOutlinedIcon from "@mui/icons-material/AnalyticsOutlined"
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined"
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined"
import FilterCenterFocusOutlinedIcon from "@mui/icons-material/FilterCenterFocusOutlined"
import MiscellaneousServicesOutlinedIcon from "@mui/icons-material/MiscellaneousServicesOutlined"

import { useApi } from "@hooks/useApi"
import { endpoints } from "@utils/constants"
import { NavLink, Metadata } from "@utils/types"
import { getBrowserItem } from "@utils/browser-utility"
import { setOrgMetadata } from "@utils/browser-utility"
import { AuthTypes, useAppContext } from "@contexts/index"

export const NavLinks: NavLink[] = [
  {
    type: "group",
    label: "App",
    children: [
      {
        type: "item",
        label: "Dashboard",
        href: "/app",
        icon: <AnalyticsOutlinedIcon fontSize="small" />,
        exact: true,
      },
      {
        type: "item",
        label: "Users",
        href: "/app/users",
        icon: <PeopleAltOutlinedIcon fontSize="small" />,
      },
      {
        type: "item",
        label: "Customers",
        href: "/app/customers",
        icon: <FilterCenterFocusOutlinedIcon fontSize="small" />,
      },
      {
        type: "item",
        label: "Services",
        href: "/app/services",
        icon: <MiscellaneousServicesOutlinedIcon fontSize="small" />,
      },
      {
        type: "item",
        label: "Jobs",
        href: "/app/jobs",
        icon: <WorkOutlineOutlinedIcon fontSize="small" />,
      },
    ],
  },
]

export const useRouteLinks = () => {
  const router = useRouter()

  useEffect(() => {
    let app = router.asPath.split("/app/")[1]

    if (router.asPath.split("/app/")[1]) {
      app = app.split("/")[0]
    }

    // eslint-disable-next-line
  }, [router.asPath])

  return [NavLinks]
}

export const AuthWrapper = ({ children }: { children: any }) => {
  const router = useRouter()
  const { dispatch } = useAppContext()
  const { fetchMetadata } = useFetchMetadata()

  const [api] = useApi()

  const checkAuth = async () => {
    try {
      let route = "/"

      const token = getBrowserItem()

      if (!token) {
        if (router.asPath.startsWith("/app")) route = "/"
        else route = router.asPath

        dispatch({ type: AuthTypes.LOGOUT })
        router.replace(route)
        return
      }

      const response = await api({
        uri: endpoints.profile,
      })

      dispatch({
        type: AuthTypes.LOGIN,
        payload: { token, user: response?.data },
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
        route = "/"
      }

      router.prefetch(route)
      router.replace(route)
    } catch (error: any) {}
  }

  useEffect(() => {
    checkAuth()
    // eslint-disable-next-line
  }, [])

  return children
}

export const useFetchMetadata = () => {
  const [api] = useApi()

  const [metadata, setMetadata] = useState<Metadata | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  const fetchMetadata = async () => {
    try {
      setLoading(true)

      const response = await api({
        uri: `${endpoints.organizationMetadata}?filter=legalMessages,statuses,statusTexts`,
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
