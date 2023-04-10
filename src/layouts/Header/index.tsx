import React from "react"

import { Container } from "@mui/material"
import { styled } from "@mui/material/styles"

import { Header } from "./Header"
import { Width } from "@utils/types"
import { ActionHeader } from "@ui/ActionHeader"

const Main = styled("main")(({ theme }) => ({
  padding: 0,
  width: "100vw",
  height: "100vh",
  display: "flex",
  overflow: "hidden",
  flexDirection: "column",
  backgroundColor: theme.palette.background.default,
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}))

const Content = styled("div")(({ theme }) => ({
  height: "100%",
  overflow: "auto",
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  /* width */
  "&::-webkit-scrollbar": {
    width: 5,
    backgroundColor: "transparent",
  },
  /* Track */
  "&::-webkit-scrollbar-track": {
    backgroundColor: "transparent",
  },
  /* Thumb */
  "&::-webkit-scrollbar-thumb": {
    borderRadius: 8,
    backgroundColor: "#babac0",
  },
  /* Thumb:hover */
  "&::-webkit-scrollbar-thumb:hover": {
    backgroundColor: "#babac0",
  },
  /* Button (top and bottom of the scrollbar) */
  "&::-webkit-scrollbar-button": {
    display: "none",
  },
}))

export const HeaderLayout = ({
  title,
  actions,
  children,
  withBackButton,
}: {
  title?: string
  withBackButton?: boolean
  actions?: React.ReactNode
  children?: React.ReactNode
}) => {
  const maxWidth: Width = "xl"

  return (
    <Main>
      <Header maxWidth={maxWidth} />

      <Content>
        <Container
          maxWidth={maxWidth}
          sx={(theme) => ({ height: "100%", padding: theme.spacing(2) })}
        >
          {/* Page Header */}
          {title && (
            <ActionHeader
              title={title}
              sx={{ borderBottom: "none" }}
              withBackButton={withBackButton}
            >
              {actions}
            </ActionHeader>
          )}
          {children}
        </Container>
      </Content>
    </Main>
  )
}
