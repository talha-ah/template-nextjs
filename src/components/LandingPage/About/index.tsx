/* eslint-disable @next/next/no-img-element */

import React from "react"

import { Box, Grid, Container, Typography } from "@mui/material"

import { Section } from "./Section"
import { About as AboutType, Header } from "../types"

type Props = {
  header: Header
  sections: AboutType[]
}

const styles = {
  root: {
    padding: "8rem 0",
    backgroundColor: "#fff",
  },
  heading: {
    color: "#232323",
    fontWeight: "bold",
    marginBottom: "1rem",
  },
  subHeading: {
    color: "#666",
  },
  spacing: {
    marginBottom: "3rem",
  },
  sections: {
    display: "flex",
  },
  imageContainer: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "80%",
  },
}

export const About = ({ header, sections }: Props) => {
  return (
    <Box sx={styles.root} id="about">
      <Container maxWidth="lg">
        <Typography variant="h3" align="center" sx={styles.heading}>
          {header.title}
        </Typography>

        <Box sx={styles.spacing} />

        <Box sx={styles.sections}>
          <Grid container spacing={2}>
            {sections.map((section) => (
              <Grid key={section.title} item xs={12} md={6}>
                <Section section={section} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  )
}
