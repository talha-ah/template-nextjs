import React from "react"

export type Freeze<T> = {
  readonly [P in keyof T]: T[P]
}

export type ThemeMode = "light" | "dark" | "system"

export type DateRangeType = [Date | null, Date | null]

export type Interval = "day" | "week" | "month" | "year"

export type Color =
  | "default"
  | "primary"
  | "secondary"
  | "error"
  | "info"
  | "success"
  | "warning"

export interface ActionType {
  type: string
  payload: any
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
  total_pages?: number
  total_count?: number
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
  label: string
  color?: string
  exact?: boolean
  children?: NavLink[]
  icon?: React.ReactElement
}

export interface MenuLink {
  type: string
  href?: string
  label: string
  color?: string
  onClick?: () => void
  icon?: React.ReactElement
}

export interface DataTableHeader {
  id: string
  label: string
  sort?: string
  filter?: string
  sortable?: boolean
  filterable?: boolean
  width?: string | number
  minWidth?: string | number
  format?: (value: any) => string
  render?: (value: any) => React.ReactNode
  align?: "right" | "inherit" | "left" | "center" | "justify"
}

export interface Invite {
  _id: string
  name: string
  email: string
  firstName: string
  lastName?: string
  organizationId: string
}

export interface Organization {
  _id: string
  name: string
  email?: string
  phone?: string
  logo?: string
  users?: User[]
  status?: "active" | "inactive"
}

export interface User {
  _id: string
  name: string
  role: string
  email: string
  phone?: string
  firstName: string
  lastName?: string
  status?: "active" | "inactive" | "pending" | "blocked"
}
