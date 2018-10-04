import React from 'react';
import ReactDOM from 'react-dom';

// import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';


class EmailInput extends React.Component {
   componentDidMount () {
      this.forceUpdate();
   }
   render () {
      return (
         <FormControl error={this.props.error ? true : false} aria-describedby="email-error" variant="outlined">
            <InputLabel
               htmlFor="em"
               ref={ref => {
                  this.labelRef = ReactDOM.findDOMNode(ref);
               }}
            > Email
            </InputLabel>
            <OutlinedInput
               id="em"
               name="em"
               value={this.props.em}
               onChange={this.props.handleChange}
               labelWidth={this.labelRef ? this.labelRef.offsetWidth : 0}
            />
            { this.props.error &&
               <FormHelperText id="email-error">
                  Please enter a valid email
               </FormHelperText>
            }
         </FormControl>
      )
   }
}

export default EmailInput;
