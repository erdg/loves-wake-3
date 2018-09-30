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

class ChronicleUpdateStoryModal extends React.Component {
   state = {
      id: this.props.id,
      story: (this.props.item.txt ? this.props.item.txt.split("^J^J").join('\n') : ''),
   }

   handleChange = (e) => {
      this.setState({ story: e.target.value })
   }

   updChronicleCardStory = () => {
      this.props.updChronicleCardStory(this.props.id, this.props.memorialId, this.state.story);
   }

   render () {
      return (
         <Dialog
            open={this.props.showChronicleUpdateStoryModal}
            fullScreen={this.props.fullScreen}
            onClose={
               () => {
                  this.props.handleCloseChronicleUpdateStoryModal();
               }
            }
         >
            <DialogTitle>
               Add/Edit Story
            </DialogTitle>
            <DialogContent>
               <TextField
                  label="Story"
                  autoFocus
                  variant="outlined"
                  margin="normal"
                  multiline
                  rows={12}
                  value={this.state.story}
                  onChange={this.handleChange}
                  style={{width: '100%'}}
               />
            </DialogContent>
            <DialogActions style={{marginLeft: 16, marginRight: 16}}>
               <Button
                  onClick={
                     () => {
                        this.props.handleCloseChronicleUpdateStoryModal();
                     }
                  }
               > Cancel
               </Button>
               <Button
                  color="primary"
                  variant="contained"
                  onClick={
                     () => {
                        this.updChronicleCardStory()
                        this.props.handleCloseChronicleUpdateStoryModal();
                     }
                  }
               > Ok
               </Button>
            </DialogActions>
         </Dialog>
      )
   }
}

export default connect('', actions)(withMobileDialog()(ChronicleUpdateStoryModal));
