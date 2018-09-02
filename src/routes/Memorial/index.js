import React from 'react';
import { connect } from 'unistore/react';
import { actions } from 'store';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';


import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import history from '../../history';

class Memorial extends React.Component {
   state = {
   }

   render () {
      let memorial = this.props.user.memorials.find((m) => (
         m.urlStr === this.props.match.params.urlStr && m.urlNm === this.props.match.params.urlNm
      ));

      return (
         <div
            style={{
               width: '100%',
            }}
         >
            { this.props.match.isExact &&
               <div
                  style={{
                     display: 'flex',
                     flexDirection: 'column',
                     justifyContent: 'center',
                     alignItems: 'center',
                     margin: 16
                  }}
               >
                  <Avatar
                     src={memorial.avatar}
                     alt={memorial.nm}
                     style={{width: 200, height: 200}}
                  >{!memorial.avatar ? memorial.nm[0] : ''}
                  </Avatar>
                  <Typography variant="title" style={{marginTop: 16, marginBottom: 16}}>
                     {memorial.nm}
                  </Typography>
                  <Typography variant="body1" style={{marginBottom: 16}}>
                     {memorial.obituaryText}
                  </Typography>
                  <List>
                     <ListItem
                        button
                        onClick={() => history.push("/memorial/" + memorial.urlStr + "/" + memorial.urlNm + "/shrine")}
                     >
                        <ListItemText>
                           Shrine
                        </ListItemText>
                        <ListItemSecondaryAction>
                           <ArrowForwardIcon />
                        </ListItemSecondaryAction>
                     </ListItem>
                     <ListItem
                        button
                        onClick={() => history.push("/memorial/" + memorial.urlStr + "/" + memorial.urlNm + "/chronicle")}
                     >
                        <ListItemText>
                           Chronicle
                        </ListItemText>
                        <ListItemSecondaryAction>
                           <ArrowForwardIcon />
                        </ListItemSecondaryAction>
                     </ListItem>
                     <ListItem
                        button
                        onClick={() => history.push("/memorial/" + memorial.urlStr + "/" + memorial.urlNm + "/atlas")}
                     >
                        <ListItemText>
                           Atlas
                        </ListItemText>
                        <ListItemSecondaryAction>
                           <ArrowForwardIcon />
                        </ListItemSecondaryAction>
                     </ListItem>
                     <ListItem
                        button
                        onClick={() => history.push("/memorial/" + memorial.urlStr + "/" + memorial.urlNm + "/moderation")}
                     >
                        <ListItemText>
                           Content Moderation
                        </ListItemText>
                        <ListItemSecondaryAction>
                           <ArrowForwardIcon />
                        </ListItemSecondaryAction>
                     </ListItem>
                  </List>
               </div>
            }
         </div>
      )
   }
}

export default connect('user', actions)(Memorial);
