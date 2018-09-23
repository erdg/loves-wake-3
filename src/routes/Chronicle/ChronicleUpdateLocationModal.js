import React from 'react';
import { actions, API_ENDPOINT } from 'store';
import { connect } from 'unistore/react';
import update from 'immutability-helper'

import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// import Card from '@material-ui/core/Card';
// import CardHeader from '@material-ui/core/CardHeader';
// import CardMedia from '@material-ui/core/CardMedia';
// import CardContent from '@material-ui/core/CardContent';
// import CardActions from '@material-ui/core/CardActions';

class ChronicleUpdateLocationModal extends React.Component {
   state = {
      id: this.props.id,
      location: this.props.location || '',
   }

   updChronicleCardLocation = () => {
      // call fn from store
      this.props.updChronicleCardLocation(this.props.id, this.props.memorialId, this.state.location);
   }

   handleChange = (e) => {
      this.setState({ location: e.target.value })
   }

   render () {
      return (
         <Dialog
            open={this.props.showChronicleUpdateLocationModal}
            onClose={
               () => {
                  this.props.handleCloseChronicleUpdateLocationModal();
               }
            }
         >
            <DialogTitle>
               Add/Edit Location
            </DialogTitle>
            <DialogContent>
               <TextField
                  label="Location"
                  autoFocus
                  variant="outlined"
                  margin="normal"
                  value={this.state.location}
                  onChange={this.handleChange}
               />
            </DialogContent>
            <DialogActions style={{marginLeft: 16, marginRight: 16}}>
               <Button
                  onClick={
                     () => {
                        this.props.handleCloseChronicleUpdateLocationModal();
                     }
                  }
               > Cancel
               </Button>
               <Button
                  color="primary"
                  variant="contained"
                  onClick={
                     () => {
                        this.updChronicleCardLocation();
                        this.props.handleCloseChronicleUpdateLocationModal();
                     }
                  }
               > Ok
               </Button>
            </DialogActions>
         </Dialog>
      )
   }
}

export default connect('', actions)(ChronicleUpdateLocationModal);
