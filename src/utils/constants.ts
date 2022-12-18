import getConfig from "next/config"

const { publicRuntimeConfig } = getConfig()

export const API_LIMIT = publicRuntimeConfig.apiLimit

export const BASE_URL = `${publicRuntimeConfig.apiPath}/api/${publicRuntimeConfig.apiVersion}`

export const DRAWER_WIDTH = 260
export const APP_BAR_HEIGHT = 65

export const APP_NAME = publicRuntimeConfig.appName

export const MONTHS: string[] = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
]
export const DAYS: string[] = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
export const YEARS: string[] = Array.from(new Array(10), (_, i) =>
  String(new Date().getFullYear() - i)
).reverse()

export const ENDPOINTS = {
  // Auth
  login: "/auth/login",
  register: "/auth/register",
  authProfile: "/auth/profile",
  refreshToken: "/auth/refresh",
  checkToken: "/auth/check/token",
  checkEmail: "/auth/check/email",
  verifyEmail: "/auth/verify-email",
  forgotPassword: "/auth/forgot-password",
  switchOrganization: "/auth/organization",
  recoverPassword: "/auth/recover-password",

  // Profile
  profile: "/profile",
  profileTheme: "/profile/theme",

  // Users
  users: "/users",

  // Organizations
  organizations: "/organizations",
  organizationMetadata: "/organizations/metadata",

  // Organization Users
  organizationUsers: "/organizations/users",

  // Invite Users
  invites: "/invites",
  checkInvite: "/invites/check",
  acceptInvite: "/invites/accept",
  rejectInvite: "/invites/reject",
  resendInvite: "/invites/resend",

  // Settings
  settings: "/settings",

  // Customers
  customers: "/customers",

  // Analytics
  analyticsUsers: "/analytics/users",
  analyticsUsersChart: "/analytics/users/charts",
}
