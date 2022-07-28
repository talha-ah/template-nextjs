import getConfig from "next/config"

const { publicRuntimeConfig } = getConfig()

export const apiLimit = publicRuntimeConfig.apiLimit

export const baseURL = `${publicRuntimeConfig.apiPath}/api/${publicRuntimeConfig.apiVersion}`

export const drawerWidth = 260

export const days: string[] = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
export const months: string[] = [
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
export const years: string[] = Array.from(new Array(10), (_, i) =>
  String(new Date().getFullYear() - i)
).reverse()

export const endpoints = {
  login: "/auth/login",
  register: "/auth/register",
  checkToken: "/auth/check/token",
  checkEmail: "/auth/check/email",
  verifyEmail: "/auth/verify-email",
  recoverPassword: "/auth/recover-password",

  // Profile
  profile: "/profile",

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

  // Customers
  customers: "/customers",

  // Analytics
  analyticsUsers: "/analytics/users",
  analyticsUsersChart: "/analytics/users/charts",
}
