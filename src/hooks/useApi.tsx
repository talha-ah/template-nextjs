import { useRouter } from "next/router"

import { useSnackbar } from "notistack"
import { useLayoutEffect, useEffect, useRef } from "react"

import { dateUtility } from "@utils/date"
import { BASE_URL } from "@utils/constants"
import { getBrowserItem } from "@utils/browser-utility"
import { useAppContext, AuthTypes } from "@contexts/index"
import { ApiResponse, Params, ErrorWithMessage } from "@utils/types"

const useBrowserLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect

function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as Record<string, unknown>).message === "string"
  )
}

export const useApi = () => {
  const router = useRouter()
  const { dispatch } = useAppContext()
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

  const API = async <T = ApiResponse,>({
    uri,
    body,
    message,
    method = "GET",
    notifyError = true,
    contentType = "application/json",
  }: Params): Promise<T> => {
    return new Promise(async (resolve, reject) => {
      try {
        const headers = new Headers()
        if (contentType) headers.append("Content-Type", contentType)

        const token = getBrowserItem()
        if (token) headers.append("Authorization", `Bearer ${token}`)

        const response = await fetch(BASE_URL + uri, {
          body: body,
          method: method,
          headers: headers,
          signal: controller?.signal,
        })

        if (!response.ok) {
          throw await response.json()
        }

        const data = await response.json()

        if (process && process.env.NODE_ENV === "development") {
          console.log(`[Response at ${dateUtility.getLocaleDate()}]:`, data)
        }

        if (message) {
          enqueueSnackbar(message, {
            variant: "success",
            autoHideDuration: 3000,
          })
        }

        if (isMounted.current) resolve(data)
      } catch (error: any) {
        let message = error.message
        let status = error.status || 500

        if (!isErrorWithMessage(error)) {
          error = await error.json()

          status = error.status
          message = error.detail
        }

        if (process && process.env.NODE_ENV === "development") {
          console.log(`[Error at ${dateUtility.getLocaleDate()}]:`, error)
          body && console.log(`Error for Body`, JSON.parse(body))
        }

        // if (error.status === 403) {
        //   // 401 : Token expired / invalid
        //   // Ask to relogin
        //   dispatch({ type: AuthTypes.LOGOUT })
        //   router.replace("/")

        //   // TODO: Use refresh token to get new token
        // } else
        if (
          notifyError &&
          error.status &&
          error.message !== "The user aborted a request."
        ) {
          if (error.message === "Failed to fetch") {
            error.message = "Network Error"
          }

          enqueueSnackbar(error?.message, {
            variant: "error",
            autoHideDuration: 3000,
          })
        }

        if (isMounted.current) reject(error)
      }
    })
  }

  return API
}
