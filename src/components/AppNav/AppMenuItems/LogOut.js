import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PowerIcon from '@material-ui/icons/PowerSettingsNew';

import theme from '../../../theme';

const style = {
   color: theme.palette.primary.main
}

const LogOut = (props) => (
   <ListItem button>
      <ListItemIcon>
         <PowerIcon style={style} color="primary" />
      </ListItemIcon>
      <ListItemText primary="Log Out" />
   </ListItem>
)

export default LogOut;
