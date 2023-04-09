import * as React from "react"
import { useEffect, useState, forwardRef } from "react"

import { TextField, TextFieldProps } from "@mui/material"
import { Visibility, VisibilityOff } from "@mui/icons-material"

import { IconButton } from "@ui/IconButton"

// eslint-disable-next-line react/display-name
export const Input = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ children, ...props }, ref) => {
    const [show, setShow] = useState(true)

    useEffect(() => {
      if (props.type === "password") setShow(false)
    }, [props.type])

    const toggleShow = () => setShow(!show)

    return (
      <TextField
        ref={ref}
        variant="outlined"
        InputProps={{
          endAdornment: props.type === "password" && (
            <IconButton
              edge="end"
              onClick={toggleShow}
              onMouseDown={toggleShow}
              tooltip={show ? "Hide" : "Show"}
              aria-label="toggle password visibility"
            >
              {show ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          ),
        }}
        {...props}
        type={show ? "text" : "password"}
      >
        {children}
      </TextField>
    )
  }
)
