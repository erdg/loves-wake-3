import React from 'react';

import AppHeader from './AppHeader';
import AppMenu from './AppMenu';

class AppNav extends React.Component {
   state = {
      open: false,
   };

   toggleMenu = () => {
      this.setState({
         open: !this.state.open
      });
   };

   render() {
      return (
         <div>
            <AppHeader
               toggleMenu={this.toggleMenu}
            />
            <AppMenu
               open={this.state.open}
               toggleMenu={this.toggleMenu}
            />
         </div>
      );
   }
}

export default AppNav;
