import React from 'react';
import { actions } from 'store';
import { connect } from 'unistore/react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import withMobileDialog from '@material-ui/core/withMobileDialog';

// import Card from '@material-ui/core/Card';
// import CardHeader from '@material-ui/core/CardHeader';
// import CardMedia from '@material-ui/core/CardMedia';
// import CardContent from '@material-ui/core/CardContent';
// import CardActions from '@material-ui/core/CardActions';

class EditObituaryModal extends React.Component {
   state = {
      obituary: this.props.obituary ? this.props.obituary.split('^J^J').join('\n') : ''
   }

   handleChange = (e) => {
      this.setState({ obituary: e.target.value })
   }

   handleResetObituary = () => {
      this.setState({ obituary: this.props.obituary || '' });
   }

   updMemorialObituary = () => {
      this.props.updMemorialObituary(this.props.memorialId, this.state.obituary);
      this.props.hideEditObituaryModal();
   }

   render () {
      return (
         <Dialog
            open={this.props.open}
            fullScreen={this.props.fullScreen}
            onClose={
               () => {
                  this.props.hideEditObituaryModal();
               }
            }
         >
            <DialogTitle>
               Write or Copy/Paste an Obituary
            </DialogTitle>
            <DialogContent>
               <TextField
                  label="Obituary"
                  autoFocus
                  variant="outlined"
                  margin="normal"
                  multiline
                  rows={12}
                  value={this.state.obituary}
                  onChange={this.handleChange}
                  style={{width: '100%'}}
               />
            </DialogContent>
            <DialogActions style={{marginLeft: 16, marginRight: 16}}>
               <Button
                  onClick={
                     () => {
                        this.props.hideEditObituaryModal();
                        this.handleResetObituary();
                     }
                  }
               > Cancel
               </Button>
               <Button
                  color="primary"
                  variant="contained"
                  onClick={
                     () => {
                        this.updMemorialObituary();
                     }
                  }
               > Ok
               </Button>
            </DialogActions>
         </Dialog>
      )
   }
}

export default connect('', actions)(withMobileDialog()(EditObituaryModal));
