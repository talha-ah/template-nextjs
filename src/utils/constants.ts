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
  recoverPassword: "/auth/recover-password",
  switchOrganization: "/auth/organization",

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

  // Inventory
  appInventory: "/app-inventory",

  // Customers
  customers: "/customers",

  // Categories
  categories: "/categories",

  // Items
  items: "/items",

  // Warehouses
  warehouses: "/warehouses",

  // Item Inventory
  itemInventory: "/item-inventory",
  itemInventoryHistory: "/item-inventory/history",

  // Suppliers
  suppliers: "/suppliers",

  // Purchase Orders
  purchaseOrders: "/purchase-orders",
  purchaseOrdersStatus: "/purchase-orders/status",
  purchaseOrdersMetadata: "/purchase-orders/metadata",

  // Quotations
  quotations: "/quotations",
  quotationsMetadata: "/quotations/metadata",

  // Orders
  orders: "/orders",
  ordersMetadata: "/orders/metadata",
  ordersPayment: "/orders/payment",
  customerOrders: "/orders/customer",

  // Analytics
  analyticsSales: "/analytics/sales",
  analyticsItems: "/analytics/items",
}
