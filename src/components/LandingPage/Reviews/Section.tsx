import React from "react"

import { Box, Typography } from "@mui/material"

import { Review } from "../types"

type Props = {
  section: Review
}

const styles = {
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#fff",
    justifyContent: "space-between",
  },
  cardIcon: {
    display: "flex",
    paddingTop: "1rem",
    paddingLeft: "1rem",
    alignItems: "flex-start",
    justifyContent: "center",

    "& span": {
      fontSize: 50,
    },
  },
  cardContent: {
    flexGrow: 1,
    padding: "1rem",
  },
}

export const Section = ({ section }: Props) => {
  return (
    <Box sx={styles.card}>
      <Box sx={styles.cardContent}>
        <Typography variant="body1" gutterBottom>
          &quot;{section.review}&quot;
        </Typography>
        <Typography variant="subtitle1" color="primary">
          - {section.customer}
        </Typography>
      </Box>
    </Box>
  )
}
