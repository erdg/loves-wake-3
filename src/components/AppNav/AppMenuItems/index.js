import React from 'react';

import Divider from '@material-ui/core/Divider';

import ActivityFeed from './ActivityFeed';
import Inbox from './Inbox';
import Shrines from './Shrines';
import Search from './Search';
import CreateNewShrine from './CreateNewShrine';
import MyAccount from './MyAccount';
import LogOut from './LogOut';

const AppMenuItems = (props) => {
   return (
      <div>
         <ActivityFeed toggleMenu={props.toggleMenu} />
         <Divider />
         <Inbox toggleMenu={props.toggleMenu} />
         <Divider />
         <Shrines toggleMenu={props.toggleMenu} />
         <Divider />
         <Search toggleMenu={props.toggleMenu} />
         <Divider />
         <CreateNewShrine toggleMenu={props.toggleMenu} />
         <Divider />
         <MyAccount toggleMenu={props.toggleMenu} />
         <Divider />
         <LogOut toggleMenu={props.toggleMenu} />
         <Divider />
      </div>
   );
}

export default AppMenuItems;
