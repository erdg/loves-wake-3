import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';
import { withRouter } from 'react-router-dom';

const testData = 4;

const Inbox = withRouter(({history, ...props}) => (
   <ListItem
      button
      onClick={
         () => {
            history.push("/user/news");
            props.toggleMenu();
         }
      }
   >
      <ListItemIcon>
         <Badge badgeContent={testData} color="secondary">
            <MailIcon color="primary" />
         </Badge>
      </ListItemIcon>
      <ListItemText primary="Inbox" />
   </ListItem>
))

export default Inbox;
