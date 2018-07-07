import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';

// -- props --
//
// open
// handleClose
// title
// content
//
const TextDialog = (props) => {
   return (
      <Dialog
         open={props.open}
         onClose={props.handleClose}
      >
         <DialogTitle>{props.title}</DialogTitle>
         <DialogContent>
            <DialogContentText>
               {props.content}
            </DialogContentText>
            <DialogActions>
               <Button
                  color="primary"
                  onClick={props.handleClose}
               > Close
               </Button>
            </DialogActions>
         </DialogContent>
      </Dialog>
   )
}

export default TextDialog;
