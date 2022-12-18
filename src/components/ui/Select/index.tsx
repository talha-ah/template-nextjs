import * as React from "react"

import { MenuItem } from "@mui/material"
import { InputLabel } from "@mui/material"
import { FormControl } from "@mui/material"
import { Select as MuiSelect } from "@mui/material"
import { SelectChangeEvent } from "@mui/material/Select"

type SelectOption = {
  key: string
  value: string
}

export const Select = ({
  id,
  name,
  size,
  value,
  label,
  required,
  onChange,
  placeholder,
  options = [],
  disabled = false,
  fullWidth = false,
  defaultValue = "",
}: {
  id?: string
  name?: string
  value?: string
  label?: string
  required?: boolean
  disabled?: boolean
  fullWidth?: boolean
  placeholder?: string
  defaultValue?: string
  size?: "medium" | "small"
  onChange?: (event: SelectChangeEvent) => void
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
      <MuiSelect
        id={id}
        name={name}
        value={value}
        label={label}
        required={required}
        onChange={onChange}
        defaultValue={defaultValue}
      >
        {placeholder && <MenuItem value={""}>{placeholder}</MenuItem>}
        {(typeof options === "function" ? options() : options).map((option) => (
          <MenuItem key={option.key} value={option.key}>
            {option.value}
          </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  )
}
