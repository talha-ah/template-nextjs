import * as React from "react"

import { ToggleButton } from "@mui/material"
import { ToggleButtonGroup } from "@mui/material"

import { Option } from "@utils/types"

export const ToggleButtons = ({
  value,
  options,
  onClick,
}: {
  value: string
  options: Option[]
  onClick: (arg: Option) => void
}) => {
  return (
    <ToggleButtonGroup
      size="small"
      value={value}
      exclusive={true}
      // onChange={handleChange}
    >
      {options.map((option: Option) => (
        <ToggleButton
          key={option.key}
          value={option.key}
          onClick={() => onClick(option)}
        >
          {option.value}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  )
}
