export interface Header {
  title: string
  description?: string
}

export interface Service {
  url: string
  icon: string
  title: string
  description: string
}

export interface About {
  url: string
  icon: string
  title: string
  description: string
}

export interface Review {
  review: string
  customer: string
}

export interface Post {
  image: string
  title: string
  linkText: string
  imageText: string
  description: string
}

export interface Availability {
  time: {
    start: string
    end: string
  }
  days: {
    monday: boolean
    tuesday: boolean
    wednesday: boolean
    thursday: boolean
    friday: boolean
    saturday: boolean
    sunday: boolean
  }
}

export interface Social {
  url: string
  name: string
}

export interface Contact {
  email: string
  phone: string
}

export interface Link {
  url: string
  title: string
}
