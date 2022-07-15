import React from "react"
import Head from "next/head"
import type { NextPage } from "next"

import Box from "@mui/material/Box"
import AppBar from "@mui/material/AppBar"
import Button from "@mui/material/Button"
import Toolbar from "@mui/material/Toolbar"
import Container from "@mui/material/Container"
import { useTheme } from "@mui/material/styles"
import Typography from "@mui/material/Typography"
import { useAppContext } from "@contexts/index"

import { Logo } from "@components/Logo"
import { Title } from "@components/Title"
import { UserMenu } from "@components/UserMenu"
import { NextLinkComposed } from "@components/Link"

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Template</title>
        <meta name="description" content="Template" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Content />
    </>
  )
}

export default Home

function Content() {
  const theme = useTheme()

  const { state } = useAppContext()

  return (
    <React.Fragment>
      <AppBar
        elevation={0}
        color="inherit"
        position="static"
        sx={{
          zIndex: theme.zIndex.drawer + 1,
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
          transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        <Container maxWidth="xl" component="main">
          <Toolbar disableGutters sx={{ flexWrap: "wrap" }}>
            <Logo />
            <Box sx={{ flex: 1 }} />
            {state.auth.user ? (
              <UserMenu />
            ) : (
              <>
                <Button
                  to="/auth/register"
                  variant="contained"
                  component={NextLinkComposed}
                >
                  Register
                </Button>
                <Button
                  to="/auth/login"
                  variant="outlined"
                  component={NextLinkComposed}
                  sx={{ ml: 2 }}
                >
                  Login
                </Button>
              </>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      {/* Hero unit */}
      <Container maxWidth="xl" component="main" sx={{ pt: 8, pb: 6 }}>
        <Title>Lorem Ipsum</Title>
        <Typography
          component="p"
          align="center"
          color="text.secondary"
          sx={{
            xs: { fontSize: 10 },
            sm: { fontSize: 14 },
            lg: { fontSize: 22 },
          }}
        >
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industrys standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </Typography>
      </Container>
    </React.Fragment>
  )
}
