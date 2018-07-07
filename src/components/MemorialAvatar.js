import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const styles = {
   container: {
      display: 'flex',
      alignItems: 'center'
   },
   avatar: {
   },
   name: {
      marginLeft: 8
   }
}

const MemorialAvatar = (props) => {
   return (
      <div style={props.style}>
         <div className={props.classes.container}>
            <Avatar
               className={props.classes.avatar}
               src={props.src}
               alt={props.name}
            >{!props.src ? props.name[0] : ''}
            </Avatar>
            <Typography
               className={props.classes.name}
               variant={props.variant || "title"}
            > {props.name}
            </Typography>
         </div>
         {props.children}
      </div>
   )
}

export default withStyles(styles)(MemorialAvatar);
