import React from 'react';
import { connect } from 'unistore/react';
import { actions } from 'store';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
// import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
// import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';
// import Zoom from '@material-ui/core/Zoom';
// import Typography from '@material-ui/core/Typography';
import Headroom from 'react-headroom';
import { withRouter } from 'react-router';
// import history from '../../history';

import ShrineHeader from './ShrineHeader';
import ChronicleHeader from './ChronicleHeader';
import AtlasHeader from './AtlasHeader';
import LimboHeader from './LimboHeader';
import theme from 'theme';

const AppHeader = (props) => {
   return (
   <div>
      {props.user.email &&
         <Headroom id="AppHeader"
            upTolerance={10}
         >
            <AppBar position="static" style={{background: theme.palette.primary.dark}}>
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
                  {props.location.pathname.split('/').includes('shrine') &&
                     <ShrineHeader />
                  }
                  {props.location.pathname.split('/').includes('chronicle') &&
                     <ChronicleHeader />
                  }
                  {props.location.pathname.split('/').includes('atlas') &&
                     <AtlasHeader />
                  }
                  {props.location.pathname.split('/').includes('limbo') &&
                     <LimboHeader />
                  }
              </Toolbar>
           </AppBar>
        </Headroom>
      }
   </div>
   )
}

export default connect('user', actions)(withRouter(AppHeader));
