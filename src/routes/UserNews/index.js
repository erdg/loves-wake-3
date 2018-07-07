import React from 'react';
import Typography from '@material-ui/core/Typography';

const UserNews = (props) => {
   return (
      <div>
         <Typography variant="display1">
            User Notification Station
         </Typography>
         <Typography variant="body1">
            Activity feed, Inbox, everything new that the user cares about
         </Typography>
      </div>
   )
}

export default UserNews;

