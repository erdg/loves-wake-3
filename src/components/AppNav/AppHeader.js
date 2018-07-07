import React from 'react';
import { connect } from 'unistore/react';
import { actions } from 'store';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';
import Zoom from '@material-ui/core/Zoom';

const AppHeader = (props) => (
   <AppBar id="AppHeader">
      <Toolbar>
         <IconButton
            onClick={props.toggleMenu}
            color="inherit"
            aria-label="Menu"
            style={{
               marginLeft: -12
            }}
         > <MenuIcon />
         </IconButton>
         <Zoom
            in={props.secondaryAppHeader && !props.secondaryAppHeaderVisible}
            timeout={250}
            unmountOnExit
         >
            <IconButton
               color="inherit"
               onClick={props.showSecondaryAppHeader}
               style={{
                  marginLeft: 'auto',
                  marginRight: -12 
               }}
            >
               <UnfoldMoreIcon />
            </IconButton>
         </Zoom>
     </Toolbar>
  </AppBar>
)

export default connect('secondaryAppHeader, secondaryAppHeaderVisible', actions)(AppHeader);
