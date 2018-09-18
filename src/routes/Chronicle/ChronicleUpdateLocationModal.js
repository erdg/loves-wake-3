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
   }

   updChronicleCardLocation = () => {
      // fix this
      fetch(API_ENDPOINT + "!delChronicle", {
         method: "POST",
         body: JSON.stringify({
            id: this.state.id,
            loginToken: window.sessionStorage.getItem('loginToken')
         })
      })
      .then(res => res.json())
      .then(json => {
         if (json.error) {
            alert(json.error);
         } else {
            this.props.handleCloseMenu();
            // update store
            this.props.delChronicleItem(this.state.id, this.props.memorialId);
         }
      })
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
               Add a location to Card {this.props.id}
            </DialogTitle>
            <DialogContent>
               <TextField placeholder="Add a location" />
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
                     }
                  }
               > Add
               </Button>
            </DialogActions>
         </Dialog>
      )
   }
}

export default connect('', actions)(ChronicleUpdateLocationModal);
