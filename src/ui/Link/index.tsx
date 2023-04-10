import * as React from "react"
import NextLink, { LinkProps } from "next/link"

import { styled } from "@mui/material/styles"
import { Link as MuiLink } from "@mui/material"

// Add support for the sx prop for consistency with the other branches.
const Anchor = styled("a")({})

interface NextLinkProps
  extends Omit<LinkProps, "href" | "as" | "onClick" | "onMouseEnter"> {
  to: LinkProps["href"]
  linkAs?: LinkProps["as"]
}

export const LinkBehaviour = React.forwardRef<HTMLAnchorElement, NextLinkProps>(
  function LinkBehaviour(props, ref) {
    const { to, linkAs, replace, scroll, shallow, prefetch, locale, ...other } =
      props

    return (
      <NextLink
        passHref
        href={to}
        as={linkAs}
        scroll={scroll}
        locale={locale}
        replace={replace}
        shallow={shallow}
        prefetch={prefetch}
      >
        <Anchor ref={ref} {...other} />
      </NextLink>
    )
  }
)

export const Link = ({
  to,
  sx,
  children,
  underline,
  ...other
}: {
  to: string
  underline?: boolean
  sx?: React.CSSProperties
  children: React.ReactNode
  [key: string]: any
}) => {
  return to ? (
    <NextLink href={to} passHref>
      <MuiLink
        color="inherit"
        variant="body2"
        underline={underline ? "always" : "none"}
        sx={{
          "&:hover": {
            transition: "0.3s",
            color: "primary.main",
            textDecoration: "none",
          },
          ...sx,
        }}
        {...other}
      >
        {children}
      </MuiLink>
    </NextLink>
  ) : (
    <>{children}</>
  )
}
