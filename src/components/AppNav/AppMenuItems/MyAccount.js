import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SettingsIcon from '@material-ui/icons/Settings';
import { withRouter } from 'react-router-dom';

import theme from '../../../theme';

const style = {
   color: theme.palette.primary.main
}

const MyAccount = withRouter(({history, ...props}) => (
   <ListItem
      button
      onClick={
         () => {
            history.push("/user");
            props.toggleMenu();
         }
      }
   >
      <ListItemIcon>
         <SettingsIcon style={style} color="primary" />
      </ListItemIcon>
      <ListItemText primary="My Account" />
   </ListItem>
))

export default MyAccount;
