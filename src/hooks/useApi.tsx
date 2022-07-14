// import { useRouter } from "next/router"

import { useSnackbar } from "notistack"
import { useLayoutEffect, useEffect, useRef } from "react"

import DateUtility from "@utils/date"
import { baseURL } from "@utils/config"
import { Response, T } from "@utils/types"
// import { useAppContext } from "@contexts/index"
import { getBrowserItem } from "@utils/browser-utility"

const useBrowserLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect

export const useApi = () => {
  // const router = useRouter()
  // const { dispatch } = useAppContext()
  const { enqueueSnackbar } = useSnackbar()

  let controller: any = null

  const isMounted = useRef(false)
  useBrowserLayoutEffect((): (() => void) => {
    controller = new AbortController()

    isMounted.current = true
    return (): void => {
      isMounted.current = false
      controller.abort()
    }
  }, [])

  const api = async ({
    uri,
    body,
    headers,
    message,
    method = "GET",
  }: {
    body?: any
    uri: string
    headers?: any
    method?: string
    message?: string
  }): Promise<T | undefined> => {
    try {
      const myHeaders = new Headers()
      myHeaders.append("Content-Type", "application/json")

      const token = getBrowserItem()
      if (token) {
        myHeaders.append("Authorization", `Bearer ${token}`)
      }

      const response = await fetch(baseURL + uri, {
        body,
        method,
        signal: controller?.signal,
        headers: headers || myHeaders,
      })

      if (!response.ok) throw response

      const data: Response = await response.json()

      if (process && process.env.NODE_ENV === "development") {
        console.log(`[Response at ${DateUtility.getLocaleDate()}]:`, data)
      }

      if (message) {
        enqueueSnackbar(message, {
          variant: "success",
          autoHideDuration: 3000,
        })
      }

      if (isMounted.current) {
        // can be used to set local state if needed
        return data
      }
    } catch (err: any) {
      // need to assign to a variable to prevent error when we do error.json() below
      let error = err

      if (process && process.env.NODE_ENV === "development") {
        console.log(`[Error at ${DateUtility.getLocaleDate()}]:`, error)
        body && console.log(`Error for Body`, JSON.parse(body))
      }

      if (error.status === 401) {
        // 401 : Token expired / invalid
        // TODO: Handle 401 error
        console.log("token expired")
        // dispatch({ type: AuthTypes.LOGOUT })
        // router.push("/")
      } else if (error.status) {
        error = await error.json()

        enqueueSnackbar(error?.message, {
          variant: "error",
          autoHideDuration: 3000,
        })

        throw error
      }
    } finally {
      controller && controller.abort()
    }
  }

  return [api]
}
