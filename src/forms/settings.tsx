import { useState, useEffect } from "react"

import { Box } from "@mui/material"
import { Grid } from "@mui/material"
import { TextField } from "@mui/material"

import { useApi } from "@hooks/useApi"
import { Alert } from "@components/Alert"
import { Heading } from "@components/Title"
import { Button } from "@components/Button"
import { endpoints } from "@utils/constants"
import { getOrgMetadata, setOrgMetadata } from "@utils/browser-utility"

export function UpdateMessages({
  onClose,
  onCreate,
}: {
  onClose?: () => void
  onCreate?: (args: any) => void
}) {
  const [api] = useApi()

  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [legalAgreement, setLegalAgreement] = useState<string>("")

  useEffect(() => {
    const meta = getOrgMetadata()
    setLegalAgreement(meta.legalAgreement)
  }, [])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault()

      setError(null)
      setLoading(true)

      const data = new FormData(event.currentTarget)

      const body = {
        legalAgreement: data.get("legalAgreement"),
      }

      const response = await api({
        method: "PUT",
        body: JSON.stringify(body),
        uri: endpoints.organizationMetadata,
        message: "Successfully updated messages",
      })

      const meta = getOrgMetadata()

      meta.legalAgreement = response?.data.legalAgreement

      setOrgMetadata(meta)

      onCreate && onCreate(response?.data)
      onClose && onClose()
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box
      noValidate
      component="form"
      onSubmit={handleSubmit}
      sx={{ width: "100%", mt: 1 }}
    >
      <Heading>Messages</Heading>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            minRows={3}
            maxRows={3}
            id="legalAgreement"
            name="legalAgreement"
            value={legalAgreement}
            aria-label="legalAgreement"
            placeholder="Legal agreement"
            onChange={(e) => setLegalAgreement(e.target.value)}
          />
        </Grid>
      </Grid>

      <Alert type="error" message={error} />

      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <Button type="submit" loading={loading} variant="text">
          Update
        </Button>
      </Box>
    </Box>
  )
}
