import * as React from "react"
import { forwardRef } from "react"

import { Tooltip, TooltipProps } from "@mui/material"
import { CircularProgress } from "@mui/material"
import { IconButton as MuiIconButton } from "@mui/material"
import { ButtonProps as MuiButtonProps } from "@mui/material/Button"

interface TooltipPropsExtended
  extends Omit<TooltipProps, "title" | "children"> {}

interface ButtonProps extends MuiButtonProps {
  to?: string
  tooltip?: string
  loading?: boolean
  component?: React.ElementType
  edge?: "start" | "end" | false
  tooltipParams?: TooltipPropsExtended
}

// eslint-disable-next-line react/display-name
export const IconButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ loading, tooltip, tooltipParams, ...props }, ref) => {
    if (tooltip) {
      return (
        <Tooltip title={tooltip} {...tooltipParams}>
          <MuiIconButton
            ref={ref}
            disabled={loading}
            variant="contained"
            {...props}
          >
            {loading ? <CircularProgress size={16} /> : props.children}
          </MuiIconButton>
        </Tooltip>
      )
    }

    return (
      <MuiIconButton
        ref={ref}
        disabled={loading}
        variant="contained"
        {...props}
      >
        {loading ? <CircularProgress size={16} /> : props.children}
      </MuiIconButton>
    )
  }
)
