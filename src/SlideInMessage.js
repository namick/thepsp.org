import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Slide from '@material-ui/core/Slide'

const Transition = React.forwardRef(function Transition (props, ref) {
  return <Slide direction="right" ref={ref} {...props} />
})

export default ({ children, title, open, handleClose }) =>
  <Dialog
    open={open}
    TransitionComponent={Transition}
    keepMounted
    onClose={handleClose}
    aria-labelledby="alert-dialog-slide-title"
    aria-describedby="alert-dialog-slide-description"
  >
    {title && <DialogTitle id="alert-dialog-slide-title">{title}</DialogTitle>}
    <DialogContent>
      <DialogContentText id="alert-dialog-slide-description">
        {children}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} color="primary">
        Got it
        </Button>
    </DialogActions>
  </Dialog>
