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

import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';
import UnfoldLessIcon from '@material-ui/icons/UnfoldLess';

const MemorialTabs = (props) => (
   <Slide in={props.secondaryAppHeaderVisible} unmountOnExit >
      <Paper id="MemorialHeader" elevation={4}>
         <div style={{display: 'flex', width: '100%'}}>
            <MemorialAvatar
               src={props.memorial.avatar}
               name={props.memorial.nm}
               style={{
                  paddingTop: 16,
                  paddingLeft: 16
               }}
            />
            <IconButton
               style={{
                  marginTop: 8,
                  marginLeft: 'auto',
                  marginRight: 4,
               }}
            >
               <SettingsIcon/>
            </IconButton>
            <IconButton
               onClick={props.hideSecondaryAppHeader}
               style={{
                  marginTop: 8,
                  marginRight: 4,
               }}
            >
               <UnfoldLessIcon/>
            </IconButton>
         </div>
         <Tabs
            value={props.view}
            onChange={props.handleTabChange}
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

export default connect('secondaryAppHeaderVisible', actions)(MemorialTabs);
