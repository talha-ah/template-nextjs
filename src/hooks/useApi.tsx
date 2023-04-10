import { useRouter } from "next/router"
import { useSnackbar } from "notistack"
import { useLayoutEffect, useEffect, useRef } from "react"

import { getLocaleDate } from "@utils/date"
import { getBrowserObj } from "@utils/browser-utility"
import { BASE_URL, ENDPOINTS } from "@utils/constants"
import { useAppContext, AuthTypes } from "@contexts/index"
import {
  Params,
  ApiResponse,
  LoginResponse,
  ErrorWithMessage,
} from "@utils/types"

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
      const loginData: LoginResponse = getBrowserObj()

      try {
        const headers = new Headers()
        if (contentType) headers.append("Content-Type", contentType)

        if (loginData && loginData.accessToken) {
          headers.append("Authorization", `Bearer ${loginData.accessToken}`)
        }

        const response = await fetch(BASE_URL + uri, {
          body: body,
          method: method,
          headers: headers,
          signal: controller?.signal,
        })

        if (!response.ok) {
          const error = await response.json()
          error.status = response.status
          throw error
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
          try {
            if (!loginData || !loginData.refreshToken) {
              throw new Error("No refresh token found")
            }

            const response = await API({
              method: "POST",
              uri: ENDPOINTS.refreshToken,
              body: JSON.stringify({
                refreshToken: loginData.refreshToken,
              }),
            })

            dispatch({
              type: AuthTypes.LOGIN,
              payload: response?.data,
            })

            return API({
              uri,
              body,
              method,
              message,
              notifyError,
              contentType,
            })
          } catch (error: any) {
            dispatch({ type: AuthTypes.LOGOUT })
            router.push("/login")
          }
        } else if (
          notifyError &&
          errorStatus &&
          errorMessage !== "Token is expired" &&
          errorMessage !== "The user aborted a request."
        ) {
          if (errorMessage === "Failed to fetch") errorMessage = "Network Error"

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
