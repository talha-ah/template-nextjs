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
  logo?: string
  address?: Address
}

export type User = {
  _id: string
  name: string
  role: string
  email: string
  image?: string
  status?: string
  firstName: string
  lastName?: string
  address?: Address
  organizationId: string
  organization: Organization
  dateOfBirth?: string | Date
  organizations: Organization[]
}

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

export type ThemeMode = "light" | "dark"

export type Pagination = {
  page: number
  limit: number
  pagesCount: number
  totalCount: number
}

export type Response =
  | {
      data: any
      message: string
      headers?: any
      pagination?: Pagination
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
