import { forwardRef } from "react"

import { LoadingButton } from "@mui/lab"
import { Button as MuiButton } from "@mui/material"
import { ButtonProps as MuiButtonProps } from "@mui/material/Button"

import { IconButton } from "@ui/IconButton"
import { useIsMobile } from "@hooks/useIsMobile"

interface ButtonProps extends MuiButtonProps {
  to?: string
  loading?: boolean
  responsive?: boolean
  component?: React.ElementType
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ loading, startIcon, endIcon, responsive, ...props }, ref) => {
    const { isMobile } = useIsMobile()

    const defaultVariant = "contained"

    if (responsive && isMobile && (startIcon || endIcon)) {
      return (
        <IconButton
          ref={ref}
          size="small"
          tooltip={props.children as string}
          {...props}
        >
          {startIcon}
          {endIcon}
        </IconButton>
      )
    } else {
      if (loading) {
        return (
          <LoadingButton
            ref={ref}
            endIcon={endIcon}
            loading={loading}
            startIcon={startIcon}
            variant={defaultVariant}
            {...props}
          >
            {props.children}
          </LoadingButton>
        )
      }

      return (
        <MuiButton
          ref={ref}
          endIcon={endIcon}
          startIcon={startIcon}
          variant={defaultVariant}
          {...props}
        >
          {props.children}
        </MuiButton>
      )
    }
  }
)

Button.displayName = "Button"
