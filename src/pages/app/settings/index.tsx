import Head from "next/head"
import * as React from "react"

import { Box } from "@mui/material"

import { Heading } from "@components/Title"
import { APP_NAME } from "@utils/constants"
import { DrawerLayout } from "@layouts/Drawer"
import { UpdateProfile, UpdatePassword } from "@forms/settings"

export default function Settings() {
  return (
    <>
      <Head>
        <title>Settings - {APP_NAME}</title>
      </Head>

      <DrawerLayout title="Settings">
        <Heading>Profile</Heading>

        <Box sx={{ mt: 2 }}>
          <UpdateProfile />
        </Box>

        <Heading>Password</Heading>

        <Box sx={{ mt: 2 }}>
          <UpdatePassword />
        </Box>
      </DrawerLayout>
    </>
  )
}
