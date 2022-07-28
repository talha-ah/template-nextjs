import React from "react"

export type Address = {
  addressOne: string
  addressTwo?: string
  addressThree?: string
  zip?: String
  city?: String
  state?: String
  country?: String
}

export type Organization = {
  _id: string
  name: string
  email: string
  phone: string
  logo?: string
  address?: Address
}

export type User = {
  _id: string
  name: string
  firstName: string
  lastName?: string
  email: string
  phone?: string
  gender?: string
  dateOfBirth?: string | Date
  image?: string
  fcmToken?: string
  lastLoginAt?: Date
  role: string
  status?: string
  address?: Address
  organizationId: string
  organization: Organization
  organizations: Organization[]
}

export type Invite = {
  _id: string
  name: string
  firstName: string
  lastName?: string
  email: string
  organizationId: string
}

export type Customer = {
  _id: string
  firstName: string
  lastName?: string
  name?: string
  email: string
  phone: string
  gender?: string
  dateOfBirth?: string | Date
  image?: string
  reviewedAt?: Date
  organizationId: string
  status: string
  totalJobs: number
}

export type Service = {
  _id: string
  name: string
  parentId?: string
  subServices?: Service[]
  organizationId: string
  status: any
  updateAt: Date
  createdAt: Date
}

export type Vehicle = {
  vinNumber: string
  licenseNumber: string
  color: string
  make: string
  model: string
  year: string
}

export type Job = {
  _id: string
  customer: Customer
  customerSign?: string
  vehicle: Vehicle
  services: Service[]
  estimatedCompletionDate: Date
  paymentType: "cash" | "credit_cart" | "check" | "finance" | "other"
  images: string[]
  videos: string[]
  description: string
  reviewed: boolean
  userId: string
  organizationId: string
  status: string
  createdAt: Date
  updatedAt: Date
}

export type MetadataStatus = {
  label: string
  value: string
}
export type MetadataStatusTexts = {
  _id: string
  status: string
  text: string
}

export type Metadata = {
  legalAgreement: string
  statusTexts: MetadataStatusTexts[]
  statuses: MetadataStatus[]
  services?: Service[]
}

export type DataTableHeader = {
  id: string
  label: string
  align?: "right" | "inherit" | "left" | "center" | "justify"
  width?: string | number
  minWidth?: string | number
  sortable?: boolean
  sort?: string
  filterable?: boolean
  filter?: string
  format?: (value: any) => string
  render?: (value: any) => React.ReactNode
}

export type ThemeMode = "light" | "dark"

export type ActionType = {
  type: string
  payload: any
}

export type AuthStateType = {
  user: User
  token: string
  isAuth: boolean
  loading: boolean
  refreshToken: string
  theme: ThemeMode
}

export type Pagination = {
  page: number
  limit: number
  pagesCount: number
  totalCount: number
}

export type Response =
  | {
      data: any
      headers?: any
      message: string
      pagination?: Pagination
      page?: number
      limit?: number
      totalData?: number
      totalPages?: number
    }
  | undefined

export type T = Awaited<Promise<Response>>

export type NavLink = {
  type: string
  href?: string
  label: string
  color?: string
  exact?: boolean
  children?: NavLink[]
  icon?: React.ReactElement
}

export type Interval = "week" | "month" | "year"
export type Color =
  | "default"
  | "primary"
  | "secondary"
  | "error"
  | "info"
  | "success"
  | "warning"
