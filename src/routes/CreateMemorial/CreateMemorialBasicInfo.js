import React from 'react';
import TextField from '@material-ui/core/TextField';

const CreateMemorialBasicInfo = (props) => {
   return (
      <div style={{display: 'flex', flexDirection: 'column'}}>
         <TextField
            id="born"
            name="born"
            label="Born"
            value={props.born}
            onChange={props.handleChange}
         />
         
         <TextField
            id="died"
            name="died"
            label="Died"
            value={props.died}
            onChange={props.handleChange}
         />
      </div>
   )
}

export default CreateMemorialBasicInfo;

