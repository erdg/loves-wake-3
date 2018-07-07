import React from 'react';

// import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';


const EmailInput = (props) => {
   return (
      <FormControl error={props.error ? true : false} aria-describedby="email-error">
         <InputLabel htmlFor="em">Email</InputLabel>
         <Input
            id="em"
            name="em"
            value={props.em}
            onChange={props.handleChange}
         />
         { props.error &&
            <FormHelperText id="email-error">
               Please enter a valid email
            </FormHelperText>
         }
      </FormControl>
   )
}

export default EmailInput;
