import React from 'react';
import { connect } from 'unistore/react';
import { actions } from 'store';
// import Tabs from '@material-ui/core/Tabs';
// import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';


import IconButton from '@material-ui/core/IconButton';
// import SettingsIcon from '@material-ui/icons/Settings';
// import UnfoldLessIcon from '@material-ui/icons/UnfoldLess';
// import CloseIcon from '@material-ui/icons/Close';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
// import NewReleasesIcon from '@material-ui/icons/NewReleases';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import history from '../../history';
import LimboIcon from '@material-ui/icons/Waves';
import ChronicleFab from 'routes/Chronicle/ChronicleFab';
import EventsIcon from '@material-ui/icons/Assignment';

const LimboHeader = (props) => {
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
            onClick={() => {history.goBack()}}
            style={{color: 'white'}}
         >
            <ArrowBackIcon />
         </IconButton>
         <div style={{marginLeft: 16, paddingTop: 3}}>
            <LimboIcon fill='white' />
         </div>
         <Typography variant="subheading" style={{paddingLeft: 8, color: 'white'}}>
            Limbo
         </Typography>
         <div style={{marginLeft: 'auto'}}>
            <ChronicleFab />
         </div>
         <IconButton
            style={{marginRight: 4, color: 'white'}}
         > <MoreVertIcon />
         </IconButton>
      </div>
   )
}

export default LimboHeader;
