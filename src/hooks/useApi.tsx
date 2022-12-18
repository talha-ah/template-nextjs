import { useRouter } from "next/router"
import { useSnackbar } from "notistack"
import { useLayoutEffect, useEffect, useRef } from "react"

import { getLocaleDate } from "@utils/date"
import { getBrowserItem } from "@utils/browser-utility"
import { BASE_URL, ENDPOINTS } from "@utils/constants"
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
          console.log(`[Response at ${getLocaleDate()}]:`, data)
        }

        if (message) {
          enqueueSnackbar(message, {
            variant: "success",
            autoHideDuration: 3000,
          })
        }

        if (isMounted.current) resolve(data)
      } catch (error: any) {
        let errorMessage = error.message
        let errorStatus = error.status || 500

        if (!isErrorWithMessage(error)) {
          error = await error.json()

          errorStatus = error.status
          errorMessage = error.detail
        }

        if (process && process.env.NODE_ENV === "development") {
          console.log(`[Error at ${getLocaleDate()}]:`, error)
          body && console.log(`Error for Body`, JSON.parse(body))
        }

        if (errorStatus === 401) {
          API({
            method: "POST",
            uri: ENDPOINTS.refreshToken,
            body: JSON.stringify({
              refresh_token: getBrowserItem("refreshToken"),
            }),
          })
            .then((response) => {
              dispatch({
                type: AuthTypes.LOGIN,
                payload: {
                  ...response?.data,
                  token: response?.data.access_token,
                  refreshToken: response?.data.refresh_token,
                },
              })
              return API({
                uri,
                body,
                method,
                message,
                notifyError,
                contentType,
              })
            })
            .catch(() => {
              dispatch({ type: AuthTypes.LOGOUT })
              router.push("/login")
            })
        } else if (
          notifyError &&
          errorStatus &&
          errorMessage !== "The user aborted a request."
        ) {
          if (errorMessage === "Failed to fetch") {
            errorMessage = "Network Error"
          }

          enqueueSnackbar(errorMessage, {
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
