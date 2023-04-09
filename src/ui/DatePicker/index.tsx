import React from "react"

import { TextField } from "@mui/material"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { DatePickerProps } from "@mui/x-date-pickers/DatePicker"
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker"
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"

import { useIsMobile } from "@hooks/useIsMobile"

interface DatePickerPropsE
  extends Omit<DatePickerProps<Date, Date>, "renderInput"> {
  id?: string
  name?: string
  required?: boolean
  fullWidth?: boolean
}

export const DatePicker = ({
  id,
  name,
  required,
  fullWidth,
  inputFormat = "MM/DD/YYYY",
  ...props
}: DatePickerPropsE) => {
  const { isMobile } = useIsMobile()

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {isMobile ? (
        <MobileDatePicker
          {...props}
          inputFormat={inputFormat}
          renderInput={(params) => (
            <TextField
              id={id}
              name={name}
              required={required}
              fullWidth={fullWidth}
              {...params}
            />
          )}
        />
      ) : (
        <DesktopDatePicker
          {...props}
          inputFormat={inputFormat}
          renderInput={(params) => (
            <TextField
              id={id}
              name={name}
              disabled={true}
              required={required}
              fullWidth={fullWidth}
              {...params}
            />
          )}
        />
      )}
    </LocalizationProvider>
  )
}
