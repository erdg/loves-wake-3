import React from 'react';

import { connect } from 'unistore/react';
import { actions } from 'store';

import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import EmailInput from 'components/EmailInput';
import PasswordInput from 'components/PasswordInput';
import SignUpButton from './SignUpButton';

class SignUp extends React.Component {
   state = {
      em: '',
      pw: ''
   }

   handleChange = (e) => {
      this.setState({ [e.target.name]: e.target.value });
   }

   handleSignUp = () => {
      // client-side error checking
      // ...
      // call store action
      this.props.signup();
   }

   render () {
      return (
         <div style={{margin: '0 auto'}}>
            { this.props.loading ?
               <CircularProgress
                  color="primary"
                  size={60}
               />
                  :
               <div style={{display: 'flex', flexDirection: 'column'}}>
                  <Typography
                     variant="headline"
                     component="h3"
                     color="primary"
                     style={{margin: '16px 0px'}}
                  > Sign Up
                  </Typography>
                     <EmailInput
                        em={this.state.em}
                        handleChange={this.handleChange}
                     />
                  <div style={{margin: '8px 0px'}}>
                     <PasswordInput
                        pw={this.state.pw}
                        handleChange={this.handleChange}
                     />
                  </div>
                  <SignUpButton
                     handleSignUp={this.handleSignUp}
                  > Sign Up
                  </SignUpButton>
               </div>
            }
         </div>
      )
   }
}

export default connect('loading', actions)(SignUp);
