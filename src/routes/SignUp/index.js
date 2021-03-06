import React from 'react';
import isEmail from 'validator/lib/isEmail';
import { connect } from 'unistore/react';
import { actions } from 'store';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import EmailInput from 'components/EmailInput';
import PasswordInput from 'components/PasswordInput';
import SignUpButton from './SignUpButton';
import theme from 'theme';

class SignUp extends React.Component {
   state = {
      em: '',
      emError: '',
      pw: '',
      pwError: '',
   }

   handleChange = (e) => {
      this.setState({ [e.target.name]: e.target.value });
   }

   handleSignUp = () => {
      // if not valid email address
      if ( !(isEmail(this.state.em)) ) {
         // throw email error, don't submit
         this.setState({ emError: true });
         return
      } else {
         this.setState({ emError: false });
      }
      // make sure there's a password
      if (!this.state.pw) {
         this.setState({ pwError: true });
         return
      } else { 
         this.setState({ pwError: false }); 
      }
      // call store action
      this.props.newUser(this.state.em, this.state.pw);
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
               <div style={{display: 'flex', flexDirection: 'column', width: 300}}>
                  <Typography
                     variant="headline"
                     component="h3"
                     color="primary"
                     style={{margin: '16px 0px'}}
                  > Sign Up
                  </Typography>
                  { this.props.error &&
                     <Paper
                        elevation={0}
                        style={{
                           color: 'white',
                           backgroundColor: theme.palette.error.main,
                           marginBottom: 16,
                           padding: 8
                        }}
                     >
                        <Typography variant="body1" style={{color: 'white'}}>
                           {this.props.error}
                        </Typography>
                     </Paper>
                  }
                  <EmailInput
                     em={this.state.em}
                     error={this.state.emError}
                     handleChange={this.handleChange}
                  />
                  <div style={{margin: '8px 0px'}}>
                     <PasswordInput
                        pw={this.state.pw}
                        error={this.state.pwError}
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

export default connect('loading, error', actions)(SignUp);
