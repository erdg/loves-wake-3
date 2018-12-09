import React from 'react';

import TextField from '@material-ui/core/TextField';

const CreateMemorialName = (props) => {
   return (
      <div style={{display: 'flex', flexDirection: 'column', marginTop: 8}}>
         <TextField
            id="name"
            label="Full Name"
            name="name"
            variant="outlined"
            value={props.name}
            onChange={props.handleChange}
         />
      </div>
   )
}

export default CreateMemorialName;
