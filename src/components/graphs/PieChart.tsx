import {
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
  PieChart as RPieChart,
} from "recharts"

import { Paper } from "@mui/material"
import { Typography } from "@mui/material"
import { useTheme, Theme } from "@mui/material/styles"

import { ChartProps } from "@utils/types"

const CustomLabel = (props: any) => {
  const { cx, cy, midAngle, innerRadius, outerRadius, percent } = props
  const RADIAN = Math.PI / 180
  // eslint-disable-next-line
  const radius = 25 + innerRadius + (outerRadius - innerRadius)
  // eslint-disable-next-line
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  // eslint-disable-next-line
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text
      x={x}
      y={y}
      fill="white"
      dominantBaseline="central"
      textAnchor={x > cx ? "start" : "end"}
    >
      {`${(percent * 100).toFixed(0)}%`}
      {/* {`${props.tooltipPayload[0].payload.key}`} */}
    </text>
  )
}

const CustomTooltip = (props: any) => {
  const { active, payload } = props

  if (active && payload && payload.length) {
    return (
      <Paper variant="outlined" sx={{ py: 0.5, px: 1 }}>
        <Typography>{`${payload?.[0]?.payload?.key} : ${payload[0].value}`}</Typography>
      </Paper>
    )
  }

  return null
}

const CustomLegend = (props: any) => {
  const { payload } = props

  return (
    <ul
      style={{
        gap: 2,
        display: "flex",
        listStyle: "none",
        alignItems: "center",
      }}
    >
      {payload.map((entry: any, index: number) => (
        <li
          key={`item-${index}`}
          style={{ color: entry.color, textDecoration: "none" }}
        >
          {entry.payload.key}: {entry.value}
        </li>
      ))}
    </ul>
  )
}

const getThemeColors = (theme: Theme) => {
  return [
    theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.error.main,
    theme.palette.warning.main,
    theme.palette.success.main,
    theme.palette.info.main,
    theme.palette.grey[100],
  ]
}

export const PieChart = ({
  loading,
  data = [],
}: {
  loading?: boolean
  data: ChartProps[]
}) => {
  const theme = useTheme()
  const colors = getThemeColors(theme)

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RPieChart>
        <Tooltip content={<CustomTooltip />} />
        <Pie
          cy="50%"
          cx="50%"
          data={data}
          dataKey="value"
          innerRadius={90}
          labelLine={false}
          // outerRadius={60}
          // label={CustomLabel}
          fill={theme.palette.primary.dark}
          label={(entry) => `${(entry.percent * 100).toFixed(0)}%`}
        >
          {data.map((_, index) => {
            return <Cell key={`cell-${index}`} fill={colors[index]} />
          })}
        </Pie>
        {/* <Legend content={CustomLegend} /> */}
      </RPieChart>
    </ResponsiveContainer>
  )
}

// const data = [
//   { key: "Group A", value: 400 },
//   { key: "Group B", value: 300 },
//   { key: "Group C", value: 300 },
//   { key: "Group D", value: 200 },
// ]
