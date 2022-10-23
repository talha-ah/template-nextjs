import Head from "next/head"

import { Box } from "@mui/material"
import { Card } from "@mui/material"
import { Container } from "@mui/material"
import { Typography } from "@mui/material"
import { CardContent } from "@mui/material"
import { CardActionArea } from "@mui/material"
import { AnalyticsOutlined } from "@mui/icons-material"

import { APP_NAME } from "@utils/constants"
import { HeaderLayout } from "@layouts/Header"
import { NextLinkComposed } from "@components/Link"

const sections = [
  {
    title: "Dashboard",
    color: "primary.main",
    href: "/app/dashboard",
    icon: <AnalyticsOutlined sx={{ fontSize: 60 }} color="action" />,
  },
]

export default function Main() {
  return (
    <>
      <Head>
        <title>{APP_NAME}</title>
      </Head>

      <HeaderLayout>
        <Box
          sx={{
            flex: 1,
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Container
            maxWidth="md"
            sx={{
              gap: 6,
              display: "flex",
              flexFlow: "row nowrap",
              justifyContent: "space-around",
              "> div": {
                flexBasis: "50%",
              },
            }}
          >
            {sections.map((section: any, i: number) => (
              <Section key={i} section={section} />
            ))}
          </Container>
        </Box>
      </HeaderLayout>
    </>
  )
}

const Section = ({ section }: { section: any }) => {
  return (
    <Card sx={{ width: "100%" }} variant="outlined">
      <CardActionArea {...{ component: NextLinkComposed, to: section.href }}>
        <Box
          sx={{
            height: 100,
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {section.icon}
        </Box>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              gutterBottom
              variant="h5"
              color="text.primary"
              sx={{ textDecoration: "none" }}
            >
              {section.title}
            </Typography>
          </Box>
          {/* <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography> */}
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
