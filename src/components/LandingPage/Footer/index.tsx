import * as React from "react"

import { Box, Container, Grid, Typography } from "@mui/material"

import { Link } from "@ui/Link"

import { getIcon } from "../utils"
import { Copyright } from "./Copyright"
import { Social, Service, Contact } from "../types"
import { Availability, Link as LinkType } from "../types"

interface FooterProps {
  copyright: {
    name: string
    year: number
  }
  footer: {
    about: string
    contact: Contact
    links: LinkType[]
    socials: Social[]
    services: Service[]
    availability: Availability
  }
}

const styles = {
  root: {
    py: "80px",
    backgroundColor: "#232323",
  },
  heading: {
    color: "white",
    fontWeight: "bold",
    marginBottom: "0.8rem",
    textDecoration: "none",
    textTransform: "uppercase",
  },
  subHeading: {
    color: "#777",
    fontSize: "13px",
    textDecoration: "none",
  },
  social: {
    display: "flex",
    marginTop: "1rem",
    alignItems: "center",

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
  linkItem: {
    color: "#777",
    display: "block",
    fontSize: "14px",
    cursor: "pointer",
    marginTop: "0.4rem",
    transition: "all 0.3s ease-in-out",

    "&:hover": {
      color: "primary.main",
    },
  },
  contact: {
    display: "flex",
    flexDirection: "column",
  },
  contactItem: {
    color: "#fff",
    display: "flex",
    fontSize: "14px",
    marginTop: "0.6rem",
    flexDirection: "row",
    alignItems: "center",

    "& svg": {
      fontSize: "14px",
      marginRight: "6px",
    },

    "& p,span": {
      color: "#777",
      fontSize: "14px",
      marginLeft: "6px",
      transition: "all 0.3s ease-in-out",
    },

    "& a": {
      color: "#777",
      fontSize: "14px",
      marginLeft: "6px",
      cursor: "pointer",
      transition: "all 0.3s ease-in-out",

      "&:hover": {
        color: "primary.main",
      },
    },
  },
}

export const Footer = ({ copyright, footer }: FooterProps) => {
  return (
    <>
      <Box component="footer" sx={styles.root} id="footer">
        <Container maxWidth="lg">
          <Grid container spacing={2}>
            {/* About Us */}
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="body1" sx={styles.heading}>
                About Us
              </Typography>
              <Typography variant="caption" sx={styles.subHeading}>
                {footer.about}
              </Typography>
              <Box sx={styles.social}>
                {footer.socials.map((social) => (
                  <Link key={social.name} variant="body2" to={social.url}>
                    {getIcon(social.name)}
                  </Link>
                ))}
              </Box>
            </Grid>

            {/* Quick Links */}
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="body1" sx={styles.heading}>
                Quick Links
              </Typography>

              {footer.links.map((item) => (
                <Link
                  to={item.url}
                  key={item.title}
                  variant="caption"
                  sx={styles.linkItem}
                >
                  &gt; {item.title}
                </Link>
              ))}
            </Grid>

            {/* Our Services */}
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="body1" sx={styles.heading}>
                Our Services
              </Typography>

              {footer.services.map((item) => (
                <Link
                  to={item.url}
                  key={item.title}
                  variant="caption"
                  sx={styles.linkItem}
                >
                  &gt; {item.title}
                </Link>
              ))}
            </Grid>

            {/* Info */}
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="body1" sx={styles.heading}>
                Info
              </Typography>
              <Typography variant="caption" sx={styles.subHeading}>
                You may contact us during working timing
              </Typography>

              <Box sx={styles.contact}>
                <Typography sx={styles.contactItem}>
                  {getIcon("Phone")} Tel:{" "}
                  <Link noWrap to={`tel:${footer.contact.phone}`}>
                    {footer.contact.phone}
                  </Link>
                </Typography>

                <Typography sx={styles.contactItem}>
                  {getIcon("Email")} Email:
                  <Link noWrap to={`mailto:${footer.contact.email}`}>
                    {footer.contact.email}
                  </Link>
                </Typography>

                <Typography sx={styles.contactItem}>
                  {getIcon("AccessTime")} Working Hours:{" "}
                  <span>
                    {footer.availability.time.start +
                      " - " +
                      footer.availability.time.end}
                  </span>
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Copyright copyright={copyright} />
    </>
  )
}
