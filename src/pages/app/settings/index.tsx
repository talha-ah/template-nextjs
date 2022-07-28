import Head from "next/head"
import * as React from "react"

import { Box } from "@mui/material"

import { DrawerLayout } from "@layouts/Drawer"
import { UpdateMessages } from "@forms/settings"

export default function Settings() {
  return (
    <>
      <Head>
        <title>Settings - Six Wraps</title>
      </Head>

      <DrawerLayout title="Settings">
        <Box sx={{ mt: 1 }}>
          <UpdateMessages />
        </Box>
      </DrawerLayout>
    </>
  )
}
