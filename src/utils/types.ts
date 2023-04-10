import React from "react"

export type View = "list" | "grid"
export type Status = "active" | "inactive"
export type ExportFormats = "pdf" | "excel"
export type DateRange = [Date | null, Date | null]
export type SettingsTypes = "general" | "inventory"
export type ThemeMode = "light" | "dark" | "system"
export type Currency = "PKR" | "USD" | "EUR" | "GBP"
export type Width = "xs" | "sm" | "md" | "lg" | "xl"
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

export interface LoginResponse {
  user: User | null
  accessToken: string
  refreshToken: string
}

export interface AuthStateType {
  isAuth: boolean
  loading: boolean
  theme: ThemeMode

  redirect: string
  initializing: boolean
}

export interface AuthInitialStateType extends AuthStateType, LoginResponse {}

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
  icon?: any
  type: string
  href?: string
  value: string
  color?: string
  onClick?: () => void
}

export interface Option {
  key: string
  value: string | React.ReactNode
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
  postalCode: string
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

// Listings
export interface ContactPerson {
  firstName: string
  lastName: string
  email: string
  phone: string
}

export type ListingPricingPeriods =
  | "one-off"
  | "per-night"
  | "per-week"
  | "per-month"
  | "per-year"

export type ListingPropertyType =
  | "apartment"
  | "house"
  | "condo"
  | "townhouse"
  | "office"
  | "land"
  | "commercial"
  | "industrial"
  | "retail"
  | "warehouse"
  | "other"

export type ListingPropertyKeys =
  | "year-built"
  | "bathrooms"
  | "bedrooms"
  | "building-size"
  | "building-size-unit"
  | "lot-size"
  | "lot-size-unit"

export interface ListingProperty {
  value: string
  key: ListingPropertyKeys
}

export interface ListingPrice {
  minAmount: number
  maxAmount: number
  type: ListingType
  currency: Currency
  period: ListingPricingPeriods
}

export interface Media {
  url: string
  type: "image" | "video"
}

export interface Location {
  lat: number
  long: number
}

export type ListingType = "rent" | "sale" | "listing"

export interface Listing {
  _id: string
  title: string
  status: Status
  media: Media[]
  createdAt: Date
  updatedAt: Date
  address: Address
  features: string[]
  location: Location
  availableFrom: Date
  description: string
  prices: ListingPrice[]
  shortDescription: string
  organization: Organization
  listingTypes: ListingType[]
  properties: ListingProperty[]
  contactPersons: ContactPerson[]
  propertyType: ListingPropertyType
}
