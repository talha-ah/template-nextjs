import { useState } from "react"

import { Box } from "@mui/material"
import { Grid } from "@mui/material"
import { TextField } from "@mui/material"

import { Alert } from "@ui/Alert"
import { Button } from "@ui/Button"
import { useApi } from "@hooks/useApi"
import { ENDPOINTS } from "@utils/constants"

export function InviteUser({
  onClose,
  onSubmit,
}: {
  onClose?: () => void
  onSubmit?: (args: any) => void
}) {
  const API = useApi()

  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault()

      setError(null)
      setLoading(true)

      const data = new FormData(event.currentTarget)

      const body = {
        email: data.get("email"),
        firstName: data.get("firstName"),
        lastName: data.get("lastName") || "",
      }

      const response = await API({
        method: "POST",
        uri: ENDPOINTS.invites,
        body: JSON.stringify(body),
        message: "Invite sent successfully",
      })

      onSubmit && onSubmit(response?.data)
      onClose && onClose()
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Box
        noValidate
        component="form"
        onSubmit={handleSubmit}
        sx={{ width: "100%", mt: 1 }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              autoFocus
              fullWidth
              id="firstName"
              name="firstName"
              label="First Name"
              autoComplete="given-name"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="family-name"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="email"
              name="email"
              autoComplete="email"
              label="Email Address"
            />
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{
                gap: 2,
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Button onClick={onClose} variant="text">
                Cancel
              </Button>
              <Button type="submit" loading={loading}>
                Invite
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Alert type="error" message={error} />
      </Box>
    </Box>
  )
}

export function EditUser({
  value,
  onClose,
  onSubmit,
}: {
  value: any
  onClose?: () => void
  onSubmit?: (args: any) => void
}) {
  const API = useApi()

  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault()

      setError(null)
      setLoading(true)

      const data = new FormData(event.currentTarget)

      const body = {
        email: data.get("email"),
        firstName: data.get("firstName"),
        lastName: data.get("lastName") || "",
      }

      const response = await API({
        method: "PUT",
        body: JSON.stringify(body),
        message: "User updated successfully",
        uri: `${ENDPOINTS.organizationUsers}/${value._id}`,
      })

      onSubmit && onSubmit(response?.data)
      onClose && onClose()
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Box
        noValidate
        component="form"
        onSubmit={handleSubmit}
        sx={{ width: "100%", mt: 1 }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              autoFocus
              id="firstName"
              name="firstName"
              label="First Name"
              autoComplete="given-name"
              defaultValue={value.firstName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="lastName"
              name="lastName"
              label="Last Name"
              autoComplete="family-name"
              defaultValue={value.lastName}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="email"
              name="email"
              autoComplete="email"
              label="Email Address"
              defaultValue={value.email}
            />
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{
                gap: 2,
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Button onClick={onClose} variant="text">
                Cancel
              </Button>
              <Button type="submit" loading={loading} variant="text">
                Update
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Alert type="error" message={error} />
      </Box>
    </Box>
  )
}
