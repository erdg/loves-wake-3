import React from 'react';

import Button from '@material-ui/core/Button';

const SignUpButton = (props) => {
   return (
      <Button
         variant="contained"
         color="primary"
         onClick={props.handleSignUp}
         style={{
            marginTop: 16 
         }}
      > Sign Up
      </Button>
   )
}

export default SignUpButton;
