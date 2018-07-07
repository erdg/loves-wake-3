import React from 'react';

import TextField from '@material-ui/core/TextField';

const CreateMemorialName = (props) => {
   return (
      <div style={{display: 'flex', flexDirection: 'column'}}>
         <TextField
            id="name"
            label="Name"
            name="name"
            value={props.name}
            onChange={props.handleChange}
         />
      </div>
   )
}

export default CreateMemorialName;
