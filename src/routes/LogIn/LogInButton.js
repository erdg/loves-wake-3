import React from 'react';

import Button from '@material-ui/core/Button';

const LogInButton = (props) => {
   return (
      <Button
         style={{marginLeft: 8}}
         variant="contained"
         color="primary"
         onClick={props.handleLogin}
      > Log In
      </Button>
   )
}

export default LogInButton;
