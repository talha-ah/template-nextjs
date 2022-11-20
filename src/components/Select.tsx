import * as React from "react"

import { MenuItem } from "@mui/material"
import { InputLabel } from "@mui/material"
import { FormControl } from "@mui/material"
import { Select as MuiSelect } from "@mui/material"
import { SelectChangeEvent } from "@mui/material/Select"

type SelectOption = {
  value: string
  label: string
}

export const Select = ({
  value,
  label,
  onChange,
  placeholder,
  options = [],
  size = "small",
  disabled = false,
  fullWidth = false,
}: {
  value: string
  label?: string
  disabled?: boolean
  fullWidth?: boolean
  placeholder?: string
  size?: "medium" | "small"
  onChange: (event: SelectChangeEvent) => void
  options: SelectOption[] | (() => SelectOption[])
}) => {
  return (
    <FormControl
      size={size}
      disabled={disabled}
      fullWidth={fullWidth}
      sx={{ minWidth: 200 }}
    >
      <InputLabel>{label}</InputLabel>
      <MuiSelect value={value} label={label} onChange={onChange}>
        {placeholder && <MenuItem value={""}>{placeholder}</MenuItem>}
        {(typeof options === "function" ? options() : options).map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  )
}
