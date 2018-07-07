import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'unistore/react';
import { actions } from 'store';

import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import EmailInput from 'components/EmailInput';
import PasswordInput from 'components/PasswordInput';
import RecoverAccountButton from './RecoverAccountButton';
import LogInButton from './LogInButton';

import theme from 'theme';

import isEmail from 'validator/lib/isEmail';

class LogIn extends React.Component {
   state = {
      em: '',
      emError: null,
      pw: '',
      pwError: null
   }

   handleChange = (e) => {
      this.setState({ [e.target.name]: e.target.value });
   }

//    componentDidUpdate (prevProps) {
//       if (this.props.loginToken) {
//          this.props.history.push("/user")
//       }
//    }

   handleLogIn = (e) => {
      e.preventDefault();
      // check email
      if (!(isEmail(this.state.em))) {
         this.setState({ emError: true });
         return;
      }
      this.setState({ emError: false });
      // make sure there's a password
      if (!this.state.pw) {
         this.setState({ pwError: true });
         return;
      }
      this.setState({ pwError: false }); 
      // call store action
      this.props.loginUser(this.state.em, this.state.pw);
      if (this.props.loginToken) {
         this.props.history.push("/user");
      }
      // clear password
      this.setState({ pw: '' });
   }

   handleRecover = () => {
      alert("Account Recovered");
   }

   render () {
      return (
         <div>
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
                  > Log In
                  </Typography>
                  { this.props.error &&
                     <div style={{backgroundColor: theme.palette.error.main}}>
                        {this.props.error}
                     </div>
                  }
                  <EmailInput
                     em={this.state.em}
                     error={this.state.emError}
                     handleChange={this.handleChange}
                  />
                  <PasswordInput
                     pw={this.state.pw}
                     handleChange={this.handleChange}
                  />
                  <div 
                     style={{
                        display: 'flex',
                        flexDirection: 'row',
                        marginTop: 24 
                     }}
                  >
                     <RecoverAccountButton
                        handleRecover={this.handleRecover}
                     />
                     <LogInButton
                        handleLogin={this.handleLogIn}
                     />
                  </div>
               </div>
            }
         </div>
      )
   }
}

const LogInWithStore = connect('loading, error, loginToken', actions)(LogIn);
export default withRouter(LogInWithStore);
