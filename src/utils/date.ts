import dayjs from "dayjs"

export const getLocaleDate = () => new Date().toLocaleString()

export const strToDate = (date: Date, format = "DD-MM-YYYY") => {
  if (!date) return ""
  return dayjs(date, format).toDate()
}

export const formatDate = (
  date: Date | string | null,
  format = "MMM DD, YYYY"
) => {
  if (!date) return ""
  return dayjs(date).format(format)
}

export const addDays = (date: Date, days: number) => {
  return dayjs(date).add(days, "days").toDate()
}

export const isDateAfter = (date1: Date, date2: Date) => {
  return dayjs(date1).isAfter(dayjs(date2))
}

export const difference = (date1: Date, date2: Date, unit: any = "days") => {
  return dayjs(date2).diff(date1, unit)
}

// export const getDays = () =>
//   Array.apply(null, Array(7)).map((_, i) => dayjs(i, "e").startOf("week"))

// export const duration = (date1: Date, date2: Date) =>
//   dayjs.duration(dayjs(date2).diff(date1))

// export const hourMinuteTime = (date1: Date, date2: any) => {
//   if (!date2) {
//     date2 = dayjs().utc()
//   }
//   const diff = DateUtility.duration(date1, date2)
//   return `${DateUtility.difference(date1, date2)}d ${diff.get("hours")}h`
// }

// export const hoursList = () => {
//   return Array.from({ length: 24 }, (_, i) => i).reduce(
//     (r: any, hour: number) => {
//       r.push(dayjs({ hour, minute: 0 }).format("h:mm A"))
//       r.push(dayjs({ hour, minute: 30 }).format("h:mm A"))
//       return r
//     },
//     []
//   )
// }
