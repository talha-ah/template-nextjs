import React from "react"

import { Box, Grid, Container, Typography } from "@mui/material"

import { Section } from "./Section"
import { Review, Header } from "../types"

type Props = {
  header: Header
  sections: Review[]
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
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  cardContent: {
    flexGrow: 1,
  },
}

export const Reviews = ({ header, sections }: Props) => {
  return (
    <Box sx={styles.root} id="testimonials">
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
            <Grid key={section.review} item xs={12} md={4}>
              <Section section={section} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}
