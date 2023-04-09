import * as React from "react"

import { Box } from "@mui/material"
import { Container, Typography } from "@mui/material"

import { Link } from "@ui/Link"

import { getAvailability, getIcon } from "../utils"
import { Availability, Social, Contact as ContactType } from "../types"

export interface Props {
  socials: Social[]
  contact: ContactType
  availability: Availability
}

const styles = {
  root: {
    height: "52px",
    display: "flex",
    alignItems: "center",
    backgroundColor: "#232323",
  },
  content: {
    color: "#fff",
    display: "flex",
    justifyContent: "space-between",
  },
  social: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    "& svg": {
      color: "#fff",
      fontSize: "20px",
      cursor: "pointer",
      marginRight: "8px",
      transition: "all 0.3s ease-in-out",

      "&:hover": {
        color: "primary.main",
      },
    },
  },
  contact: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    "& svg": {
      color: "#fff",
      fontSize: "18px",
      marginLeft: "12px",
      marginRight: "4px",
    },

    "& p": {
      color: "#fff",
      fontSize: "14px",
      transition: "all 0.3s ease-in-out",
    },

    "& a": {
      color: "#fff",
      fontSize: "14px",
      cursor: "pointer",
      transition: "all 0.3s ease-in-out",

      "&:hover": {
        color: "primary.main",
      },
    },
  },
}

export const Contact = (props: Props) => {
  const { availability, contact, socials } = props

  return (
    <Box sx={styles.root} id="header-top">
      <Container maxWidth="xl">
        <Box sx={styles.content}>
          <Box sx={styles.social}>
            {socials.map((social) => (
              <Link key={social.name} variant="body2" to={social.url}>
                {getIcon(social.name)}
              </Link>
            ))}
          </Box>
          <Box sx={styles.contact}>
            {getIcon("Phone")}{" "}
            <Link noWrap align="center" to={`tel:${contact.phone}`}>
              {contact.phone}
            </Link>
            {getIcon("Email")}{" "}
            <Link noWrap align="center" to={`mailto:${contact.email}`}>
              {contact.email}
            </Link>
            {getIcon("AccessTime")}{" "}
            <Typography noWrap align="center">
              {getAvailability(availability)}
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
