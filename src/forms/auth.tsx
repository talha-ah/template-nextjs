import * as React from "react"
import { useState } from "react"
import { useRouter } from "next/router"

import { Box } from "@mui/material"
import { Grid } from "@mui/material"
import { Typography } from "@mui/material"
import { Card as MuiCard } from "@mui/material"

import { Input } from "@ui/Input"
import { Alert } from "@ui/Alert"
import { Button } from "@ui/Button"
import { useApi } from "@hooks/useApi"
import { Link } from "@ui/Link"
import { ENDPOINTS } from "@utils/constants"
import { AuthTypes, useAppContext } from "@contexts/index"

const Card = ({
  title,
  children,
  subtitle = `to continue to ${process.env.NEXT_PUBLIC_APP_NAME}`,
}: {
  title: string
  subtitle?: string
  children: React.ReactNode
}) => {
  return (
    <MuiCard
      variant="outlined"
      sx={{
        p: 4,
        maxWidth: "xs",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>

      {subtitle && (
        <Typography variant="body2" sx={{ mb: 4 }}>
          {subtitle}
        </Typography>
      )}

      {children}
    </MuiCard>
  )
}

export function LoginForm() {
  const API = useApi()
  const router = useRouter()
  const { state, dispatch } = useAppContext()

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
        password: data.get("password"),
      }

      const response = await API({
        method: "POST",
        notifyError: false,
        uri: ENDPOINTS.login,
        body: JSON.stringify(body),
      })

      dispatch({
        type: AuthTypes.LOGIN,
        payload: response?.data,
      })

      router.replace(state.auth.redirect || "/")
      dispatch({ type: AuthTypes.SET_REDIRECT, payload: { redirect: "" } })
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card title="Sign in">
      <Box noValidate component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Input
              required
              autoFocus
              fullWidth
              id="email"
              type="email"
              name="email"
              autoComplete="email"
              label="Email Address"
            />
          </Grid>
          <Grid item xs={12}>
            <Input
              required
              fullWidth
              id="password"
              name="password"
              type="password"
              label="Password"
              autoComplete="current-password"
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" fullWidth loading={loading}>
              Sign In
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Link variant="body2" to="/auth/forgot-password">
                Forgot password?
              </Link>

              <Link variant="body2" to="/auth/register">
                Create Account
              </Link>
            </Box>
          </Grid>
        </Grid>

        <Alert type="error" message={error} />
      </Box>
    </Card>
  )
}

export function Registerform() {
  const API = useApi()
  const router = useRouter()
  const { state, dispatch } = useAppContext()

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
        password: data.get("password"),
        lastName: data.get("lastName"),
        firstName: data.get("firstName"),
      }

      const response = await API({
        method: "POST",
        notifyError: false,
        uri: ENDPOINTS.register,
        body: JSON.stringify(body),
        message: "Registered successfully",
      })

      dispatch({
        type: AuthTypes.LOGIN,
        payload: response?.data,
      })

      router.replace(state.auth.redirect || "/")
      dispatch({ type: AuthTypes.SET_REDIRECT, payload: { redirect: "" } })
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card title="Sign up">
      <Box noValidate component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Input
              required
              autoFocus
              fullWidth
              id="firstName"
              name="firstName"
              label="First Name"
              autoComplete="given-name"
            />
          </Grid>
          <Grid item xs={6}>
            <Input
              fullWidth
              id="lastName"
              name="lastName"
              label="Last Name"
              autoComplete="family-name"
            />
          </Grid>
          <Grid item xs={12}>
            <Input
              required
              fullWidth
              id="email"
              type="email"
              name="email"
              autoComplete="email"
              label="Email Address"
            />
          </Grid>
          <Grid item xs={12}>
            <Input
              required
              fullWidth
              id="password"
              name="password"
              type="password"
              label="Password"
              autoComplete="new-password"
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" fullWidth loading={loading}>
              Sign Up
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Link variant="body2" to="/auth/login">
                Sign in
              </Link>
            </Box>
          </Grid>
        </Grid>

        <Alert type="error" message={error} />
      </Box>
    </Card>
  )
}

export function ForgotPasswordForm() {
  const API = useApi()
  const router = useRouter()

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
      }

      await API({
        method: "POST",
        notifyError: false,
        body: JSON.stringify(body),
        uri: `${ENDPOINTS.forgotPassword}`,
        message: "Password reset link sent",
      })

      router.replace("/auth/login")
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card title="Forgot Password" subtitle="Enter your recovery email">
      <Box noValidate component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Input
              required
              autoFocus
              fullWidth
              id="email"
              type="email"
              name="email"
              autoComplete="email"
              label="Email Address"
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" fullWidth loading={loading}>
              Recover Password
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Link variant="body2" to="/auth/login">
                Sign in
              </Link>
            </Box>
          </Grid>
        </Grid>

        <Alert type="error" message={error} />
      </Box>
    </Card>
  )
}

export function RecoverPasswordForm({ token }: { token: string }) {
  const API = useApi()
  const router = useRouter()

  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault()

      setError(null)
      setLoading(true)

      const data = new FormData(event.currentTarget)

      const body = {
        password: data.get("password"),
      }

      if (body.password !== data.get("confirm")) {
        throw new Error("Passwords do not match")
      }

      await API({
        method: "PUT",
        notifyError: false,
        body: JSON.stringify(body),
        message: "Password updated successfully",
        uri: `${ENDPOINTS.recoverPassword}/${token}`,
      })

      router.replace("/auth/login")
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card title="Enter your new password">
      <Box noValidate component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Input
              required
              fullWidth
              id="password"
              name="password"
              type="password"
              label="New Password"
              autoComplete="new-password"
            />
          </Grid>
          <Grid item xs={12}>
            <Input
              required
              fullWidth
              id="confirm"
              name="confirm"
              type="password"
              label="Confirm Password"
              autoComplete="confirm-password"
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" fullWidth loading={loading}>
              Update Password
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Link variant="body2" to="/auth/login">
                Sign in
              </Link>
            </Box>
          </Grid>
        </Grid>

        <Alert type="error" message={error} />
      </Box>
    </Card>
  )
}

export function AcceptInviteForm({
  name,
  token,
}: {
  name: string
  token: string
}) {
  const API = useApi()
  const router = useRouter()
  const { dispatch } = useAppContext()

  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault()

      setError(null)
      setLoading(true)

      const data = new FormData(event.currentTarget)

      const body = {
        password: data.get("password"),
      }

      if (body.password !== data.get("confirm")) {
        throw new Error("Passwords do not match")
      }

      const response = await API({
        method: "POST",
        notifyError: false,
        body: JSON.stringify(body),
        message: "Registered successfully",
        uri: `${ENDPOINTS.acceptInvite}/${token}`,
      })

      dispatch({
        type: AuthTypes.LOGIN,
        payload: response?.data,
      })

      router.replace("/app")
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card title={name} subtitle="complete your registration">
      <Box noValidate component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Input
              required
              fullWidth
              id="password"
              type="password"
              name="password"
              label="Password"
              autoComplete="new-password"
            />
          </Grid>
          <Grid item xs={12}>
            <Input
              required
              fullWidth
              id="confirm"
              name="confirm"
              type="password"
              label="Confirm Password"
              autoComplete="confirm-password"
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" fullWidth loading={loading}>
              Accept Invite
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Link variant="body2" to="/auth/login">
                Sign in
              </Link>
            </Box>
          </Grid>
        </Grid>

        <Alert type="error" message={error} />
      </Box>
    </Card>
  )
}
