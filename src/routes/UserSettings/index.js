import React from 'react';
import { actions } from 'store';
import { connect } from 'unistore/react';
// import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import UpdatePasswordDialog from './UpdatePasswordDialog';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import LockIcon from '@material-ui/icons/Lock';

class UserSettings extends React.Component {
   state = {
      showUpdatePasswordDialog: false
   }

   componentDidMount () {
      !this.props.user.email && this.props.getUserData();
   }

   showUpdatePasswordDialog = () => {
      this.setState({ showUpdatePasswordDialog: true })
   }

   hideUpdatePasswordDialog = () => {
      this.setState({ showUpdatePasswordDialog: false })
   }

   render () {
      return (
         <div 
            style={{
               display: 'flex',
               flexDirection: 'column',
               alignItems: 'center',
               width: '100%',
               marginTop: 24
            }}
         >
            <div style={{width: '88%', margin: '0 auto', marginBottom: 8}}>
               <Typography variant="headline">
                  Account Settings
               </Typography>
               <UpdatePasswordDialog
                  open={this.state.showUpdatePasswordDialog}
                  hideUpdatePasswordDialog={this.hideUpdatePasswordDialog}
               />
            </div>
            <Paper
               square
               elevation={2}
               style={{
                  width: '100%',
               }}
            >
               <List
               >
                  <ListItem
                     button
                     onClick={this.showUpdatePasswordDialog}
                  >
                     <ListItemIcon>
                        <LockIcon />
                     </ListItemIcon>
                     <ListItemText disableTypography >
                        <Typography variant="subheading" >
                           Update Password
                        </Typography>
                     </ListItemText>
                  </ListItem>
               </List>
            </Paper>
         </div>
      )
   }
}

export default connect('user', actions)(UserSettings);
