import React from "react"

import { Icon, Box, Typography } from "@mui/material"

import { Service } from "../types"

type Props = {
  section: Service
}

const styles = {
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "row",
    backgroundColor: "white",
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
      <Box sx={styles.cardIcon}>
        <Icon sx={{ fontSize: 50 }} color="primary">
          {section.icon}
        </Icon>
      </Box>
      <Box sx={styles.cardContent}>
        <Typography variant="h6" gutterBottom>
          {section.title}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          {section.description}
        </Typography>
      </Box>
    </Box>
  )
}
