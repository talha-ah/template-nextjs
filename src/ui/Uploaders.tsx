import React from "react"

import { Box, Typography } from "@mui/material"
import { CircularProgress } from "@mui/material"
import { CloudUpload } from "@mui/icons-material"

export type UploaderProps = {
  accept?: string[]
  maxSize?: number
  loading?: boolean
  disabled?: boolean
  onDrop?: (event: React.DragEvent<HTMLElement>) => void
  onChange: (file: File) => void
}

// ["application/vnd.ms-excel"]
// ["image/png", "image/jpg", "image/jpeg"]

// TODO: Add support for drag and drop

export const Uploader: React.FC<UploaderProps> = ({
  onDrop,
  maxSize,
  loading,
  disabled,
  onChange,
  accept = [],
}) => {
  const [file, setFile] = React.useState<string>("")
  const [error, setError] = React.useState<string | null>(null)

  const stopDefaults = (e: React.DragEvent) => {
    e.stopPropagation()
    e.preventDefault()
  }

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFile("")

    if (!event.target.files || !event.target.files[0]) return

    const file = event.target.files[0]
    const fileSize = file.size
    const fileType = file.type

    if (file) {
      if (accept[0] !== "*" && !accept.some((typ) => typ === fileType)) {
        setError("File type not supported")
      } else if (maxSize && fileSize > maxSize) {
        setError("File size too large")
      } else {
        onChange(file)
      }
    }
  }

  return (
    <>
      <input
        hidden
        type="file"
        value={file}
        id="file-upload"
        accept={accept.join(",")}
        onChange={onChangeHandler}
        disabled={disabled || loading}
        onDrop={(event: React.DragEvent<HTMLElement>) => {
          console.log(`Drop ${event.dataTransfer.files[0].name}`)
        }}
      />

      <label htmlFor="file-upload">
        <Box
          sx={{
            py: 4,
            width: "100%",
            height: "100%",
            display: "flex",
            borderRadius: 1,
            cursor: "pointer",
            alignItems: "center",
            border: "1px dashed",
            flexDirection: "column",
            justifyContent: "center",
            bgcolor: "background.paper",
          }}
          onDrop={(e: React.DragEvent<HTMLElement>) => {
            stopDefaults(e)
            onDrop && onDrop(e)
          }}
        >
          <CloudUpload sx={{ fontSize: 60, mb: 2 }} />

          {loading ? (
            <CircularProgress />
          ) : (
            <Typography variant="h6">
              {/* Drag and drop your file here or click to upload */}
              Click to upload your file
            </Typography>
          )}

          {maxSize && (
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Max size: {maxSize / 1000000} MB
            </Typography>
          )}

          {error && (
            <Typography variant="body2" sx={{ color: "error.main" }}>
              {error}
            </Typography>
          )}
        </Box>
      </label>
    </>
  )
}
