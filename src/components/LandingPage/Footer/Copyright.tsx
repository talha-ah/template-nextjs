import * as React from "react"

import { Box } from "@mui/material"

interface CopyrightProps {
  copyright: {
    name: string
    year: number
  }
}

const styles = {
  root: {
    height: "38px",
    display: "flex",
    color: "#777777",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#333333",
  },
}

export const Copyright = ({ copyright: { name, year } }: CopyrightProps) => {
  return (
    <Box sx={styles.root} id="copyright">
      Copyright © {name} {year}. All Rights reserved
    </Box>
  )
}
