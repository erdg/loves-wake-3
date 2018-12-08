import React from 'react';

import Button from '@material-ui/core/Button';

const RecoverAccountButton = (props) => {
   return (
      <Button
         onClick={props.handleRecover}
      > Recover Account
      </Button>
   )
}

export default RecoverAccountButton;
