import React from 'react';
import history from '../../history';
import { connect } from 'unistore/react';
import { actions } from 'store';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';
import Zoom from '@material-ui/core/Zoom';
import Headroom from 'react-headroom';

const AppHeader = (props) => (
   <div>
      {props.user.email &&
         <Headroom id="AppHeader">
            <AppBar position="static">
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
              </Toolbar>
           </AppBar>
        </Headroom>
      }
   </div>
)

export default connect('user', actions)(AppHeader);
