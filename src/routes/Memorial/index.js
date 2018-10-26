import React from 'react';
import { connect } from 'unistore/react';
import { actions } from 'store';
import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';

import Divider from '@material-ui/core/Divider';

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
                              margin: '16px 0px'
                           }}
                        >
                           <Avatar
                              src={memorial.avatar}
                              alt={memorial.nm}
                              style={{width: 160, height: 160}}
                           >{!memorial.avatar ? memorial.nm[0] : ''}
                           </Avatar>
                           <Typography variant="title" style={{marginTop: 16, marginBottom: 16}}>
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
                                 style={{borderColor: link3, color: link3}}
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
                                    <ListItemText disableTypography>
                                       <Typography variant="subheading" style={{color: link3}}>
                                          Chronicle
                                       </Typography>
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
                                    <ListItemText disableTypography >
                                       <Typography variant="subheading" style={{color: link3}}>
                                          Atlas
                                       </Typography>
                                    </ListItemText>
                                    <ListItemSecondaryAction
                                       onClick={() => history.push("/memorial/" + memorial.urlStr + "/" + memorial.urlNm + "/atlas")}
                                       style={{cursor: 'pointer', marginRight: 8}}
                                    >
                                       <ArrowForwardIcon />
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
                                          <LimboIcon />
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
                                       <ArrowForwardIcon />
                                    </ListItemSecondaryAction>
                                 </ListItem>
                              </List>
                           </Paper>
                           {/*
                           <Typography variant="body1" style={{marginTop: 24}}>
                              {memorial.obituaryText}
                           </Typography>
                           */}
                        <div style={{margin: 16}}>
                           <Typography variant="subheading" style={{marginTop: 24}} paragraph align="left">
                              Obituary
                           </Typography>

                           <Typography variant="body1" paragraph >
                              After being diagnosed with cancer just 5 months ago, Karen was called to heaven on February 7th.  She is survived by husband, Bill Fox; children, Kara Galvin (Dan), Nick and Chris Fox; grandchildren Luca and Milo Galvin; mother, Anne Olson; and sisters, Susan Johnson, Sharon Stomberg, and Debbi Manley.
                           </Typography>

                           <Typography variant="body1" paragraph >
                           Karen was an active member of her community as a Language Arts teacher at Edgewood Middle School and a volunteer at her church, Feed My Starving Children, and Special Olympics.  Her lush gardens and warm home glowed with hospitality for people, pets, songbirds, and butterflies. She lived for time spent with friends and family there; sharing good food, red wine, and laughter. Karen’s sparkling brown eyes, contagious laugh, moral compass, and understated intelligence will be missed by everyone she knew. We are all better for the time she spent with us.
                           </Typography>

                           <Typography variant="body1" paragraph >
                           A memorial service will be held at Incarnation Lutheran Church, 4880 Hodgson Road in Shoreview on Friday, February 20. Visitation from 3:00pm with the service starting at 5:00pm. 
                           </Typography>

                           <Typography variant="body1" >
                              Memorials to Special Olympics Minnesota.
                           </Typography>
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
