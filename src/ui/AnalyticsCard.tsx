import { Grid } from "@mui/material"
import { Chip } from "@mui/material"
import { Stack } from "@mui/material"
import { Paper } from "@mui/material"
import { Typography } from "@mui/material"
import { styled } from "@mui/material/styles"
import { TrendingUp } from "@mui/icons-material"
import { TrendingDown } from "@mui/icons-material"
import { Box, CircularProgress } from "@mui/material"

import { Color } from "@utils/types"
import { Heading } from "@ui/Title"
import { numberWithCommas } from "@utils/common"

const Card = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  color: theme.palette.text.secondary,
  width: "100%",
  height: "100%",
}))

export const AnalyticsCard = ({
  diff,
  color,
  title,
  count,
  isLoss,
  percentage,
}: {
  diff?: number
  color?: Color
  title?: string
  count?: string
  isLoss?: boolean
  percentage?: number
}) => (
  <Card variant="outlined">
    <Stack spacing={0.5}>
      <Typography variant="subtitle2">{title}</Typography>
      <Grid container alignItems="center">
        <Grid item>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h4" color="inherit">
              {numberWithCommas(count)}
            </Typography>
            {percentage ? (
              <Chip
                size="small"
                color={color}
                variant="outlined"
                sx={{ marginLeft: 1 }}
                label={`${percentage.toFixed(2)}%`}
                icon={
                  <>
                    {!isLoss && (
                      <TrendingUp
                        sx={{
                          pl: 0.5,
                          color: "inherit",
                        }}
                      />
                    )}
                    {isLoss && (
                      <TrendingDown
                        sx={{
                          pl: 0.5,
                          color: "inherit",
                        }}
                      />
                    )}
                  </>
                }
              />
            ) : (
              ""
            )}
            {diff ? (
              <Chip
                size="small"
                color={color}
                variant="outlined"
                sx={{ marginLeft: 1 }}
                label={`${isLoss ? "Less" : "Extra"}: ${numberWithCommas(
                  diff
                )}`}
              />
            ) : (
              ""
            )}
          </Box>
        </Grid>
      </Grid>
    </Stack>
  </Card>
)

export const AnalyticsCardSimple = ({
  title,
  count = 0,
  postfix = "",
  currency = "",
}: {
  title: string
  count?: number
  postfix?: string
  currency?: string
}) => (
  <Card variant="outlined">
    <Stack spacing={0.5}>
      <Typography
        variant="caption"
        fontWeight="bold"
        sx={{ textTransform: "uppercase" }}
      >
        {title}
      </Typography>
      <Grid container alignItems="center">
        <Grid item>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h6">
              {currency ? currency + " " : ""}
              {numberWithCommas(count)}
              {postfix ? " " + postfix : ""}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Stack>
  </Card>
)

export const Analytics = ({
  title,
  loading,
  children,
}: {
  title: string
  loading: boolean
  children: React.ReactNode
}) => {
  return (
    <Box>
      <Heading>{title}</Heading>
      <Box
        sx={{
          mt: 1,
          gap: 2,
          display: "flex",
          justifyContent: "center",
        }}
      >
        {loading ? <CircularProgress /> : children}
      </Box>
    </Box>
  )
}
