import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Badge from '@material-ui/core/Badge';
import MessageIcon from '@material-ui/icons/Message';

import { withRouter } from 'react-router-dom';

const testData = 15;

const ActivityFeed = withRouter(({history, ...props}) => (
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
            <MessageIcon color="primary" />
         </Badge>
      </ListItemIcon>
      <ListItemText primary="Activity Feed" />
   </ListItem>
))

export default ActivityFeed;
