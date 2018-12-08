import React from 'react';
import { actions, } from 'store';
import { connect } from 'unistore/react';

import Button from '@material-ui/core/Button';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class RecoverUserAccountSuccessDialog extends React.Component {
   state = {
   }

   render () {
      return (
         <Dialog
            open={this.props.recoverUserAccountSuccess}
            onClose={
               () => {
                  this.props.hideRecoverUserAccountSuccessDialog();
               }
            }
         >
            <DialogTitle>
               Almost Done
            </DialogTitle>
            <DialogContent>
               <DialogContentText>
                  We sent you an email with an 8-character code. Use the code to 
                  login to your account. After logging in, go to "Account Settings"
                  to update your password.
               </DialogContentText>
            </DialogContent>
            <DialogActions style={{marginLeft: 16, marginRight: 16}}>
               <Button
                  color="primary"
                  onClick={
                     () => {
                        this.props.hideRecoverUserAccountSuccessDialog();
                     }
                  }
               > Ok
               </Button>
            </DialogActions>
         </Dialog>
      )
   }
}

export default connect('recoverUserAccountSuccess', actions)(RecoverUserAccountSuccessDialog);
