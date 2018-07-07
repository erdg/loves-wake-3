import React from 'react';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SearchIcon from '@material-ui/icons/Search';
import theme from 'theme';

import { withRouter } from 'react-router-dom';

const style = {
   color: theme.palette.primary.main
}

const Search = withRouter(
   ({history, ...props}) => (
      <ListItem
         button
         onClick={
            () => {
               history.push("/search");
               props.toggleMenu();
            }
         }
      >
         <ListItemIcon>
            <SearchIcon
               style={style}
               color="primary"
            />
         </ListItemIcon>
         <ListItemText
            primary="Search"
         />
      </ListItem>
   )
)

export default Search;
