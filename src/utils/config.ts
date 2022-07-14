import getConfig from "next/config"

const { publicRuntimeConfig } = getConfig()

export const apiLimit = publicRuntimeConfig.apiLimit

export const baseURL = `${publicRuntimeConfig.apiPath}/api/${publicRuntimeConfig.apiVersion}`

export const drawerWidth = 260
