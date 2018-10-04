import React from 'react';
import ReactDOM from 'react-dom';

import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

class PasswordInput extends React.Component {
   state = {
      showPassword: false
   }

   componentDidMount () {
      this.forceUpdate();
   }

   handleClick = () => {
      this.setState({ showPassword: !this.state.showPassword })
   }

   render () {
      return (
         <FormControl variant="outlined">
            <InputLabel
               htmlFor="pw"
               ref={ref => {
                  this.labelRef = ReactDOM.findDOMNode(ref);
               }}
            > Password
            </InputLabel>
            <OutlinedInput
               id="pw"
               name="pw"
               type={this.state.showPassword ? "text" : "password"}
               value={this.props.pw}
               onChange={this.props.handleChange}
               labelWidth={this.labelRef ? this.labelRef.offsetWidth : 0}
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
