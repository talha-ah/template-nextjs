import * as React from "react"
import { useState } from "react"

import { ListItemIcon } from "@mui/material"
import { ListItemText } from "@mui/material"
import { SxProps, Theme } from "@mui/material/styles"
import { Menu as MuiMenu, MenuItem } from "@mui/material"

import { DRAWER_WIDTH } from "@utils/constants"
import { useMaxWidth } from "@hooks/useMaxWidth"
import { useIsMobile } from "@hooks/useIsMobile"

export interface Option {
  key: string
  value: string
  [key: string]: any
}

interface Props {
  options: Option[]
  selected?: string
  sx?: SxProps<Theme>
  position?: "bottom" | "top"
  onClick: (args: any) => void
  trigger: (args: any) => void
}

export const Menu = ({
  sx,
  trigger,
  options,
  onClick,
  position,
  selected,
}: Props) => {
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
        anchorOrigin={
          position === "top"
            ? { vertical: "top", horizontal: "center" }
            : {
                vertical: "bottom",
                horizontal: "right",
              }
        }
        transformOrigin={
          position === "top"
            ? { vertical: "bottom", horizontal: "center" }
            : {
                vertical: "top",
                horizontal: "right",
              }
        }
        sx={(theme: Theme) => ({
          ...(isMobile ? { width: maxWidth } : {}),
          "& .MuiMenu-paper": {
            mt: position === "top" ? -1 : 1,
            width: DRAWER_WIDTH - +theme.spacing(4).replace("px", ""),
          },
          ...(sx as any),
        })}
      >
        {options.map((option, index) => (
          <MenuItem
            key={index}
            selected={selected === option.key}
            onClick={() => {
              toggleOpen()
              onClick(option)
            }}
          >
            {option.icon && (
              <ListItemIcon>
                <option.icon {...option} />
              </ListItemIcon>
            )}

            <ListItemText color={option.color} primary={option.value} />
          </MenuItem>
        ))}
      </MuiMenu>
    </>
  )
}
