import * as React from "react"
import { useState } from "react"

import { SxProps, Theme } from "@mui/material/styles"
import { Menu as MuiMenu, MenuItem } from "@mui/material"

import { useMaxWidth } from "@hooks/useMaxWidth"
import { useIsMobile } from "@hooks/useIsMobile"

export interface Option {
  key: string
  value: string
  [key: string]: any
}

interface Props {
  sx?: SxProps<Theme>
  onClick: (args: any) => void
  trigger: (args: any) => void
  options: Option[]
}

export const Menu = ({ sx, trigger, options, onClick }: Props) => {
  const { isMobile } = useIsMobile()
  const { maxWidth } = useMaxWidth()

  const [open, setOpen] = useState(false)
  const ref = React.useRef<HTMLDivElement>(null)

  const toggleOpen = () => setOpen(!open)

  return (
    <>
      {trigger({ toggleOpen, ref: ref })}

      <MuiMenu
        keepMounted
        open={open}
        onClose={toggleOpen}
        anchorEl={ref.current}
        sx={{ mt: 1, ...(isMobile ? { width: maxWidth } : {}), ...sx }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {options.map((option, index) => (
          <MenuItem
            key={index}
            sx={{ gap: 2, display: "flex", alignItems: "center" }}
            onClick={() => {
              toggleOpen()
              onClick(option)
            }}
          >
            {option.icon && <option.icon fontSize="inherit" />}

            {option.value}
          </MenuItem>
        ))}
      </MuiMenu>
    </>
  )
}
