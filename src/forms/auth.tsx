import { useState } from "react"
import { useRouter } from "next/router"

import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Alert from "@mui/material/Alert"
import Avatar from "@mui/material/Avatar"
import Checkbox from "@mui/material/Checkbox"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import LoadingButton from "@mui/lab/LoadingButton"
import FormControlLabel from "@mui/material/FormControlLabel"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"

import Link from "@components/Link"
import { useApi } from "@hooks/useApi"
import { endpoints } from "@utils/constants"
import { AuthTypes, useAppContext } from "@contexts/index"

export function LoginForm() {
  const [api] = useApi()
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
        email: data.get("email"),
        password: data.get("password"),
      }

      const response = await api({
        method: "POST",
        uri: endpoints.login,
        body: JSON.stringify(body),
      })

      console.log("response", response)

      dispatch({
        type: AuthTypes.LOGIN,
        payload: response?.data,
      })

      // Fetch Metadata
      // fetchMetadata()

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
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
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
        <LoadingButton
          fullWidth
          type="submit"
          loading={loading}
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </LoadingButton>
        <Grid container>
          <Grid item xs>
            <Link href="/auth/recover-password">Forgot password?</Link>
          </Grid>
          <Grid item>
            <Link href="/auth/register">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export function Registerform() {
  const [api] = useApi()
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

      console.log("response", response)

      dispatch({
        type: AuthTypes.LOGIN,
        payload: response?.data,
      })

      // Fetch Metadata
      // fetchMetadata()

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
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
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
        <LoadingButton
          fullWidth
          type="submit"
          loading={loading}
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign Up
        </LoadingButton>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link href="/auth/login">{"Already have an account? Sign in"}</Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export function ForgotPasswordForm() {
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

      router.replace("/login")
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
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Recover Password
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
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

        <LoadingButton
          fullWidth
          type="submit"
          loading={loading}
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Recover Password
        </LoadingButton>
        <Grid container>
          <Grid item xs>
            <Link href="/auth/login">Login?</Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}
