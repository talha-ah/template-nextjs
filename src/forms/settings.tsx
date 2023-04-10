import { useState } from "react"

import { Grid, Box } from "@mui/material"

// import { Input } from "@ui/Input"
import { Alert } from "@ui/Alert"
import { Button } from "@ui/Button"
import { useApi } from "@hooks/useApi"
// import { ENDPOINTS } from "@utils/constants"
import {
  useAppContext,
  // InventoryTypes
} from "@contexts/index"

export function EditInventorySettings() {
  const API = useApi()
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
        settings: {
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone"),
          address: {
            zip: data.get("zip"),
            city: data.get("city"),
            state: data.get("state"),
            country: data.get("country"),
            addressOne: data.get("addressOne"),
            addressTwo: data.get("addressTwo"),
          },
        },
      }

      if (!body.settings.name) {
        setError("Please fill the required fields")
        return
      }

      // const response = await API({
      //   method: "PUT",
      //   body: JSON.stringify(body),
      //   uri: ENDPOINTS.inventorySettings,
      //   message: "Settings updated successfully",
      // })

      // dispatch({
      //   type: InventoryTypes.UPDATE_INVENTORY_SETTINGS,
      //   payload: response.data,
      // })
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
          {/* <Grid item sm={12}>
            <Input
              required
              fullWidth
              id="name"
              name="name"
              label="Name"
              defaultValue={state.inventory.settings.name}
            />
          </Grid>
          <Grid item sm={6}>
            <Input
              fullWidth
              id="email"
              name="email"
              type="email"
              label="Email"
              defaultValue={state.inventory.settings.email}
            />
          </Grid>
          <Grid item xs={6}>
            <Input
              fullWidth
              id="phone"
              name="phone"
              label="Phone"
              autoComplete="phone"
              defaultValue={state.inventory.settings.phone}
            />
          </Grid>
          <Grid item xs={6}>
            <Input
              fullWidth
              id="addressOne"
              name="addressOne"
              label="Address One"
              defaultValue={state.inventory.settings.address?.addressOne}
            />
          </Grid>
          <Grid item xs={6}>
            <Input
              fullWidth
              id="addressTwo"
              name="addressTwo"
              label="Address Two"
              defaultValue={state.inventory.settings.address?.addressTwo}
            />
          </Grid>
          <Grid item xs={4}>
            <Input
              fullWidth
              id="city"
              name="city"
              label="City"
              defaultValue={state.inventory.settings.address?.city}
            />
          </Grid>
          <Grid item xs={4}>
            <Input
              id="zip"
              fullWidth
              name="zip"
              label="Zip"
              defaultValue={state.inventory.settings.address?.zip}
            />
          </Grid>
          <Grid item xs={4}>
            <Input
              fullWidth
              id="state"
              name="state"
              label="State"
              defaultValue={state.inventory.settings.address?.state}
            />
          </Grid>
          <Grid item xs={12}>
          <Input
          fullWidth
          id="country"
          name="country"
          label="Country"
          defaultValue={state.inventory.settings.address?.country}
          />
        </Grid> */}
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
