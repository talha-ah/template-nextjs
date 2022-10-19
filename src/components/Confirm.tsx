import { useState } from "react"

import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"

import { Button } from "@components/Button"

type ConfirmProps = {
  title: string
  message: string
  onClose?: () => void
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
        <DialogTitle id="confirm-dialog-title">{props.title}</DialogTitle>

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
