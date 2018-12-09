import React from 'react';
import { connect } from 'unistore/react';
import { actions } from 'store';
import Typography from '@material-ui/core/Typography';


import IconButton from '@material-ui/core/IconButton';
// import SettingsIcon from '@material-ui/icons/Settings';
// import UnfoldLessIcon from '@material-ui/icons/UnfoldLess';
// import CloseIcon from '@material-ui/icons/Close';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import history from '../../history';
import ChronicleIcon from 'components/icons/ChronicleIcon';
import ChronicleFab from 'routes/Chronicle/ChronicleFab';

const ChronicleHeader = (props) => {
   return (
      <div
         style={{
            display: 'flex',
            width: '100%',
            maxWidth: 600,
            margin: '0 auto',
            paddingLeft: 8,
            alignItems: 'center',
         }}
      >
         <IconButton
            onClick={() => {history.goBack()}}
         >
            <ArrowBackIcon style={{color: 'white'}}/>
         </IconButton>
         <div style={{marginLeft: 16, paddingTop: 3}}>
            <ChronicleIcon fill="white" />
         </div>
         <Typography variant="subheading" style={{paddingLeft: 8, color: 'white'}}>
            Chronicle
         </Typography>
         <div style={{marginLeft: 'auto'}}>
            <ChronicleFab />
         </div>
         <div>
            <IconButton
            > <MoreVertIcon style={{color: 'white'}}/>
            </IconButton>
         </div>
      </div>
   )
}

export default ChronicleHeader;
