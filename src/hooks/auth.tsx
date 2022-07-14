import { useRouter } from "next/router"
import { useEffect, useState } from "react"

import { useApi } from "@hooks/useApi"
import { endpoints } from "@utils/constants"
import { getBrowserItem } from "@utils/browser-utility"
import { AuthTypes, useAppContext } from "@contexts/index"

const menu = [
  {
    label: "Account",
    children: [
      {
        href: "/app",
        icon: "Apps",
        label: "Apps",
      },
      {
        icon: "Settings",
        label: "Settings",
        href: "/app/settings",
      },
    ],
  },
  {
    label: "Application",
    children: [
      {
        color: "red",
        icon: "Logout",
        label: "Logout",
        onClick: () => {
          console.log("Logout")
        },
      },
    ],
  },
]

const inventory: any[] = [
  {
    exact: true,
    color: "red",
    icon: "Activity",
    label: "Dashboard",
    href: "/app/inventory",
  },
  {
    color: "pink",
    icon: "Users",
    label: "Customers",
    href: "/app/inventory/customers",
  },
  {
    color: "grape",
    label: "Categories",
    icon: "LayoutCards",
    href: "/app/inventory/categories",
  },
  {
    icon: "Apps",
    label: "Items",
    color: "violet",
    href: "/app/inventory/items",
  },
  {
    color: "indigo",
    label: "Suppliers",
    icon: "BuildingWarehouse",
    href: "/app/inventory/suppliers",
  },
  {
    color: "indigo",
    label: "Warehouses",
    icon: "BuildingWarehouse",
    href: "/app/inventory/warehouses",
  },
  {
    color: "blue",
    label: "Quotations",
    icon: "FileInvoice",
    initiallyOpened: true,
    href: "/app/inventory/quotations",
    actions: [
      {
        icon: "Plus",
        color: "green",
        href: "/app/inventory/quotations/create",
      },
    ],
  },
  {
    color: "cyan",
    label: "Orders",
    icon: "Receipt",
    initiallyOpened: true,
    href: "/app/inventory/orders",
    actions: [
      {
        icon: "Plus",
        color: "green",
        href: "/app/inventory/orders/create",
      },
    ],
  },
  {
    color: "green",
    label: "Purchase Orders",
    icon: "Adjustments",
    initiallyOpened: true,
    href: "/app/inventory/purchase-orders",
    actions: [
      {
        icon: "Plus",
        color: "green",
        href: "/app/inventory/purchase-orders/create",
      },
    ],
  },
]

export const useRouteLinks = () => {
  const router = useRouter()

  const [links, setLinks] = useState<any[]>([])

  useEffect(() => {
    let app = router.asPath.split("/app/")[1]

    if (router.asPath.split("/app/")[1]) {
      app = app.split("/")[0]
    }

    if (app === "inventory") {
      setLinks(inventory)
    }
    // eslint-disable-next-line
  }, [router.asPath])

  return { menu, links }
}

export const AuthWrapper = ({ children }: { children: any }) => {
  const router = useRouter()
  const { dispatch } = useAppContext()

  const [api] = useApi()

  const checkAuth = async () => {
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

    if (response) {
      dispatch({
        type: AuthTypes.LOGIN,
        payload: { token, user: response.data },
      })

      // Fetch Metadata
      // fetchMetadata()

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
    }
  }

  useEffect(() => {
    checkAuth()
    // eslint-disable-next-line
  }, [])

  return children
}

export const useLogout = () => {
  const router = useRouter()
  const { dispatch } = useAppContext()

  const doLogout = async () => {
    dispatch({ type: AuthTypes.LOGOUT })
    router.push("/")
  }

  return { doLogout }
}
