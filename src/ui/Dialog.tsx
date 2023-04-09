import * as React from "react"
import { useState } from "react"

import { IconButton } from "@mui/material"
import { DialogTitle } from "@mui/material"
import { Close } from "@mui/icons-material"
import { DialogContent } from "@mui/material"
import { Dialog as MuiDialog } from "@mui/material"
import { SxProps, Theme } from "@mui/material/styles"

import { Width } from "@utils/types"
import { useWindowResize } from "@hooks/useWindowResize"

interface DialogProps {
  title: string
  width?: Width
  sx?: SxProps<Theme>
  trigger: (args: any) => void
  content: (args: any) => React.ReactNode
}

const getMaxWidth = (theme: Theme, width: Width, windowWidth: number) => {
  if (theme.breakpoints.values[width] < windowWidth) {
    return theme.breakpoints.values[width]
  } else {
    // Shouldn't overflow when screen is smaller than the dialog
    return windowWidth - +theme.spacing(8).replace("px", "")
  }
}

export const Dialog = ({
  sx,
  title,
  trigger,
  content,
  width = "sm",
}: DialogProps) => {
  const [windowWidth] = useWindowResize()
  const [open, setOpen] = useState(false)

  const toggleOpen = () => setOpen(!open)

  return (
    <>
      {trigger({ toggleOpen })}
      <MuiDialog sx={sx} open={open} onClose={toggleOpen} maxWidth={width}>
        <DialogTitle id={`dialog-${title}`}>
          {title}{" "}
          <IconButton
            aria-label="close"
            onClick={toggleOpen}
            sx={(theme: Theme) => ({
              position: "absolute",
              top: theme.spacing(1.2),
              right: theme.spacing(2),
            })}
          >
            <Close />
          </IconButton>
        </DialogTitle>

        <DialogContent
          sx={(theme: Theme) => ({
            width: getMaxWidth(theme, width, windowWidth),
          })}
        >
          {typeof content === "function"
            ? content({ onClose: toggleOpen })
            : content}
        </DialogContent>
      </MuiDialog>
    </>
  )
}
