import React from 'react';
import { connect } from 'unistore/react';
import { actions } from 'store';
import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';

import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';


import AtlasIcon from 'components/icons/AtlasIcon';
import ChronicleIcon from 'components/icons/ChronicleIcon';
import ShrineIcon from 'components/icons/ShrineIcon';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import LimboIcon from '@material-ui/icons/Flip';

import history from '../../history';

class Memorial extends React.Component {
   state = {
   }

   componentDidMount () {
      !this.props.user.email && this.props.getUserData();
   }

   componentDidUpdate () {
      let memorial =
         this.props.user.memorials ?
            this.props.user.memorials.find((m) => (
               m.urlStr === this.props.match.params.urlStr && m.urlNm === this.props.match.params.urlNm
            )) 
         : 
         {};

      // if memorial is not in user data, fetch (as guest) from DB
      if (!memorial) {
         this.props.getMemorial(this.props.match.params.urlStr, this.props.match.params.urlNm); 
      }
   }

   render () {
      let memorial =
         this.props.user.memorials ?
            this.props.user.memorials.find((m) => (
               m.urlStr === this.props.match.params.urlStr && m.urlNm === this.props.match.params.urlNm
            )) 
         : 
         {};

      if (memorial) {
      return (
         <div
            style={{
               width: '100%',
            }}
         >
            { this.props.match.isExact &&
               <div
               >
                  {memorial.nm &&
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
                           style={{width: 160, height: 160}}
                        >{!memorial.avatar ? memorial.nm[0] : ''}
                        </Avatar>
                        <Typography variant="title" style={{marginTop: 24, marginBottom: 24}}>
                           {memorial.nm}
                        </Typography>
                        <Typography variant="subheading" style={{marginBottom: 24}}>
                           {/* e.g. 1956 - 2015 */}
                           {memorial.died ? 
                              `${memorial.born.split(/[^\d]/).find(n => n.length === 4)}
                              -
                              ${memorial.died.split(/[^\d]/).find(n => n.length === 4)}`
                              : 
                              ''
                           }
                        </Typography>
                        <Paper
                           elevation={2}
                           style={{
                              width: '100%',
                           }}
                        >
                           <List
                           >
                              <ListItem
                                 button
                                 onClick={() => history.push("/memorial/" + memorial.urlStr + "/" + memorial.urlNm + "/shrine")}
                              >
                                 <ListItemIcon>
                                    <ShrineIcon />
                                 </ListItemIcon>
                                 <ListItemText>
                                    Shrine
                                 </ListItemText>
                                 <ListItemSecondaryAction
                                    onClick={() => history.push("/memorial/" + memorial.urlStr + "/" + memorial.urlNm + "/shrine")}
                                    style={{cursor: 'pointer', marginRight: 8}}
                                 >
                                    <ArrowForwardIcon />
                                 </ListItemSecondaryAction>
                              </ListItem>
                              <ListItem
                                 button
                                 onClick={() => history.push("/memorial/" + memorial.urlStr + "/" + memorial.urlNm + "/chronicle")}
                              >
                                 <ListItemIcon>
                                    <ChronicleIcon />
                                 </ListItemIcon>
                                 <ListItemText>
                                    Chronicle
                                 </ListItemText>
                                 <ListItemSecondaryAction
                                    onClick={() => history.push("/memorial/" + memorial.urlStr + "/" + memorial.urlNm + "/chronicle")}
                                    style={{cursor: 'pointer', marginRight: 8}}
                                 >
                                    <ArrowForwardIcon />
                                 </ListItemSecondaryAction>
                              </ListItem>
                              <ListItem
                                 button
                                 onClick={() => history.push("/memorial/" + memorial.urlStr + "/" + memorial.urlNm + "/atlas")}
                              >
                                 <ListItemIcon>
                                    <AtlasIcon />
                                 </ListItemIcon>
                                 <ListItemText>
                                    Atlas
                                 </ListItemText>
                                 <ListItemSecondaryAction
                                    onClick={() => history.push("/memorial/" + memorial.urlStr + "/" + memorial.urlNm + "/atlas")}
                                    style={{cursor: 'pointer', marginRight: 8}}
                                 >
                                    <ArrowForwardIcon />
                                 </ListItemSecondaryAction>
                              </ListItem>
                              <ListItem
                                 button
                                 onClick={() => history.push("/memorial/" + memorial.urlStr + "/" + memorial.urlNm + "/limbo")}
                              >
                                 <ListItemIcon>
                                    <LimboIcon />
                                 </ListItemIcon>
                                 <ListItemText>
                                    Limbo
                                 </ListItemText>
                                 <ListItemSecondaryAction
                                    onClick={() => history.push("/memorial/" + memorial.urlStr + "/" + memorial.urlNm + "/limbo")}
                                    style={{cursor: 'pointer', marginRight: 8}}
                                 >
                                    <ArrowForwardIcon />
                                 </ListItemSecondaryAction>
                              </ListItem>
                           </List>
                        </Paper>
                        <Typography variant="body1" style={{marginTop: 24}}>
                           {memorial.obituaryText}
                        </Typography>
                     </div>
                  }
               </div>
            }
         </div>
      )
      }
      else {
         return <div>Loading</div>
      }
   }
}

export default connect('user, loading', actions)(Memorial);
