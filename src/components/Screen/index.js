import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const styles = {
   root: {
      display: 'flex',
      justifyContent: 'center'
   }
}

function Screen (props) {
   return (
      <div id="screen" className={props.classes.root}>
         <Grid container >
            {props.children}
         </Grid>
      </div>
   );
}

export default withStyles(styles)(Screen);
