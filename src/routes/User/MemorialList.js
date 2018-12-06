import React from 'react';
import history from '../../history';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import MemorialAvatar from 'components/MemorialAvatar';

const MemorialList = (props) => (
   <div>
      <Typography variant="title">
         Memorials
      </Typography>
      {props.memorials.length === 0 ?
         <div>
            <Typography variant="body1">
               You have not created a memorial yet.
            </Typography>
            <Button
               onClick={() => history.push("/create-memorial")}
            > Create a memorial
            </Button>
         </div>
            :
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
      }
   </div>
)

export default MemorialList;
