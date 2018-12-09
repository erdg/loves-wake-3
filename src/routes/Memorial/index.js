import React from 'react';
import { connect } from 'unistore/react';
import { actions } from 'store';
import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';

// import Divider from '@material-ui/core/Divider';

import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';

import AtlasIcon from 'components/icons/AtlasIcon';
import ChronicleIcon from 'components/icons/ChronicleIcon';
import ShrineIcon from 'components/icons/ShrineIcon';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import LimboIcon from '@material-ui/icons/Waves';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import FourPointStarIcon from 'components/icons/FourPointStar';

import Obituary from './Obituary';

import { link3 } from 'links';
import history from '../../history';

class Memorial extends React.Component {
   state = {
      subscribed: false
   }

   handleSubscribeClick = () => {
      this.setState({ subscribed: !this.state.subscribed });
   }

   componentDidMount () {
      !this.props.user.email && this.props.getUserData();
   }

   componentDidUpdate () {
      // to the top! weee!!
      window.scrollTo(0,0);
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
                     <div>
                        <div
                           style={{
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'center',
                              alignItems: 'center',
                              margin: '0 auto',
                              marginTop: 16,
                              marginBottom: 16,
                              width: '88%'
                           }}
                        >
                           <Avatar
                              src={memorial.avatar}
                              alt={memorial.nm}
                              style={{width: 160, height: 160}}
                           >{!memorial.avatar ? memorial.nm[0] : ''}
                           </Avatar>
                           <Typography variant="headline" style={{marginTop: 16, marginBottom: 16}} align="center">
                              {memorial.nm}
                           </Typography>
                           <Typography variant="subheading" style={{marginBottom: 8}}>
                              {/* e.g. 1956 - 2015 */}
                              {memorial.died ? 
                                 `${memorial.born.split(/[^\d]/).find(n => n.length === 4)}
                                 -
                                 ${memorial.died.split(/[^\d]/).find(n => n.length === 4)}`
                                 : 
                                 ''
                              }
                           </Typography>

                           <hr style={{width: '60%', color: '#eee'}}/>

                           <Typography variant="body1" color="primary"
                              style={{marginTop: 4, marginBottom: 4, display: 'flex', alignItems: 'center'}}
                           >
                              <FourPointStarIcon style={{fill: "#632B6C", paddingTop: 4, marginRight: 4}} />
                              {this.state.subscribed ?  134 : 133} people remember
                           </Typography>

                           
                           {this.state.subscribed ?
                              <Button
                                 onClick={() => this.handleSubscribeClick()}
                              >
                                 <CheckCircleIcon style={{marginRight: 4, color: 'green'}}/>
                                 Subscribed
                              </Button>
                                 :
                              <Button
                                 variant="outlined"
                                 size="large"
                                 style={{
                                    borderColor: link3,
                                    color: link3,
                                 }}
                                 onClick={() => this.handleSubscribeClick()}
                              >
                                 <AddCircleIcon style={{marginRight: 4}}/>
                                    Subscribe
                              </Button>
                           }
                        </div>
                           <Paper
                              square
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
                                    <ListItemText disableTypography >
                                       <Typography variant="subheading" style={{color: link3}}>
                                          Shrine
                                       </Typography>
                                    </ListItemText>
                                    <ListItemSecondaryAction
                                       onClick={() => history.push("/memorial/" + memorial.urlStr + "/" + memorial.urlNm + "/shrine")}
                                       style={{cursor: 'pointer', marginRight: 8}}
                                    >
                                       <ArrowForwardIcon style={{color: 'rgba(0, 0, 0, 0.54)'}}/>
                                    </ListItemSecondaryAction>
                                 </ListItem>
                                 <ListItem
                                    button
                                    onClick={() => history.push("/memorial/" + memorial.urlStr + "/" + memorial.urlNm + "/chronicle")}
                                 >
                                    <ListItemIcon>
                                       <ChronicleIcon />
                                    </ListItemIcon>
                                    <ListItemText disableTypography>
                                       <Typography variant="subheading" style={{color: link3}}>
                                          Chronicle
                                       </Typography>
                                    </ListItemText>
                                    <ListItemSecondaryAction
                                       onClick={() => history.push("/memorial/" + memorial.urlStr + "/" + memorial.urlNm + "/chronicle")}
                                       style={{cursor: 'pointer', marginRight: 8}}
                                    >
                                       <ArrowForwardIcon style={{color: 'rgba(0, 0, 0, 0.54)'}}/>
                                    </ListItemSecondaryAction>
                                 </ListItem>
                                 <ListItem
                                    button
                                    onClick={() => history.push("/memorial/" + memorial.urlStr + "/" + memorial.urlNm + "/atlas")}
                                 >
                                    <ListItemIcon>
                                       <AtlasIcon />
                                    </ListItemIcon>
                                    <ListItemText disableTypography >
                                       <Typography variant="subheading" style={{color: link3}}>
                                          Atlas
                                       </Typography>
                                    </ListItemText>
                                    <ListItemSecondaryAction
                                       onClick={() => history.push("/memorial/" + memorial.urlStr + "/" + memorial.urlNm + "/atlas")}
                                       style={{cursor: 'pointer', marginRight: 8}}
                                    >
                                       <ArrowForwardIcon style={{color: 'rgba(0, 0, 0, 0.54)'}}/>
                                    </ListItemSecondaryAction>
                                 </ListItem>
                              </List>
                           </Paper>

                           <Paper
                              elevation={2}
                              square
                              style={{
                                 background: '#eee',
                                 width: '100%',
                                 marginTop: 4 
                              }}
                           >
                              <List>
                                 <ListItem
                                    button
                                    onClick={() => history.push("/memorial/" + memorial.urlStr + "/" + memorial.urlNm + "/limbo")}
                                 >
                                    <ListItemIcon>
                                       <Badge
                                          badgeContent={memorial.items.filter(item => item.published === "false").length}
                                          color="secondary"
                                       >
                                          <LimboIcon style={{color: 'rgba(0, 0, 0, 0.54)'}}/>
                                       </Badge>
                                    </ListItemIcon>
                                    <ListItemText disableTypography >
                                       <Typography variant="body1">
                                          items currently in Limbo
                                       </Typography>
                                    </ListItemText>
                                    <ListItemSecondaryAction
                                       onClick={() => history.push("/memorial/" + memorial.urlStr + "/" + memorial.urlNm + "/limbo")}
                                       style={{cursor: 'pointer', marginRight: 8}}
                                    >
                                       <ArrowForwardIcon style={{color: 'rgba(0, 0, 0, 0.54)'}}/>
                                    </ListItemSecondaryAction>
                                 </ListItem>
                              </List>
                           </Paper>
                           
                           <Obituary 
                              name={memorial.nm}
                              memorialId={memorial.id}
                              obituary={memorial.obituaryText}
                           />
                        <div style={{margin: 16}}>
                           
                        </div>
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
