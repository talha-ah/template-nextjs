import * as React from "react"
import { useState } from "react"

import { DialogTitle } from "@mui/material"
import { DialogContent } from "@mui/material"
import { Dialog as MuiDialog } from "@mui/material"
import { SxProps, Theme } from "@mui/material/styles"

import { useWindowResize } from "@hooks/useWindowResize"

interface DialogProps {
  title: string
  sx?: SxProps<Theme>
  onClose?: () => void
  trigger: (args: any) => void
  content: (args: any) => React.ReactNode
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl"
}

export const Dialog = ({
  sx,
  title,
  onClose,
  trigger,
  content,
  maxWidth,
}: DialogProps) => {
  const [width] = useWindowResize()
  const [open, setOpen] = useState(false)

  const toggleOpen = () => {
    setOpen(!open)
    if (open && onClose) {
      onClose()
    }
  }

  return (
    <>
      {trigger({ toggleOpen })}
      <MuiDialog
        sx={sx}
        open={open}
        onClose={toggleOpen}
        maxWidth={maxWidth || "xs"}
      >
        <DialogTitle id={`dialog-${title}`}>{title}</DialogTitle>

        <DialogContent
          // Shouldn't overflow when screen is small
          sx={(theme: Theme) => ({
            width:
              theme.breakpoints.values.xs > width
                ? width - +theme.spacing(8).replace("px", "")
                : "auto",
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
