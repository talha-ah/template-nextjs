import * as React from "react"

import { Search } from "@mui/icons-material"
import { TextField, InputProps } from "@mui/material"

import { useDebounce } from "@hooks/useDebounce"
import { useIsomorphicLayoutEffect } from "@hooks/useIsomorphicLayoutEffect"

export interface SearchBarProps extends Omit<InputProps, "onChange"> {
  value: string
  onChange: (value: string) => void
}

export const SearchBar = ({
  id,
  name,
  onChange,
  value = "",
  size = "small",
  placeholder = "Search",
}: SearchBarProps) => {
  const [search, setSearch] = React.useState<string>(value)
  const debouncedSearch = useDebounce(search, 500)

  useIsomorphicLayoutEffect(() => {
    onChange && onChange(debouncedSearch)
  }, [debouncedSearch])

  useIsomorphicLayoutEffect(() => {
    setSearch(value)
  }, [value])

  return (
    <TextField
      id={id}
      name={name}
      size={size}
      value={search}
      placeholder={placeholder}
      onChange={(e) => setSearch(e.target.value)}
      InputProps={{
        endAdornment: <Search />,
      }}
    />
  )
}
