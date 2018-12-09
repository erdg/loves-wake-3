import React from 'react';
import { connect } from 'unistore/react';
import { actions } from 'store';
import Paper from '@material-ui/core/Paper';
// import Tabs from '@material-ui/core/Tabs';
// import Tab from '@material-ui/core/Tab';
import Badge from '@material-ui/core/Badge';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Slide from '@material-ui/core/Slide';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';

import IconButton from '@material-ui/core/IconButton';
// import SettingsIcon from '@material-ui/icons/Settings';
// import UnfoldLessIcon from '@material-ui/icons/UnfoldLess';
// import CloseIcon from '@material-ui/icons/Close';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import NewReleasesIcon from '@material-ui/icons/NewReleases';

import LimboIcon from '@material-ui/icons/Waves';
import ChronicleFab from 'routes/Chronicle/ChronicleFab';
import EventsIcon from '@material-ui/icons/Assignment';

import history from '../../history';

class LimboHeader extends React.Component {
   state = {
      showSettingsMenu: false,
      showEvents: false,
      visible: true,
      positionToggled: false
   }

   componentDidMount () {
      // this is quickly becoming a mountain of hacks.
      // should REALLY just figure out how to put all the shit together 
      // in one headroom component.
      
      // fixes issue of first card being obscure by the menu..
      // could just put a margin on top of the list of chronicle cards
      window.onscroll = () => {
         if (window.pageYOffset < 56) {
            if (this.state.positionToggled) {
               this.setState({ positionToggled: false })
            }
         }
      }
      // latest idea is to use a MutationObserver to watch for class
      // changes on headroom header. I will find a workaround!!
      //
      // THIS WORKS!! and works pretty well, i might add
      
      // also would like to have the chronicle add item fab synced to
      // this too, so it hides when scrolling down. easiest will be to
      // copy and paste this code, but the right way would be to refactor
      // everything so it's all in the store, and the memorial tabs are 
      // contained within the Headroom header.
      //
      // but realistically, i'll take on the technical debt and do it the
      // hacky way for now until the experience is settled upon. move fast,
      // break shit, write incomprehensible code, amirite? it sure is pretty
      // though.

      // observer to watch classes on AppBar
      this.observer = new MutationObserver(observerCallback);
      this.observer.observe(document.getElementById('AppHeader'), {
         attributes: true,
         atrributeFilter: ['class']
      });
      var that = this;
      // when headroom is visible, make the secondary header visible
      function observerCallback (mutations, observer) {
         mutations.forEach((e) => {
            // console.log(e.target.classList);
            if (e.target.classList.contains('headroom--unpinned') && that.state.visible && window.pageYOffset > 126) {
               that.setState({ visible: false })
            }
            if (e.target.classList.contains('headroom--pinned') && window.pageYOffset > 126) {
               that.setState({ visible: true })
               if(!that.state.positionToggled) {
                  setTimeout(() => {that.setState({ positionToggled: true })}, 200);
               }
            }
         })
      }
   }

   componentWillUnmount () {
      window.onscroll = false;
      this.observer.disconnect();
   }

   // handleSettingsMenuClick = () => {
   //    this.setState({ showSettingsMenu: !this.state.showSettingsMenu })
   // }

   handleEventsClick = () => {
      this.setState({ showEvents: !this.state.showEvents })
   }

   render () {
      return (
         <Slide
            in={
               !this.state.positionToggled ? true :
                  this.state.visible ? true : false
            }
         >
            <Paper
               id="MemorialHeader"
               elevation={4}
               square
               style={{
                  position: (this.state.positionToggled ? 'fixed' : 'relative'),
                  zIndex: 1,
                  width: '100%',
               }}
            >
               <div
                  style={{
                     display: 'flex',
                     width: '100%',
                     maxWidth: 600,
                     margin: '0 auto',
                     paddingTop: 8,
                     paddingBottom: 8,
                     alignItems: 'center'
                  }}
               >
                  <IconButton
                     onClick={() => {history.goBack()}}
                  >
                     <ArrowBackIcon />
                  </IconButton>
                  <div style={{marginLeft: 16, paddingTop: 3}}>
                     <LimboIcon fill='rgba(0,0,0,0.54)' />
                  </div>
                  <Typography variant="subheading" style={{paddingLeft: 8}}>
                     Limbo
                  </Typography>
                  <div style={{marginLeft: 'auto'}}>
                     <ChronicleFab memorial={this.props.memorial}/>
                  </div>
                  <IconButton
                     onClick={this.handleEventsClick}
                     style={{marginRight: 4}}
                  >
                     {this.props.memorial.events && this.props.memorial.events.length > 0 ? 
                        <Badge badgeContent={this.props.memorial.events.length} color="secondary">
                           <EventsIcon />
                        </Badge>
                           :
                        <EventsIcon />
                     }
                  </IconButton>
               </div>
               <Collapse in={this.state.showEvents}>
                  <Divider />
                  <div
                     style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                        maxWidth: 600,
                        padding: 8,
                        margin: '0 auto',
                     }}
                  >
                     {this.props.memorial.events && this.props.memorial.events.length > 0 ?
                        <List>
                           {this.props.memorial.events.map((event, i) => (
                              <ListItem
                                 key={i}
                                 button
                                 onClick={
                                    () => {
                                       document.getElementById(`chronicleCard${event.itemId}`).scrollIntoView({
                                          behavior: 'smooth',
                                          block: 'center'
                                       })
                                    }
                                 }
                              >
                                 <ListItemIcon>
                                    <NewReleasesIcon />
                                 </ListItemIcon>
                                 <ListItemText primary={event.text} />
                              </ListItem>
                           ))}
                        </List>
                           :
                        <Typography variant="subheading">
                           Nothing to review
                        </Typography>
                     }
                  </div>
               </Collapse>
               <Divider />
            </Paper>
         </Slide>
      )
   }
}

export default connect('secondaryAppHeaderVisible', actions)(LimboHeader);
