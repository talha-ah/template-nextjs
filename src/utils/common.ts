import { DAYS, MONTHS, YEARS } from "@utils/constants"
import { Permissions, ChartProps, Interval } from "@utils/types"

export const generateId = (prefix = "", length = 7) => {
  let result = prefix
  for (let i = 0; i < length; i++) {
    const random = Math.random()
    result += String.fromCharCode(
      Math.floor(random * 26) + (random < 0.5 ? 65 : 97)
    )
  }
  return result.toUpperCase()
}

export const isNotEmpty = (item: any) => {
  return item !== undefined && item !== null && item !== "" && item.length !== 0
}

export const getInitials = (user: any) => {
  let initials = ""
  if (user.firstName) initials += user.firstName.charAt(0)
  if (user.lastName) initials += user.lastName.charAt(0)
  return initials
}

export const ellipside = (str: string, length = 20) => {
  if (str.length > length) return str.substring(0, length) + "..."
  return str
}

export const getCurrency = (currency?: string) => {
  switch (currency) {
    case "USD":
      return "$"
    case "EUR":
      return "€"
    case "GBP":
      return "£"
    case "PKR":
      return "₨"
    default:
      return "₨"
  }
}

export const getFullName = (user: any) => {
  let name = user.firstName
  if (user.lastName) name += " " + user.lastName
  return name
}

export const getAddress = (address: any) => {
  let fullAddress = ""
  if (address.address1) fullAddress += address.address1 + ", "
  if (address.address2) fullAddress += address.address2 + ", "
  if (address.city) fullAddress += address.city + ", "
  if (address.postalCode) fullAddress += address.postalCode + ", "
  if (address.state) fullAddress += address.state + ", "
  if (address.country) fullAddress += address.country

  if (fullAddress.endsWith(", ")) fullAddress = fullAddress.slice(0, -2)

  return fullAddress
}

export const toTitleCase = (str: string) => {
  if (str) str = str.charAt(0).toUpperCase() + str.slice(1)

  return str
}

export const replaceDelimeter = (str: string, delimeter = "_") => {
  let arr = str.split(delimeter)
  arr = arr.map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
  return arr.join(" ")
}

export const truncateString = (text: any, ellipsisString: string) => {
  return (text || "").length > ellipsisString
    ? text.substring(0, ellipsisString) + "..."
    : text
}

export const truncate = (n: any, digits: any) => {
  if (!n) return 0

  var re = new RegExp("(\\d+\\.\\d{" + digits + "})(\\d)"),
    m = n.toString().match(re)
  return m ? parseFloat(m[1]) : n.valueOf()
}

export const pad = (num: number | string, size = 6) => {
  // Pad a number with leading zeros
  let s = num + ""
  while (s.length < size) s = "0" + s
  return s
}

export const roundNumber = (num: number) => {
  return Math.round((num + Number.EPSILON) * 100) / 100
}

export const numberWithCommas = (x: any): string => {
  if (!x) return "0"
  return Number(String(x).replaceAll(",", "")).toLocaleString(undefined, {
    maximumFractionDigits: 2,
  })
}

export const calculateTableTotal = (
  rows: any,
  accessor: string | ((row: any) => number)
) => {
  const total = (rows || []).reduce(
    (acc: number, row: any) =>
      acc + (typeof accessor === "string" ? +row[accessor] : +accessor(row)),
    0
  )
  return numberWithCommas(total)
}

export const calculateDiscountPercentage = (
  value: number,
  discount: number
) => {
  value = value
  discount = discount
  if (!discount || discount === 0) return discount
  return (value * discount) / 100
}

export const calculateDiscount = (
  value: number,
  quantity: number,
  discount: number
) => {
  value = value * quantity
  discount = calculateDiscountPercentage(value, discount)
  return {
    discount: discount,
    value: value - discount,
  }
}

export const removeDuplicateRow = (array: any, key: string) => [
  ...array
    .reduce((map: any, obj: any) => map.set(obj[key], obj), new Map())
    .values(),
]

export const populateChart = (data: ChartProps[], interval: Interval) => {
  if (interval === "week") {
    return DAYS.map((elem, index) => ({
      key: elem,
      value: data?.find((item: any) => +item.key === index + 1)?.value ?? 0,
    }))
  }

  if (interval === "month") {
    return MONTHS.map((elem, index) => ({
      key: elem,
      value: data?.find((item: any) => +item.key === index + 1)?.value ?? 0,
    }))
  }

  return YEARS.map((elem) => ({
    key: elem,
    value: data?.find((item: any) => +item.key === +elem)?.value ?? 0,
  }))
}

export const objectToParams = (obj: any) => {
  let str = ""
  for (const key in obj) {
    if (obj[key] !== undefined && obj[key] !== null) {
      if (str != "") {
        str += "&"
      }
      str += key + "=" + encodeURIComponent(obj[key])
    }
  }
  return str
}

export const downloadFile = (url: string, fileName: string) => {
  // for non-IE
  const req = new XMLHttpRequest()
  req.open("GET", url, true)
  req.responseType = "blob"
  req.onload = function () {
    //Convert the Byte Data to BLOB object.
    const blob = new Blob([req.response], { type: "application/octetstream" })

    //Check the Browser type and download the File.
    const isIE = false || !!document.DOCUMENT_NODE
    if (isIE) {
      // window.navigator.msSaveBlob(blob, fileName)
    } else {
      const url = window.URL || window.webkitURL
      const link = url.createObjectURL(blob)
      const a = document.createElement("a")
      a.setAttribute("download", fileName)
      a.setAttribute("href", link)
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    }
  }
  req.send()
}

export const base64ToBlob = (base64: string) => {
  var byteString = atob(base64.split(",")[1])
  var ab = new ArrayBuffer(byteString.length)
  var ia = new Uint8Array(ab)

  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i)
  }
  return new Blob([ab], { type: "image/png" })
}

export const timeoutPromise = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const checkPermission = (
  permissions?: Permissions,
  module?: string,
  option?: string
) => {
  if (!permissions) return false
  if (!module || !permissions[module]) return false
  if (option && !permissions[module].options.includes(option)) return false
  return true
}

/* eslint no-console: ["error", { allow: ["log", "info", "warn"] }] */

/* Prints the app name and version, helpful for debugging */
export const welcomeMsg = () => {
  const { APP_NAME } = require("@utils/constants")

  console.log(
    `\n%c${APP_NAME || ""} 🚀`,
    "color:#0dd8d8; background:#0b1021; font-size:1.5rem; padding:0.15rem 0.25rem; margin: 1rem auto; font-family: Rockwell; border: 2px solid #0dd8d8; border-radius: 4px;font-weight: bold; text-shadow: 1px 1px 1px #00af87bf;"
  )
}

/* Prints warning message, usually when there is a configuration error */
export const warningMsg = (message: string, stack: string) => {
  const { APP_NAME } = require("@utils/constants")
  console.info(
    `\n%c⚠️ Warning ⚠️%c \n${message} \n\n%cThis is likely not an issue with ${
      APP_NAME || ""
    }, but rather your configuration. If you think it is a bug, please open a ticket on GitHub: https://git.io/JukXk`,
    "color:#ceb73f; background: #ceb73f33; font-size:1.5rem; padding:0.15rem; margin: 1rem auto; font-family: Rockwell, Tahoma, 'Trebuchet MS', Helvetica; border: 2px solid #ceb73f; border-radius: 4px; font-weight: bold; text-shadow: 1px 1px 1px #000000bf;",
    "font-weight: bold; font-size: 1rem;color: #ceb73f;",
    "color: #ceb73f; font-size: 0.75rem; font-family: Tahoma, 'Trebuchet MS', Helvetica;"
  )
  if (stack) {
    console.warn(`%cStack Trace%c\n${stack}`, "font-weight: bold;", "")
  }
}

/* Prints status message */
export const statusMsg = (title: string, msg: string) => {
  console.log(
    `%c${title || ""}\n%c${msg}`,
    "font-weight: bold; color: #0dd8d8; text-decoration: underline;",
    "color: #ceb73f;"
  )
}

/* Prints status message, with a stack trace */
export const statusErrorMsg = (
  title: string,
  msg: string,
  errorLog: string
) => {
  console.log(
    `%c${title || ""}\n%c${msg} \n%c${errorLog || ""}`,
    "font-weight: bold; color: #0dd8d8; text-decoration: underline;",
    "color: #ff025a",
    "color: #ff025a80;"
  )
}
