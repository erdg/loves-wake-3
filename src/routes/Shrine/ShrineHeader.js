import React from 'react';
import { connect } from 'unistore/react';
import { actions } from 'store';
import Paper from '@material-ui/core/Paper';
// import Tabs from '@material-ui/core/Tabs';
// import Tab from '@material-ui/core/Tab';
import Divider from '@material-ui/core/Divider';
import Slide from '@material-ui/core/Slide';
// import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';

import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';
// import UnfoldLessIcon from '@material-ui/icons/UnfoldLess';
import CloseIcon from '@material-ui/icons/Close';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import ShrineIcon from 'components/icons/ShrineIcon';

import history from '../../history';

class ShrineHeader extends React.Component {
   state = {
      showSettingsMenu: false,
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
                  marginTop: (this.state.positionToggled ? -16 : 'unset')
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
                     <ShrineIcon fill='rgba(0,0,0,0.54)' />
                  </div>
                  <Typography variant="subheading" style={{paddingLeft: 8}}>
                     Shrine
                  </Typography>
                  {/*
                  <MemorialAvatar
                     src={this.props.memorial.avatar}
                     name={`${this.props.memorial.nm1}'s Chronicle`}
                     style={{
                        paddingLeft: 16
                     }}
                  />
                  */}
                  <IconButton
                     onClick={this.handleSettingsMenuClick}
                     style={{marginLeft: 'auto'}}
                  > {this.state.showSettingsMenu ? <CloseIcon /> : <SettingsIcon/>}
                  </IconButton>
               </div>
               {/*
               <Collapse in={this.state.showSettingsMenu} style={{margin: 8}}>
                  <Typography variant="subheading">
                     Memorial Settings
                  </Typography>
                  <Typography variant="body1">
                     This will be a small settings menu, with a link to the
                     full memorial settings page
                  </Typography>
               </Collapse>
               */}
               {/*
               <Tabs
                  value={this.props.view}
                  onChange={this.props.handleTabChange}
                  indicatorColor="primary"
                  textColor="primary"
                  fullWidth
                  centered
               >
                  <Tab label="Shrine" value="S" />
                  <Tab label="Chronicle" value="C" />
                  <Tab label="Atlas" value="A" />
               </Tabs>
               */}
               <Divider />
            </Paper>
         </Slide>
      )
   }
}

export default connect('secondaryAppHeaderVisible', actions)(ShrineHeader);
