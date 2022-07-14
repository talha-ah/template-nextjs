import { useState } from "react"

import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"

export const Confirm = (props: any) => {
  const [show, setShow] = useState(false)

  const toggleShow = () => setShow(!show)

  return (
    <>
      {props.trigger({ toggleShow })}
      <Dialog open={show} onClose={toggleShow}>
        <DialogTitle id="confirm-dialog-title">{props.title}</DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.message}
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={toggleShow}>Cancel</Button>
          <Button
            autoFocus
            onClick={() => {
              props.onConfirm()
              toggleShow()
            }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
