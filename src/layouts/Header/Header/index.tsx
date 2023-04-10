import React from "react"
import { useMemo } from "react"
import { useRouter } from "next/router"

import { Box } from "@mui/material"
import { Container } from "@mui/material"
import { Theme } from "@mui/material/styles"

import { Link } from "@ui/Link"
import { Logo } from "@ui/Logo"
import { Button } from "@ui/Button"
import { Width } from "@utils/types"
import { UserMenu } from "@ui/UserMenu"
import { SelectTheme } from "@forms/profile"
import { useAppContext } from "@contexts/index"
import { useIsMobile } from "@hooks/useIsMobile"
import { APP_BAR_HEIGHT } from "@utils/constants"

export const Header = ({ maxWidth }: { maxWidth: Width }) => {
  const { state } = useAppContext()

  return (
    <Box
      sx={(theme: Theme) => ({
        width: "100%",
        height: `${APP_BAR_HEIGHT}px`,
        borderBottom: `1px solid ${theme.palette.divider}`,
      })}
    >
      {state.auth.isAuth ? (
        <AuthMenu maxWidth={maxWidth} />
      ) : (
        <UnAuthMenu maxWidth={maxWidth} />
      )}
    </Box>
  )
}

type Page = {
  path: string
  title: string
  exact?: boolean
}

const WebPages = ({
  pages,
  showActive = false,
}: {
  pages: Page[]
  showActive?: boolean
}) => {
  const router = useRouter()

  const isSelected = (page: Page) => {
    return page.path
      ? page.exact
        ? router.asPath === page.path
        : router.asPath.startsWith(page.path)
      : false
  }

  return (
    <Box
      sx={{
        gap: 4,
        display: { xs: "none", sm: "flex" },
      }}
    >
      {pages.map((page) => (
        <Link
          to={page.path}
          key={page.path}
          color={showActive && isSelected(page) ? "primary" : "inherit"}
        >
          {page.title}
        </Link>
      ))}
    </Box>
  )
}

const AuthMenu = ({ maxWidth }: { maxWidth: Width }) => {
  const pages: Page[] = useMemo(
    () => [
      {
        path: "/",
        exact: true,
        title: "Home",
      },
      {
        title: "Sales",
        path: "/sales",
      },
      {
        title: "Rents",
        path: "/rents",
      },
    ],
    []
  )

  return (
    <Container
      component="main"
      maxWidth={maxWidth}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Logo />

      <WebPages pages={pages} showActive={true} />

      <Box sx={{ gap: 2, display: "flex" }}>
        <SelectTheme view="icons" />

        <UserMenu />
      </Box>
    </Container>
  )
}

const UnAuthMenu = ({ maxWidth }: { maxWidth: Width }) => {
  const { isMobile } = useIsMobile()

  const pages: Page[] = useMemo(
    () => [
      {
        path: "/",
        exact: true,
        title: "Home",
      },
      {
        title: "How it works",
        path: "/how-it-works",
      },
      {
        title: "Strategy",
        path: "/strategy",
      },
      {
        title: "Team",
        path: "/team",
      },
      {
        title: "Blog",
        path: "/blog",
      },
    ],
    []
  )

  return (
    <Container
      component="main"
      maxWidth={maxWidth}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Logo />

      <WebPages pages={pages} />

      <Box sx={{ gap: 2, display: "flex" }}>
        <SelectTheme view="icons" />

        <Button to="/auth/login" variant="outlined">
          Login
        </Button>
        {!isMobile && (
          <Button to="/auth/register" variant="contained">
            Register
          </Button>
        )}
      </Box>
    </Container>
  )
}
