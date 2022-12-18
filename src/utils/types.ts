import React from "react"

export type Status = "active" | "inactive"
export type SettingsTypes = "general" | "inventory"
export type ThemeMode = "light" | "dark" | "system"
export type Currency = "PKR" | "USD" | "EUR" | "GBP"
export type Width = "xs" | "sm" | "md" | "lg" | "xl"
export type DateRange = [Date | null, Date | null]
export type Interval = "day" | "week" | "month" | "year"
export type Align = "right" | "inherit" | "left" | "center" | "justify"

export type Color =
  | "default"
  | "primary"
  | "secondary"
  | "error"
  | "info"
  | "success"
  | "warning"

export type Freeze<T> = {
  readonly [P in keyof T]: T[P]
}

export interface ActionType {
  type: string
  payload: any
}

export interface AuthStateType {
  user: User
  token: string
  isAuth: boolean
  loading: boolean
  theme: ThemeMode
  refreshToken: string
}

export interface NavLink {
  type: string
  href?: string
  value: string
  color?: string
  exact?: boolean
  children?: NavLink[]
  icon?: React.ReactElement
  actions?: React.ReactNode[]
}

export interface MenuLink {
  type: string
  href?: string
  value: string
  color?: string
  onClick?: () => void
  icon?: React.ReactElement
}

export interface Option {
  key: string
  value: string
}

export interface ChartProps {
  key: string
  value: string | number
  [key: string]: any
}

export interface ErrorWithMessage {
  message: string
  status?: number
}

export interface Params {
  body?: any
  uri: string
  method?: string
  message?: string
  contentType?: string
  notifyError?: boolean
}

export interface Pagination {
  page?: number
  limit?: number
  totalData?: number
  totalPages?: number
}

export interface ApiResponse {
  data: any
  message: string
  success: boolean
  pagination?: Pagination
}

export interface Metadata {
  [key: string]: any
}

export interface Settings {
  [key: string]: any
}

export interface Permissions {
  [key: string]: {
    options: string[]
    settings: string[]
    description: string
  }
}

export interface DataTableHeader {
  key: string
  value: string
  sort?: string
  align?: Align
  filter?: string
  sortable?: boolean
  filterable?: boolean
  width?: string | number
  minWidth?: string | number
  format?: (value: any) => string
  onSort?: () => React.ReactNode[]
  actions?: () => React.ReactNode[]
  render?: (value: any, index: number) => React.ReactNode
}

export interface Address {
  addressOne: string
  addressTwo?: string
  addressThree?: string
  zip: string
  city: string
  state: string
  country: string
}

export interface User {
  _id: string
  name: string
  role: string
  email: string
  phone?: string
  firstName: string
  lastName?: string
  permissions?: Permissions
  organization?: Organization
  organizations?: Organization[]
  status?: Status | "pending" | "blocked"
}

export interface Organization {
  _id: string
  name: string
  logo?: string
  email?: string
  phone?: string
  users?: User[]
  status: Status
  address?: Address
}

export interface Invite {
  _id: string
  name: string
  email: string
  firstName: string
  lastName?: string
  organizationId: string
}
