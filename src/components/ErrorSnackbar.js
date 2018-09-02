import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
import theme from 'theme';
import WarningIcon from '@material-ui/icons/Warning';
import CloseIcon from '@material-ui/icons/Close';

const ErrorSnackbar = (props) => (
   <Snackbar
      anchorOrigin={{
         vertical: ( window.innerWidth < 960 ? 'bottom' : 'top'),
         horizontal: 'center'
      }}
      open={props.open}
      autoHideDuration={2000}
      style={{
      }}
   >
      <SnackbarContent
         message={
            <span
               style={{
                  display: 'flex',
                  alignItems: 'center',
               }}
            >
               <WarningIcon
                  style={{marginRight: 16}}
               />
               {props.message}
            </span>
         }
         action={
            <IconButton
               color="inherit"
            > <CloseIcon />
            </IconButton>
         }

         style={{background: theme.palette.error.main}}
      >
      </SnackbarContent>
   </Snackbar>
)

export default ErrorSnackbar;

