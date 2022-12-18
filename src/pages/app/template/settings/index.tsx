import Head from "next/head"
import * as React from "react"

import { Box } from "@mui/material"

import { APP_NAME } from "@utils/constants"
import { DrawerLayout } from "@layouts/Drawer"
import { EditInventorySettings } from "@forms/settings"

export default function InventorySettings() {
  return (
    <>
      <Head>
        <title>Settings - {APP_NAME}</title>
      </Head>

      <DrawerLayout title="Settings" withBackButton>
        <Box sx={{ mt: 1 }}>
          <EditInventorySettings />
        </Box>
      </DrawerLayout>
    </>
  )
}
