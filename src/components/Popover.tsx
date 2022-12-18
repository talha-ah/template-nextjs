import * as React from "react"
import { useState } from "react"

import { Box } from "@mui/material"
import { SxProps, Theme } from "@mui/material/styles"
import { Popover as MuiPopover } from "@mui/material"

import { useMaxWidth } from "@hooks/useMaxWidth"
import { useIsMobile } from "@hooks/useIsMobile"

interface Props {
  sx?: SxProps<Theme>
  popoverSx?: SxProps<Theme>
  trigger: (args: any) => void
  content: React.ReactNode | ((args: any) => React.ReactNode)
}

export const Popover = ({ sx, popoverSx, trigger, content }: Props) => {
  const { isMobile } = useIsMobile()
  const { maxWidth } = useMaxWidth()

  const [open, setOpen] = useState(false)
  const ref = React.useRef<HTMLDivElement>(null)

  const toggleOpen = () => setOpen(!open)

  return (
    <>
      {trigger({ toggleOpen, ref: ref })}

      <MuiPopover
        open={open}
        onClose={toggleOpen}
        anchorEl={ref.current}
        sx={{ mt: 1, ...popoverSx }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Box
          sx={{
            p: 2,
            ...(isMobile ? { width: maxWidth } : {}),
            ...sx,
          }}
        >
          {typeof content === "function"
            ? content({ onClose: toggleOpen })
            : content}
        </Box>
      </MuiPopover>
    </>
  )
}
