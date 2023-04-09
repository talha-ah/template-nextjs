import * as React from "react"
import Image from "next/image"

import { Box, Grid, Typography, Container } from "@mui/material"

import { Post } from "../types"

interface Props {
  post: Post
}

const styles = {
  root: (post: any) => ({
    color: "#fff",
    height: "442px",
    display: "flex",
    alignItems: "center",
    position: "relative",
    backgroundSize: "cover",
    backgroundColor: "grey.800",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundImage: `url(${post.image})`,
  }),
  image: {
    display: "none",
  },
  box: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: "absolute",
    backgroundColor: "rgba(0,0,0,.3)",
  },
  item: {
    position: "relative",
  },
}

export const Jumbotron = (props: Props) => {
  const { post } = props

  return (
    <Box sx={styles.root(post)} id="jumbotron">
      {/* Increase the priority of the hero background image */}
      <Image fill src={post.image} alt={post.imageText} style={styles.image} />

      {/* darkify the image */}
      <Box sx={styles.box} />

      <Container maxWidth="xl">
        <Grid container>
          <Grid item md={6}>
            <Box sx={styles.item}>
              <Typography variant="h4" gutterBottom color="inherit">
                {post.title}
              </Typography>
              <Typography variant="body2" color="inherit">
                {post.description}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
