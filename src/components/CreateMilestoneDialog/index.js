import React from 'react';
import { actions, API_ENDPOINT } from 'store';
import { connect } from 'unistore/react';
import theme from 'theme';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

class CreateMilestoneDialog extends React.Component {
   state = {
   }

   render () {
      return (
         <Dialog
            open={this.props.showCreateMilestoneDialog}
            onClose={
               () => {
                  this.props.closeCreateMilestoneDialog();
               }
            }
            fullScreen={this.props.fullScreen}
            fullScreen
         >
            <DialogTitle
               disableTypography
               style={{
                  background: theme.palette.primary.dark,
                  display: 'flex',
                  padding: 12
               }}
            >
               <div style={{width: '100%', display: 'flex', alignItems: 'center'}}>
                  <IconButton
                     onClick={
                        () => {
                           // this.handleClearFields();
                           this.props.closeCreateMilestoneDialog();
                        }
                     }
                  > <CloseIcon style={{color: 'white'}}/>
                  </IconButton>
                  <Typography
                     variant="headline"
                     style={{
                        color: 'white',
                        display: 'inline',
                        marginLeft: 16 
                     }}
                  > New Milestone
                  </Typography>
               </div>
            </DialogTitle>
         </Dialog>
      )
   }
}

export default connect('showCreateMilestoneDialog', actions)(withMobileDialog()(CreateMilestoneDialog));
