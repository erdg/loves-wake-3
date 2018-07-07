import React from 'react';
// import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import AppMenuItems from './AppMenuItems/';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import theme from 'theme';

const AppMenu = (props) => {
   return (
      <Drawer
         open={props.open}
         onClose={props.toggleMenu}
      >
         <div
            tabIndex={0}
            role="button"
            onKeyDown={props.toggleMenu}
         >
            <ListItem
               button
               onClick={props.toggleMenu}
               style={{
                  backgroundColor: theme.palette.primary.main,
               }}
            >
               <ListItemIcon>
                  <MenuIcon
                     style={{
                        color: theme.palette.secondary.main,
                        marginTop: 8,
                        marginBottom: 8
                     }}
                  />
               </ListItemIcon>
            </ListItem>
            <Divider />
            <AppMenuItems
               toggleMenu={props.toggleMenu}
            />
         </div>
      </Drawer>
   )
}

export default AppMenu;
