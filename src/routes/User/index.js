import React from 'react';
import { connect } from 'unistore/react';
import { actions } from 'store';
import Typography from '@material-ui/core/Typography';
import MemorialList from './MemorialList';
import ConfirmAccountModal from './ConfirmAccountModal';
import Button from '@material-ui/core/Button';
import history from '../../history';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import HeartIcon from '@material-ui/icons/Favorite';
import SearchIcon from '@material-ui/icons/Search';
import GroupIcon from '@material-ui/icons/Group';
import AddPhotoIcon from '@material-ui/icons/AddPhotoAlternate';
import SettingsIcon from '@material-ui/icons/Settings';
import Divider from '@material-ui/core/Divider';

class User extends React.Component {
   state = {
      showConfirmAccountModal: true
   }

   componentDidMount () {
      !this.props.user.email && this.props.getUserData();
   }

   closeConfirmAccountModal = () => {
      this.setState({ showConfirmAccountModal: false })
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
            <ConfirmAccountModal
               open={this.props.user.confirmed && this.props.user.confirmed !== 'true' ? true : false}
               closeConfirmAccountModal={this.closeConfirmAccountModal}
            />
            <div style={{width: '88%', margin: '0 auto', marginBottom: 8}}>
               <Typography variant="headline">
                  Welcome to Love's Wake
               </Typography>
               <Typography variant="caption" paragraph >
                  Logged in as '{this.props.user.email}'
               </Typography>
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
                     onClick={() => history.push("/create-memorial")}
                  >
                     <ListItemIcon>
                        <HeartIcon />
                     </ListItemIcon>
                     <ListItemText disableTypography >
                        <Typography variant="subheading" >
                           Create a Memorial
                        </Typography>
                     </ListItemText>
                  </ListItem>
                  <ListItem
                     button
                  >
                     <ListItemIcon>
                        <GroupIcon />
                     </ListItemIcon>
                     <ListItemText disableTypography>
                        <Typography variant="subheading" >
                           Contribute to a Memorial
                        </Typography>
                     </ListItemText>
                  </ListItem>
                  <ListItem
                     button
                  >
                     <ListItemIcon>
                        <SearchIcon />
                     </ListItemIcon>
                     <ListItemText disableTypography >
                        <Typography variant="subheading" >
                           Search for a Memorial
                        </Typography>
                     </ListItemText>
                  </ListItem>
                  <Divider />
                  <ListItem
                     button
                     onClick={() => history.push("/user/settings")}
                  >
                     <ListItemIcon>
                        <SettingsIcon />
                     </ListItemIcon>
                     <ListItemText disableTypography >
                        <Typography variant="subheading" >
                           Account Settings
                        </Typography>
                     </ListItemText>
                  </ListItem>
               </List>
            </Paper>
            <div style={{width: '88%', margin: '0 auto'}}>
               <MemorialList memorials={this.props.user.memorials || []} />
            </div>
         </div>
      )
   }
}

export default connect('loginToken, user', actions)(User);
