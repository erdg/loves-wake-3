import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import AppMenuItems from './AppMenuItems/';

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
            <AppMenuItems
               toggleMenu={props.toggleMenu}
            />
         </div>
      </Drawer>
   )
}

export default AppMenu;
