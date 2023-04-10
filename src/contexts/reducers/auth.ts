import { saveBrowserObj, removeBrowserItem } from "@utils/browser-utility"

import { ActionType, AuthInitialStateType } from "@utils/types"

export const AuthInitialState: AuthInitialStateType = {
  user: null,
  redirect: "",
  loading: true,
  isAuth: false,
  theme: "light",
  accessToken: "",
  refreshToken: "",
  initializing: true,
}

export const AuthTypes = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
  SET_USER: "SET_USER",
  SET_THEME: "SET_THEME",
  SET_REDIRECT: "SET_REDIRECT",
  SET_INITIALIZED: "SET_INITIALIZED",
}

export const AuthReducer = (
  state: AuthInitialStateType,
  action: ActionType
) => {
  switch (action.type) {
    case AuthTypes.LOGIN:
      saveBrowserObj(undefined, action.payload)

      return {
        ...state,
        ...action.payload,
        isAuth: true,
        loading: false,
        theme: action.payload.user.theme || "light",
      }
    case AuthTypes.LOGOUT:
      removeBrowserItem()
      return {
        ...state,
        user: "",
        isAuth: false,
        loading: false,
        accessToken: "",
        refreshToken: "",
      }
    case AuthTypes.SET_USER:
      return {
        ...state,
        user: action.payload.user,
      }
    case AuthTypes.SET_THEME:
      return {
        ...state,
        theme: action.payload.theme || "light",
      }
    case AuthTypes.SET_REDIRECT:
      return {
        ...state,
        redirect: action.payload.redirect,
      }
    case AuthTypes.SET_INITIALIZED:
      return {
        ...state,
        initializing: action.payload.initializing,
      }
    default:
      return state
  }
}
