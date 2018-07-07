import React from 'react';
import history from '../../history';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import MemorialAvatar from 'components/MemorialAvatar';

const MemorialList = (props) => (
   <div>
      <Typography variant="title">
         Memorials
      </Typography>
      <List>
         {props.memorials.map((m, i) => (
            <ListItem key={i}
               dense
               button
               onClick={() => history.push("/memorial/" + m.urlStr + "/" + m.urlNm)}
            >
               <MemorialAvatar src={m.avatar} name={m.nm} variant="subheading" />
            </ListItem>
         ))}
      </List>
   </div>
)

export default MemorialList;
