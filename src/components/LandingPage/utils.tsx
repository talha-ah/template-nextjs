import { AccessTime, Phone, Email } from "@mui/icons-material"
import { Twitter, Facebook, Instagram } from "@mui/icons-material"

import { Availability } from "./types"

export const getAvailability = (availability: Availability) => {
  let end = ""
  let start = ""

  // calc start
  if (availability.days.monday) {
    start = "Monday"
  } else if (availability.days.tuesday) {
    start = "Tuesday"
  } else if (availability.days.wednesday) {
    start = "Wednesday"
  } else if (availability.days.thursday) {
    start = "Thursday"
  } else if (availability.days.friday) {
    start = "Friday"
  } else if (availability.days.saturday) {
    start = "Saturday"
  } else if (availability.days.sunday) {
    start = "Sunday"
  }

  // calc end
  if (availability.days.sunday) {
    end = "Sunday"
  } else if (availability.days.saturday) {
    end = "Saturday"
  } else if (availability.days.friday) {
    end = "Friday"
  } else if (availability.days.thursday) {
    end = "Thursday"
  } else if (availability.days.wednesday) {
    end = "Wednesday"
  } else if (availability.days.tuesday) {
    end = "Tuesday"
  } else if (availability.days.monday) {
    end = "Monday"
  }

  const result = `${start} - ${end} ${availability.time.start} - ${availability.time.end}`

  return result
}

export const getIcon = (name: string) => {
  switch (name) {
    case "Facebook":
      return <Facebook />
    case "Instagram":
      return <Instagram />
    case "Twitter":
      return <Twitter />
    case "Email":
      return <Email />
    case "Phone":
      return <Phone />
    case "AccessTime":
      return <AccessTime />
    default:
      return <Email />
  }
}
