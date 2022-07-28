/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    staticFolder: "/public",
    apiPath: process.env.NEXT_PUBLIC_API_PATH,
    apiVersion: process.env.NEXT_PUBLIC_API_VERSION,
    storageKey: process.env.NEXT_PUBLIC_STORAGE_KEY,
    apiLimit: process.env.NEXT_PUBLIC_API_LIMIT,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  // experimental: {
  //   esmExternals: "loose",
  // },
}

module.exports = nextConfig
