import dayjs from "dayjs"
import Head from "next/head"
import { useState, useEffect } from "react"

import { Box } from "@mui/material"
import { Settings } from "@mui/icons-material"

import { LinkBehaviour } from "@ui/Link"
import { APP_NAME } from "@utils/constants"
import { IconButton } from "@ui/IconButton"
import { DrawerLayout } from "@layouts/Drawer"
import { useAppContext } from "@contexts/index"
import { checkPermission } from "@utils/common"
import { DateRange, Interval } from "@utils/types"
import { DateRangePicker } from "@ui/DateRangePicker"

/**
 * Template Dashboard
 */

export default function Dashboard() {
  const { state } = useAppContext()

  const [isAdmin, setIsAdmin] = useState<boolean>(false)
  const [interval, setInterval] = useState<Interval>("month")
  const [dates, setDates] = useState<DateRange>([
    dayjs().set("day", 1).subtract(1, "month").toDate(),
    dayjs().toDate(),
  ])

  useEffect(() => {
    setIsAdmin(
      checkPermission(state?.auth?.user?.permissions, "Dashboard", "users")
    )
  }, [state])

  return (
    <>
      <Head>
        <title>Dashboard - {APP_NAME}</title>
      </Head>

      <DrawerLayout
        title="Dashboard"
        actions={
          <IconButton
            size="small"
            key="settings"
            tooltip="Settings"
            component={LinkBehaviour}
            to="/app/template/settings"
            onClick={(event) => event.stopPropagation()}
          >
            <Settings fontSize="small" />
          </IconButton>
        }
      >
        <DateRangePicker value={dates} onChange={setDates} />

        <Box sx={{ my: 2 }} />

        {isAdmin
          ? "Welcome to the admin dashboard"
          : "Welcome to the dashboard"}
      </DrawerLayout>
    </>
  )
}
