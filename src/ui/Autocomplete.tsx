import { TextField } from "@mui/material"
import { Autocomplete as MAutocomplete } from "@mui/material"

export interface Option {
  readonly key: string
  readonly value: string
  [key: string]: any
}

export const Autocomplete = ({
  size,
  value,
  label,
  loading,
  options,
  onChange,
  fullWidth,
  inputValue,
  onInputChange,
  ...props
}: {
  label?: string
  loading: boolean
  options: Option[]
  fullWidth?: boolean
  inputValue?: string
  value?: Option | null
  size?: "small" | "medium"
  onChange: (value: any) => void
  onInputChange: (e: any) => void
  [key: string]: any
}) => {
  return (
    <MAutocomplete
      blurOnSelect
      autoComplete
      value={value}
      options={options}
      loading={loading}
      fullWidth={fullWidth}
      inputValue={inputValue}
      loadingText="Loading..."
      id="search-autocomplete"
      noOptionsText="No options"
      onChange={(_, value) => onChange(value)}
      getOptionLabel={(option: Option) => option.value}
      onInputChange={(_, value) => onInputChange(value)}
      isOptionEqualToValue={(option: Option, value: Option) =>
        option.key === value.key
      }
      renderInput={(params) => (
        <TextField {...params} size={size} label={label} />
      )}
      {...props}
    />
  )
}

// export const Autocomplete = ({
//   value,
//   label,
//   loading,
//   options,
//   onChange,
//   inputValue,
//   onInputChange,
//   ...props
// }: {
//   label?: string
//   value?: string
//   loading: boolean
//   inputValue?: string
//   onChange: (value: any) => void
//   options: ReadonlyArray<string>
//   onInputChange: (e: any) => void
//   [key: string]: any
// }) => {
//   return (
//     <MAutocomplete
//       clearOnBlur
//       value={value}
//       options={options}
//       loading={loading}
//       sx={{ width: 200 }}
//       inputValue={inputValue}
//       loadingText="Loading..."
//       id="search-autocomplete"
//       noOptionsText="Search..."
//       getOptionLabel={(option) => option}
//       onChange={(event, newValue) => onChange(newValue)}
//       isOptionEqualToValue={(option, value) => option === value}
//       onInputChange={(event, newValue) => onInputChange(newValue)}
//       renderInput={(params) => (
//         <TextField {...params} size="small" label={label} />
//       )}
//       {...props}
//     />
//   )
// }
