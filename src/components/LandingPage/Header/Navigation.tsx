import * as React from "react"

import { Box } from "@mui/material"
import { Typography, Container } from "@mui/material"

import { Link } from "@ui/Link"
import { useAppContext } from "@contexts/index"

import { Link as LinkType } from "../types"

export interface Props {
  logo: string
  links: ReadonlyArray<LinkType>
}

const styles = {
  root: {
    py: 4,
  },
  bar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  spacing: {
    flex: 1,
  },
  link: {
    px: 1.5,
    color: "#222",
    textDecoration: "none",
    textTransform: "uppercase" as const,
    transition: "color 0.2s ease-in-out",

    "&:hover": {
      color: "primary.main",
    },
  },
}

export const Navigation = ({ links, logo }: Props) => {
  const { state } = useAppContext()

  return (
    <Box sx={styles.root} id="header">
      <Container maxWidth="xl">
        <Box sx={styles.bar}>
          <Typography
            noWrap
            variant="h5"
            color="black"
            align="center"
            component="h2"
          >
            {logo}
          </Typography>

          <Box sx={styles.spacing} />

          {links.map((section) => (
            <Link
              noWrap
              variant="body2"
              sx={styles.link}
              to={section.url}
              key={section.title}
            >
              {section.title}
            </Link>
          ))}

          {state.auth.isAuth ? (
            <Link noWrap to={"/app"} variant="body2" sx={styles.link}>
              Dashboard
            </Link>
          ) : (
            <Link noWrap variant="body2" sx={styles.link} to={"/auth/login"}>
              Get Started
            </Link>
          )}
        </Box>
      </Container>
    </Box>
  )
}
