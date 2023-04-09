import React from "react"

import { Send } from "@mui/icons-material"
import { Button, TextField } from "@mui/material"
import { Box, Grid, Container, Typography } from "@mui/material"

import { Header } from "../types"

export interface Props {
  header: Header
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
  formWrapper: {
    display: "flex",
    justifyContent: "center",
  },
  form: {
    maxWidth: 630,
  },
}

export const ContactUs = ({ header }: Props) => {
  return (
    <Box sx={styles.root} id="contact">
      <Container maxWidth="lg">
        <Typography variant="h3" align="center" sx={styles.heading}>
          {header.title}
        </Typography>
        <Typography align="center" variant="subtitle1" sx={styles.subHeading}>
          {header.description}
        </Typography>

        <Box sx={styles.spacing} />

        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Box sx={styles.formWrapper}>
              <form style={styles.form}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="name"
                      name="name"
                      label="Name"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      name="email"
                      label="Email"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="message"
                      name="message"
                      label="Message"
                      multiline
                      rows={4}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      color="primary"
                      variant="contained"
                      startIcon={<Send />}
                    >
                      Send Message
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
