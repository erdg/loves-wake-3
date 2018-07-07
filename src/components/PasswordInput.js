import React from 'react';

import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

class PasswordInput extends React.Component {
   state = {
      showPassword: false
   }

   handleClick = () => {
      this.setState({ showPassword: !this.state.showPassword })
   }

   render () {
      return (
         <FormControl>
            <InputLabel
               htmlFor="pw"
            > Password
            </InputLabel>
            <Input
               id="pw"
               name="pw"
               type={this.state.showPassword ? "text" : "password"}
               value={this.props.pw}
               onChange={this.props.handleChange}
               endAdornment={
                  <InputAdornment position="end">
                     <IconButton
                        aria-label="Toggle password visibility"
                        onClick={this.handleClick}
                     >
                        {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                     </IconButton>
                  </InputAdornment>
               }
            />
         </FormControl>
      )
   }
}

export default PasswordInput;
