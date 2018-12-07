import React from 'react';
import history from '../../history';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import MemorialAvatar from 'components/MemorialAvatar';

const MemorialList = (props) => (
   <div 
      style={{
         minHeight: 24,
         alignSelf: 'flex-start',
      }}
   >
      {props.memorials.length > 0 &&
         <div>
            <Typography variant="title" style={{marginTop: 24}}>
               My Memorials
            </Typography>
            <List style={{marginLeft: -14}}>
               {props.memorials.map((m, i) => (
                  <ListItem key={i}
                     button
                     onClick={() => history.push("/memorial/" + m.urlStr + "/" + m.urlNm)}
                  >
                     <MemorialAvatar src={m.avatar} name={m.nm} variant="subheading" />
                  </ListItem>
               ))}
            </List>
         </div>
      }
   </div>
)

export default MemorialList;
