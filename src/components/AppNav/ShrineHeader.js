import React from 'react';
// import Tabs from '@material-ui/core/Tabs';
// import Tab from '@material-ui/core/Tab';
// import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'react-router';

import IconButton from '@material-ui/core/IconButton';
// import SettingsIcon from '@material-ui/icons/Settings';
// import UnfoldLessIcon from '@material-ui/icons/UnfoldLess';
// import CloseIcon from '@material-ui/icons/Close';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import ShrineIcon from 'components/icons/ShrineIcon';

import history from '../../history';

const ShrineHeader = (props) => {
   return (
      <div
         style={{
            display: 'flex',
            width: '100%',
            maxWidth: 600,
            margin: '0 auto',
            paddingLeft: 8,
            alignItems: 'center'
         }}
      >
         <IconButton
            onClick={() => {history.push("/" + props.location.pathname.split("/").splice(1,3).join("/"))}}
            style={{color: 'white'}}
         >
            <ArrowBackIcon />
         </IconButton>
         <div style={{marginLeft: 16, paddingTop: 3}}>
            <ShrineIcon fill="white" />
         </div>
         <Typography variant="subheading" style={{paddingLeft: 8, color: 'white'}}>
            Shrine
         </Typography>
         <IconButton
            style={{marginLeft: 'auto', color: 'white'}}
         >  <MoreVertIcon />
         </IconButton>
      </div>
   )
}

export default withRouter(ShrineHeader);
