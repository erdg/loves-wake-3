import React from 'react';
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'unistore/react';
import { actions } from 'store';
import Paper from '@material-ui/core/Paper';
import MemorialAvatar from 'components/MemorialAvatar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Divider from '@material-ui/core/Divider';
import Zoom from '@material-ui/core/Zoom';
import Slide from '@material-ui/core/Slide';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';

import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';
import UnfoldLessIcon from '@material-ui/icons/UnfoldLess';
import CloseIcon from '@material-ui/icons/Close';

class MemorialTabs extends React.Component {
   state = {
      showSettingsMenu: false
   }
   
   handleSettingsMenuClick = () => {
      this.setState({ showSettingsMenu: !this.state.showSettingsMenu })
   }

   render () {
      return (
         <Slide in={this.props.secondaryAppHeaderVisible} unmountOnExit >
            <Paper id="MemorialHeader" elevation={4}>
               <div style={{display: 'flex', width: '100%'}}>
                  <MemorialAvatar
                     src={this.props.memorial.avatar}
                     name={this.props.memorial.nm}
                     style={{
                        paddingTop: 16,
                        paddingLeft: 16
                     }}
                  />
                  <IconButton
                     onClick={this.handleSettingsMenuClick}
                     style={{
                        marginTop: 8,
                        marginLeft: 'auto',
                        marginRight: 4,
                     }}
                  >
                     {this.state.showSettingsMenu ? <CloseIcon /> : <SettingsIcon/>}
                  </IconButton>
                  <IconButton
                     onClick={this.props.hideSecondaryAppHeader}
                     style={{
                        marginTop: 8,
                        marginRight: 4,
                     }}
                  >
                     <UnfoldLessIcon/>
                  </IconButton>
               </div>
               <Collapse in={this.state.showSettingsMenu} style={{margin: 8}}>
                  <Typography variant="subheading">
                     Memorial Settings
                  </Typography>
                  <Typography variant="body1">
                     This will be a small settings menu, with a link to the
                     full memorial settings page
                  </Typography>
               </Collapse>
               <Tabs
                  value={this.props.view}
                  onChange={this.props.handleTabChange}
                  indicatorColor="primary"
                  textColor="primary"
                  fullWidth
               >
                  <Tab label="Shrine" value="S" />
                  <Tab label="Chronicle" value="C" />
                  <Tab label="Atlas" value="A" />
               </Tabs>
               <Divider />
            </Paper>
         </Slide>
      )
   }
}

export default connect('secondaryAppHeaderVisible', actions)(MemorialTabs);
