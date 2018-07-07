import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AddIcon from '@material-ui/icons/AddCircle';

import { withRouter } from 'react-router-dom';

import theme from '../../../theme';

const style = {
   color: theme.palette.primary.main
}

const CreateNewShrine = withRouter(({history, ...props}) => (
   <ListItem
      button
      onClick={
         () => {
            history.push("/create-memorial");
            props.toggleMenu();
         }
      }
   >
      <ListItemIcon>
         <AddIcon style={style} color="primary" />
      </ListItemIcon>
      <ListItemText primary="Create New Shrine" />
   </ListItem>
))

export default CreateNewShrine;
