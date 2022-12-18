import { setBrowserItem, removeBrowserItem } from "@utils/browser-utility"

import { User, ActionType, AuthStateType, ThemeMode } from "@utils/types"

export const AuthInitialState = {
  user: {} as User,
  token: "" as string,
  loading: true as boolean,
  isAuth: false as boolean,
  refreshToken: "" as string,
  theme: "light" as ThemeMode,
}

export const AuthTypes = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
  SET_USER: "SET_USER",
  SET_THEME: "SET_THEME",
}

export const AuthReducer = (state: AuthStateType, action: ActionType) => {
  switch (action.type) {
    case AuthTypes.LOGIN:
      const { token, refreshToken } = action.payload
      setBrowserItem(token)
      setBrowserItem(refreshToken, "refresh-token")
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
        token: "",
        isAuth: false,
        loading: false,
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
    default:
      return state
  }
}
