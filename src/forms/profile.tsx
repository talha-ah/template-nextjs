import { useEffect, useState } from "react"

import { Box } from "@mui/material"
import { Grid } from "@mui/material"
import { Typography } from "@mui/material"
import { DarkMode } from "@mui/icons-material"
import { CardActionArea } from "@mui/material"
import { MailLock } from "@mui/icons-material"
import { LightMode } from "@mui/icons-material"
import { Card as MuiCard } from "@mui/material"
import { SettingsBrightnessOutlined } from "@mui/icons-material"

import { Alert } from "@ui/Alert"
import { Input } from "@ui/Input"
import { Button } from "@ui/Button"
import { useApi } from "@hooks/useApi"
import { ThemeMode } from "@utils/types"
import { ENDPOINTS } from "@utils/constants"
import { IconButton } from "@ui/IconButton"
import { useAppContext, AuthTypes } from "@contexts/index"

export function UpdateProfile() {
  const API = useApi()
  const { state, dispatch } = useAppContext()

  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [verifyEmailLoading, setVerifyEmailLoading] = useState<boolean>(false)

  const [email, setEmail] = useState<string>("")
  const [firstName, setFirstName] = useState<string>("")
  const [phone, setPhone] = useState<string | undefined>("")
  const [lastName, setLastName] = useState<string | undefined>("")

  useEffect(() => {
    setEmail(state.auth.user.email || "")
    setPhone(state.auth.user.phone || "")
    setLastName(state.auth.user.lastName || "")
    setFirstName(state.auth.user.firstName || "")
  }, [state.auth.user])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault()

      setError(null)
      setLoading(true)

      if (!firstName || !email) {
        setError("Please fill the required fields")
        return
      }

      const body = {
        email: email,
        phone: phone,
        lastName: lastName,
        firstName: firstName,
      }

      const response = await API({
        method: "PUT",
        uri: ENDPOINTS.profile,
        body: JSON.stringify(body),
        message: "Profile updated successfully",
      })

      dispatch({
        type: AuthTypes.SET_USER,
        payload: { user: response?.data },
      })
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const sendVerifyEmail = async () => {
    try {
      setError(null)
      setVerifyEmailLoading(true)

      const body = {
        email: email,
      }

      await API({
        method: "POST",
        notifyError: false,
        body: JSON.stringify(body),
        uri: `${ENDPOINTS.verifyEmail}`,
        message: "Verification email sent successfully",
      })
    } catch (error: any) {
      setError(error.message)
    } finally {
      setVerifyEmailLoading(false)
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
          <Grid item sm={6}>
            <Input
              required
              fullWidth
              id="firstName"
              name="firstName"
              value={firstName}
              label="First Name"
              autoComplete="given-name"
              onChange={(event) => setFirstName(event.target.value)}
            />
          </Grid>
          <Grid item sm={6}>
            <Input
              fullWidth
              id="lastName"
              name="lastName"
              value={lastName}
              label="Last Name"
              autoComplete="family-name"
              onChange={(event) => setLastName(event.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <Input
              required
              fullWidth
              id="email"
              name="email"
              type="email"
              value={email}
              autoComplete="email"
              label="Email Address"
              onChange={(event) => setEmail(event.target.value)}
              InputProps={{
                endAdornment:
                  state.auth.user.status === "pending" ? (
                    <IconButton
                      onClick={sendVerifyEmail}
                      loading={verifyEmailLoading}
                      tooltip="Kindly verify your email. Click to resend verification email"
                    >
                      <MailLock color="info" />
                    </IconButton>
                  ) : null,
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <Input
              fullWidth
              id="phone"
              name="phone"
              label="Phone"
              value={phone}
              autoComplete="phone"
              onChange={(event) => setPhone(event.target.value)}
            />
          </Grid>
        </Grid>

        <Alert type="error" message={error} />

        <Box
          sx={{
            pt: 2,
            gap: 2,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button type="submit" loading={loading}>
            Update
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export function UpdatePassword() {
  const API = useApi()

  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const [password, setPassword] = useState<string>("")
  const [oldPassword, setOldPassword] = useState<string>("")

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault()

      setError(null)
      setLoading(true)

      if (!password || !oldPassword) {
        setError("Please fill all fields")
        return
      }

      const body = {
        old_password: oldPassword,
        password: password,
      }

      await API({
        method: "PATCH",
        uri: ENDPOINTS.profile,
        body: JSON.stringify(body),
        message: "Password updated successfully",
      })

      setPassword("")
      setOldPassword("")
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
          <Grid item sm={6}>
            <Input
              required
              fullWidth
              type="password"
              id="oldPassword"
              name="oldPassword"
              value={oldPassword}
              label="Current Password"
              autoComplete="current-password"
              onChange={(event) => setOldPassword(event.target.value)}
            />
          </Grid>
          <Grid item sm={6}>
            <Input
              required
              fullWidth
              id="password"
              type="password"
              name="password"
              value={password}
              label="New Password"
              onChange={(event) => setPassword(event.target.value)}
            />
          </Grid>
        </Grid>

        <Alert type="error" message={error} />

        <Box
          sx={{
            pt: 2,
            gap: 2,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button type="submit" loading={loading}>
            Update
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export function SelectTheme() {
  const API = useApi()
  const { state, dispatch } = useAppContext()

  const handleSubmit = async (theme: ThemeMode) => {
    try {
      dispatch({
        type: AuthTypes.SET_THEME,
        payload: { theme },
      })

      await API({
        method: "PUT",
        uri: ENDPOINTS.profileTheme,
        body: JSON.stringify({ theme }),
      })
    } catch (error: any) {}
  }

  const Card = ({ type, active }: { type: ThemeMode; active: boolean }) => {
    return (
      <MuiCard variant="outlined">
        <CardActionArea
          onClick={() => handleSubmit(type)}
          sx={{
            py: 2,
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: active ? "divider" : "background.paper",
          }}
        >
          {type === "light" ? (
            <LightMode />
          ) : type === "dark" ? (
            <DarkMode />
          ) : (
            <SettingsBrightnessOutlined />
          )}

          <Typography
            sx={{
              ml: 2,
              fontSize: 14,
              fontWeight: 500,
              color: "text.secondary",
            }}
          >
            {type === "light"
              ? "Light Mode"
              : type === "dark"
              ? "Dark Mode"
              : "System"}
          </Typography>
        </CardActionArea>
      </MuiCard>
    )
  }

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Grid container spacing={2}>
        <Grid item sm={4}>
          <Card type="light" active={state.auth.theme === "light"} />
        </Grid>
        <Grid item sm={4}>
          <Card type="dark" active={state.auth.theme === "dark"} />
        </Grid>
        <Grid item sm={4}>
          <Card type="system" active={state.auth.theme === "system"} />
        </Grid>
      </Grid>
    </Box>
  )
}
