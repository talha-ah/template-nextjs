import React from "react"

import { Box, Grid, Container, Typography } from "@mui/material"

import { Section } from "./Section"
import { Service, Header } from "../types"

type Props = {
  header: Header
  sections: Service[]
}

const styles = {
  root: {
    padding: "8rem 0",
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
}

export const Services = ({ header, sections }: Props) => {
  return (
    <Box sx={styles.root} id="services">
      <Container maxWidth="lg">
        <Typography variant="h3" align="center" sx={styles.heading}>
          {header.title}
        </Typography>
        <Typography variant="subtitle1" align="center" sx={styles.subHeading}>
          {header.description}
        </Typography>

        <Box sx={styles.spacing} />

        <Grid container spacing={5}>
          {sections.map((section) => (
            <Grid key={section.title} item xs={12} md={4}>
              <Section section={section} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}
