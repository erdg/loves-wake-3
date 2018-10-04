import React from 'react';

import Button from '@material-ui/core/Button';

const LogInButton = (props) => {
   return (
      <Button
         type="submit"
         style={{marginLeft: 8}}
         variant="contained"
         color="primary"
         onClick={props.handleLogin}
      > Login
      </Button>
   )
}

export default LogInButton;
