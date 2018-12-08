import React from 'react';
import { actions } from 'store';
import { connect } from 'unistore/react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import PasswordInput from 'components/PasswordInput';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import theme from 'theme';
import withMobileDialog from '@material-ui/core/withMobileDialog';

// import Card from '@material-ui/core/Card';
// import CardHeader from '@material-ui/core/CardHeader';
// import CardMedia from '@material-ui/core/CardMedia';
// import CardContent from '@material-ui/core/CardContent';
// import CardActions from '@material-ui/core/CardActions';

class UpdatePasswordDialog extends React.Component {
   state = {
      pw1: '',
      pw2: ''
   }


   handleChange = (e) => {
      this.setState({ [e.target.name]: e.target.value })
   }

   updUserPassword = () => {
      this.props.updUserPassword(this.state.pw1);
   }

   handleReset = () => {
      this.setState({ pw1: '', pw2: '' })
   }

   render () {
      return (
         <Dialog
            open={this.props.open}
            fullScreen={this.props.fullScreen}
            onClose={
               () => {
                  this.props.hideUpdatePasswordDialog();
               }
            }
         >
            <DialogTitle>
               Update Password
            </DialogTitle>
            <DialogContent>
               { this.props.loading ?
                  <CircularProgress
                     color="primary"
                     size={60}
                  />
                     :
                  <div
                     style={{
                        display: 'flex',
                        flexDirection: 'column',
                        margin: '8px 0px',
                     }}
                  >
                     {this.props.success ?
                        <Typography variant="body1">
                           {this.props.success}
                        </Typography>
                           :
                        <div>
                           { this.props.error &&
                              <Paper
                                 elevation={0}
                                 style={{
                                    color: 'white',
                                    backgroundColor: theme.palette.error.main,
                                    marginBottom: 16,
                                    padding: 8
                                 }}
                              >
                                 <Typography variant="body1" style={{color: 'white'}}>
                                    {this.props.error}
                                 </Typography>
                              </Paper>
                           }
                           <PasswordInput
                              name="pw1"
                              pw={this.state.pw1}
                              handleChange={this.handleChange}
                              style={{margin: '8px 0px'}}
                           />
                           <PasswordInput
                              name="pw2"
                              pw={this.state.pw2}
                              label="Confirm Password"
                              handleChange={this.handleChange}
                              style={{margin: '8px 0px'}}
                           />
                        </div>
                     }
                  </div>
               }
            </DialogContent>
            <DialogActions style={{marginLeft: 16, marginRight: 16}}>
               <Button
                  onClick={
                     () => {
                        this.props.hideUpdatePasswordDialog();
                     }
                  }
               > Cancel
               </Button>
               {/* server success response */}
               {!this.props.success ?
                  <Button
                     color="primary"
                     variant="contained"
                     disabled={!this.state.pw1 ? true : (this.state.pw1 !== this.state.pw2) ? true : false}
                     onClick={
                        () => {
                           this.updUserPassword();
                        }
                     }
                  > Update
                  </Button>
                     :
                  <Button
                     color="primary"
                     variant="contained"
                     onClick={
                        () => {
                           this.props.hideUpdatePasswordDialog();
                           setTimeout(() => {
                              this.handleReset();
                              this.props.clearSuccess();
                           }, 500);
                        }
                     }
                  > Ok
                  </Button>
               }
            </DialogActions>
         </Dialog>
      )
   }
}

export default connect('loading, error, success', actions)(withMobileDialog()(UpdatePasswordDialog));
