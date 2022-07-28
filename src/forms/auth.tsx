import { useState } from "react"
import { useRouter } from "next/router"

import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"

import Link from "@components/Link"
import { useApi } from "@hooks/useApi"
import { Alert } from "@components/Alert"
import { Button } from "@components/Button"
import { endpoints } from "@utils/constants"
import { useFetchMetadata } from "@hooks/auth"
import { AuthTypes, useAppContext } from "@contexts/index"

export function LoginForm() {
  const [api] = useApi()
  const router = useRouter()
  const { dispatch } = useAppContext()
  const { fetchMetadata } = useFetchMetadata()

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

      const response = await api({
        method: "POST",
        uri: endpoints.login,
        body: JSON.stringify(body),
      })

      if (response?.data.user.organization.role !== "admin") {
        throw new Error("You are not authorized to login")
      }

      dispatch({
        type: AuthTypes.LOGIN,
        payload: response?.data,
      })

      // Fetch Metadata
      fetchMetadata()

      router.replace("/app")
    } catch (error: any) {
      setLoading(false)
      setError(error.message)
    }
  }

  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>

      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Alert type="error" message={error} />
        <Button type="submit" sx={{ mt: 4 }} fullWidth loading={loading}>
          Sign In
        </Button>
        <Box
          sx={{ mt: 2, flex: 1, display: "flex", justifyContent: "flex-end" }}
        >
          <Link href="/auth/register">
            {"Don't have an account? Registere here"}
          </Link>
        </Box>
      </Box>
    </Box>
  )
}

export function Registerform() {
  const [api] = useApi()
  const router = useRouter()
  const { dispatch } = useAppContext()
  const { fetchMetadata } = useFetchMetadata()

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
        firstName: data.get("firstName"),
        lastName: data.get("lastName"),
      }

      const response = await api({
        method: "POST",
        uri: endpoints.register,
        body: JSON.stringify(body),
        message: "Registered successfully",
      })

      dispatch({
        type: AuthTypes.LOGIN,
        payload: response?.data,
      })

      // Fetch Metadata
      fetchMetadata()

      router.replace("/app")
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>

      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="given-name"
              name="firstName"
              required
              fullWidth
              id="firstName"
              label="First Name"
              autoFocus
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
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
              label="Email Address"
              name="email"
              autoComplete="email"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox value="allowExtraEmails" color="primary" />}
              label="I want to receive updates"
            />
          </Grid>
        </Grid>
        <Alert type="error" message={error} />
        <Button type="submit" sx={{ mt: 4 }} fullWidth loading={loading}>
          Sign Up
        </Button>
        <Box
          sx={{ mt: 2, flex: 1, display: "flex", justifyContent: "flex-end" }}
        >
          <Link href="/auth/login">{"Already have an account? Sign in"}</Link>
        </Box>
      </Box>
    </Box>
  )
}

export function RecoverPasswordRequestForm() {
  const [api] = useApi()
  const router = useRouter()

  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault()

      setError(null)
      setLoading(true)

      const data = new FormData(event.currentTarget)

      await api({
        method: "POST",
        uri: `${endpoints.recoverPassword}/${data.get("email")}`,
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
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography component="h1" variant="h5">
        Recover Password
      </Typography>

      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
        />

        <Alert type="error" message={error} />
        <Button type="submit" sx={{ mt: 4 }} fullWidth loading={loading}>
          Recover Password
        </Button>
        <Box
          sx={{ mt: 2, flex: 1, display: "flex", justifyContent: "flex-end" }}
        >
          <Link href="/auth/login">{"Already have an account? Sign in"}</Link>
        </Box>
      </Box>
    </Box>
  )
}

export function AcceptInviteForm({
  name,
  token,
}: {
  name: string
  token: string
}) {
  const [api] = useApi()
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

      if (body.password !== data.get("confirmPassword")) {
        throw new Error("Passwords do not match")
      }

      await api({
        method: "POST",
        uri: `${endpoints.acceptInvite}/${token}`,
        body: JSON.stringify(body),
        message: "Registered successfully",
      })

      router.replace("/auth/login")
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Typography component="h1" variant="h5">
        {name} - Complete your registration
      </Typography>

      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="new-password"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="confirmPassword"
          label="Confirm Password"
          type="confirmPassword"
          id="confirmPassword"
          autoComplete="confirm-password"
        />

        <Alert type="error" message={error} />
        <Button type="submit" sx={{ mt: 4 }} fullWidth loading={loading}>
          Accept Invite
        </Button>
      </Box>
    </Box>
  )
}

export function RecoverPasswordForm({ token }: { token: string }) {
  const [api] = useApi()
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

      if (body.password !== data.get("confirmPassword")) {
        throw new Error("Passwords do not match")
      }

      await api({
        method: "PUT",
        uri: `${endpoints.recoverPassword}/${token}`,
        body: JSON.stringify(body),
        message: "Password updated successfully",
      })

      router.replace("/auth/login")
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Typography component="h1" variant="h5">
        Enter your new password
      </Typography>

      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="New Password"
          type="password"
          id="password"
          autoComplete="new-password"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="confirmPassword"
          label="Confirm Password"
          type="confirmPassword"
          id="confirmPassword"
          autoComplete="confirm-password"
        />

        <Alert type="error" message={error} />
        <Button type="submit" sx={{ mt: 4 }} fullWidth loading={loading}>
          Update Password
        </Button>
      </Box>
    </Box>
  )
}
