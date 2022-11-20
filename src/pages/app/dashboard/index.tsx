import Head from "next/head"
import { useState, useEffect } from "react"

import { Box } from "@mui/material"
import { Grid } from "@mui/material"
import { Paper } from "@mui/material"
import { styled } from "@mui/material/styles"

import { useApi } from "@hooks/useApi"
import { APP_NAME } from "@utils/constants"
import { Heading } from "@components/Title"
import { ENDPOINTS } from "@utils/constants"
import { DrawerLayout } from "@layouts/Drawer"
import { Interval, Color } from "@utils/types"
import { useAppContext } from "@contexts/index"
import { checkPermission } from "@utils/common"
import { Props } from "@components/Graphs/PieChart"
import { DAYS, MONTHS, YEARS } from "@utils/constants"
import { BarChart } from "@components/Graphs/BarChart"
import { LineChart } from "@components/Graphs/LineChart"
import { AnalyticsCard } from "@components/AnalyticsCard"
import { ToggleButtons } from "@components/ToggleButtons"

const Chart = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
  height: 400,
  width: "100%",
}))

export default function Dashboard() {
  const { state } = useAppContext()

  const [isAdmin, setIsAdmin] = useState<boolean>(false)
  const [interval, setInterval] = useState<Interval>("month")

  useEffect(() => {
    setIsAdmin(
      checkPermission(state.auth.user.permissions, "Dashboard", "users")
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
          <ToggleButtons
            value={interval}
            onClick={({ value }: { value: Interval }) => {
              setInterval(value)
            }}
            options={[
              { label: "Year", value: "year" },
              { label: "Month", value: "month" },
              { label: "Week", value: "week" },
            ]}
          />
        }
      >
        <Heading sx={{ mb: 1 }}>Overview</Heading>
        {isAdmin && (
          <>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <UsersCard title="Users" interval={interval} />
              </Grid>
            </Grid>

            <Box sx={{ my: 2 }} />

            <Grid container spacing={2}>
              <Grid item xs={12} md={6} lg={4}>
                <UsersChart1 title="Users" interval={interval} />
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <UsersChart2 title="Users" interval={interval} />
              </Grid>
            </Grid>
          </>
        )}
      </DrawerLayout>
    </>
  )
}

type CardData = {
  currentData: string
  previousData: string
  percentage: number
  isLoss: boolean
  diff: number
  color?: Color
}

const UsersCard = ({
  title,
  interval,
}: {
  title: string
  interval?: Interval
}) => {
  const API = useApi()

  const [loading, setLoading] = useState<boolean>(true)
  const [data, setData] = useState<CardData>({} as CardData)

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [interval])

  const fetchData = async () => {
    try {
      setLoading(true)

      const response = await API({
        uri: `${ENDPOINTS.analyticsUsers}?interval=${interval}`,
      })

      let diff = 0
      let isLoss = false
      let percentage = 0
      let color: Color = "primary"

      if (response?.data.currentData >= response?.data.previousData) {
        percentage =
          ((response?.data.currentData - response?.data.previousData) /
            response?.data.currentData) *
          100
        diff = response?.data.currentData - response?.data.previousData
      } else {
        isLoss = true
        color = "error"
        diff = response?.data.previousData - response?.data.currentData
        percentage =
          ((response?.data.previousData - response?.data.currentData) /
            response?.data.previousData) *
          100
      }

      setData({
        previousData: response?.data.previousData,
        currentData: response?.data.currentData,
        percentage,
        isLoss,
        color,
        diff,
      })
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnalyticsCard
      title={title}
      count={data?.currentData}
      percentage={data?.percentage}
      isLoss={data?.isLoss}
      color={data?.color}
      diff={data?.diff}
    />
  )
}

const UsersChart1 = ({
  title,
  interval,
}: {
  title: string
  interval?: Interval
}) => {
  const API = useApi()

  const [data, setData] = useState<Props[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [localInterval, setLocalInterval] = useState<Interval>("month")

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localInterval])

  useEffect(() => {
    if (interval) setLocalInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [interval])

  const fetchData = async () => {
    try {
      setLoading(true)

      const response = await API({
        uri: `${ENDPOINTS.analyticsUsersChart}?interval=${localInterval}`,
      })

      let res: Props[] = []

      if (interval === "week") {
        res = DAYS.map((elem, index) => {
          return {
            key: elem,
            value:
              response?.data.find((item: any) => +item.label === index)
                ?.value ?? 0,
          }
        })
      } else if (interval === "month") {
        res = MONTHS.map((elem, index) => {
          return {
            key: elem,
            value:
              response?.data.find((item: any) => +item.label === index)
                ?.value ?? 0,
          }
        })
      } else {
        res = YEARS.map((elem) => {
          return {
            key: elem,
            value:
              response?.data.find((item: any) => +item.label === +elem)
                ?.value ?? 0,
          }
        })
      }

      setData(res)
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Box
        sx={{
          mb: 1,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Heading>{title}</Heading>
        {/* <ToggleButtons
          value={localInterval}
          onClick={({ value }: { value: Interval }) => {
            setLocalInterval(value)
          }}
          options={[
            { label: "Year", value: "year" },
            { label: "Month", value: "month" },
            { label: "Week", value: "week" },
          ]}
        /> */}
      </Box>
      <Chart variant="outlined">
        <LineChart data={data} loading={loading} />
      </Chart>
    </>
  )
}

const UsersChart2 = ({
  title,
  interval,
}: {
  title: string
  interval?: Interval
}) => {
  const API = useApi()

  const [data, setData] = useState<Props[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [localInterval, setLocalInterval] = useState<Interval>("month")

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localInterval])

  useEffect(() => {
    if (interval) setLocalInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [interval])

  const fetchData = async () => {
    try {
      setLoading(true)

      const response = await API({
        uri: `${ENDPOINTS.analyticsUsersChart}?interval=${localInterval}`,
      })

      let res: Props[] = []

      if (interval === "week") {
        res = DAYS.map((elem, index) => {
          return {
            key: elem,
            value:
              response?.data.find((item: any) => +item.label === index)
                ?.value ?? 0,
          }
        })
      } else if (interval === "month") {
        res = MONTHS.map((elem, index) => {
          return {
            key: elem,
            value:
              response?.data.find((item: any) => +item.label === index)
                ?.value ?? 0,
          }
        })
      } else {
        res = YEARS.map((elem) => {
          return {
            key: elem,
            value:
              response?.data.find((item: any) => +item.label === +elem)
                ?.value ?? 0,
          }
        })
      }

      setData(res)
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Box
        sx={{
          mb: 1,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Heading>{title}</Heading>
        {/* <ToggleButtons
          value={localInterval}
          onClick={({ value }: { value: Interval }) => {
            setLocalInterval(value)
          }}
          options={[
            { label: "Year", value: "year" },
            { label: "Month", value: "month" },
            { label: "Week", value: "week" },
          ]}
        /> */}
      </Box>
      <Chart variant="outlined">
        <BarChart data={data} loading={loading} />
      </Chart>
    </>
  )
}
