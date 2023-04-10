import { useState } from "react"

import { Dialog } from "@mui/material"
import { IconButton } from "@mui/material"
import { DialogTitle } from "@mui/material"
import { Close } from "@mui/icons-material"
import { Theme } from "@mui/material/styles"
import { DialogActions } from "@mui/material"
import { DialogContent } from "@mui/material"
import { DialogContentText } from "@mui/material"

import { Button } from "@ui/Button"

type ConfirmProps = {
  title: string
  message: string
  loading?: boolean
  onConfirm: () => void
  trigger: (args: any) => void
}

export const Confirm = (props: ConfirmProps) => {
  const [open, setOpen] = useState(false)

  const toggleOpen = () => setOpen(!open)

  return (
    <>
      {props.trigger({ toggleOpen })}
      <Dialog open={open} onClose={toggleOpen}>
        <DialogTitle id="confirm-dialog-title">
          {props.title}{" "}
          <IconButton
            aria-label="close"
            onClick={toggleOpen}
            sx={(theme: Theme) => ({
              position: "absolute",
              top: theme.spacing(1.2),
              right: theme.spacing(2),
            })}
          >
            <Close />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <DialogContentText id={`confirm-${props.title}`}>
            {props.message}
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button variant="text" onClick={toggleOpen}>
            Cancel
          </Button>
          <Button
            autoFocus
            loading={props.loading}
            onClick={() => {
              props.onConfirm()
              toggleOpen()
            }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
