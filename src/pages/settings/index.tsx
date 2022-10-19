import Head from "next/head"
import * as React from "react"

import { Box } from "@mui/material"
import { useTheme, Theme } from "@mui/material/styles"

import { Title } from "@components/Title"
import { APP_NAME } from "@utils/constants"
import { HeaderLayout } from "@layouts/Header"
import { UpdateProfile, UpdatePassword, SelectTheme } from "@forms/settings"

const Card = ({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) => {
  const theme = useTheme<Theme>()

  return (
    <Box sx={{ width: "100%", maxWidth: "sm", mb: 2 }}>
      <Title
        sx={{
          mb: 3,
          pb: 1,
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        {title}
      </Title>
      {children}
    </Box>
  )
}

export default function Settings() {
  return (
    <>
      <Head>
        <title>Settings - {APP_NAME}</title>
      </Head>

      <HeaderLayout>
        <Box
          sx={{
            pt: 4,
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Card title="Theme">
            <SelectTheme />
          </Card>

          <Card title="Profile">
            <UpdateProfile />
          </Card>

          <Card title="Password">
            <UpdatePassword />
          </Card>
        </Box>
      </HeaderLayout>
    </>
  )
}
