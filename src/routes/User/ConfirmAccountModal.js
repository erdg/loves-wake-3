import React from 'react';
import { connect } from 'unistore/react';
import { actions } from 'store';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import theme from 'theme';

class ConfirmAccountModal extends React.Component {
   state = {
      // 6-digit confirmation code
      code: '',
      codeHasError: false,
      confirmAccountSuccess: false,
      loading: false
   }

   onChange = (e) => {
      this.setState({ [e.target.name]: e.target.value });
   }

   // returns true if code exists and is not a number or is not 6 digits
   codeHasError = () => {
      if (!this.state.code || (isNaN(this.state.code) || !(this.state.code.length === 6))) {
         this.setState({ codeHasError: true });
         return true;
      } else {
         this.setState({ codeHasError: false });
         return false;
      }
   }

   confirmAccount = () => {
      if (this.codeHasError()) {
         return;
      }
      this.props.confirmUser(this.state.code);
   }

   render (props) {
      return (
         <div>
            <Dialog
               open={this.props.open}
               onClose={this.props.closeConfirmAccountModal}
            >
               <DialogTitle>Confirm Account</DialogTitle>
               <DialogContent>
                  <DialogContentText style={{marginBottom: 24}} >
                     We sent you an email with a 6-digit code. Please enter
                     the code below to confirm your account.
                  </DialogContentText>
                  {this.props.error && this.props.error !== '' &&
                     <Paper style={{background: theme.palette.error.main, padding: 8, marginBottom: 24}} elevation={0}>
                        <Typography variant="body1" style={{color: 'white'}}>
                           {this.props.error}
                        </Typography>
                     </Paper>
                  }
                  <TextField
                     autoFocus
                     fullWidth
                     onChange={this.onChange}
                     name="code"
                     label="6-digit code"
                     helperText={this.state.codeHasError && "Please enter a 6-digit number"}
                     error={this.state.codeHasError}
                     placeholder="e.g. 123456"
                     value={this.state.code}
                     variant="outlined"
                  />
               </DialogContent>
               <DialogActions>
                  <Button
                     color="primary"
                     onClick={this.confirmAccount}
                  >
                     Submit
                  </Button>
               </DialogActions>
            </Dialog>
         </div>
      )
   }
}
                  
export default connect("user, loading, error", actions)(ConfirmAccountModal);
