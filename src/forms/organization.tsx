import { useEffect, useState } from "react"

import { Box } from "@mui/material"
import { Grid } from "@mui/material"
import { TextField } from "@mui/material"

import { Alert } from "@ui/Alert"
import { Button } from "@ui/Button"
import { useApi } from "@hooks/useApi"
import { ENDPOINTS } from "@utils/constants"
import { useAppContext, AuthTypes } from "@contexts/index"

export function UpdateOrganization() {
  const API = useApi()
  const { state, dispatch } = useAppContext()

  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [phone, setPhone] = useState<string | undefined>("")

  useEffect(() => {
    setName(state?.auth?.user?.organization?.name || "")
    setEmail(state?.auth?.user?.organization?.email || "")
    setPhone(state?.auth?.user?.organization?.phone || "")
  }, [state.auth.user?.organization])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault()

      setError(null)
      setLoading(true)

      if (!name) {
        setError("Please fill the required fields")
        return
      }

      const body = {
        name,
        email,
        phone,
      }

      await API({
        method: "PUT",
        body: JSON.stringify(body),
        uri: ENDPOINTS.organizations,
        message: "Organization updated successfully",
      })

      dispatch({
        type: AuthTypes.SET_USER,
        payload: {
          user: {
            ...state.auth.user,
            organization: {
              ...state?.auth?.user?.organization,
              name,
              email,
              phone,
            },
          },
        },
      })
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
        sx={{ width: "100%" }}
        onSubmit={handleSubmit}
      >
        <Grid container spacing={2}>
          <Grid item sm={12}>
            <TextField
              required
              fullWidth
              id="name"
              name="name"
              value={name}
              label="Organization Name"
              onChange={(event) => setName(event.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              fullWidth
              id="email"
              name="email"
              type="email"
              value={email}
              autoComplete="email"
              label="Email Address"
              onChange={(event) => setEmail(event.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="phone"
              name="phone"
              label="Phone"
              value={phone}
              autoComplete="phone"
              onChange={(event) => setPhone(event.target.value)}
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
              <Button type="submit" loading={loading}>
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
