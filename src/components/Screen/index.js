import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const styles = {
   root: {
      marginTop: (window.screen.availWidth < 600 ? 56 : 64),
      display: 'flex',
      justifyContent: 'center'
   }
}

function Screen (props) {
   return (
      <div id="screen" className={props.classes.root}>
         <Grid container style={{maxWidth: 900}}>
            {props.children}
         </Grid>
      </div>
   );
}

export default withStyles(styles)(Screen);
