import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'unistore/react';
import { actions } from 'store';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import EmailInput from 'components/EmailInput';
import PasswordInput from 'components/PasswordInput';
import RecoverAccountButton from './RecoverAccountButton';
import LogInButton from './LogInButton';
import RecoverUserAccountSuccessDialog from './RecoverUserAccountSuccessDialog';

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
      if (!(isEmail(this.state.em))) {
         this.setState({ emError: true });
         return;
      }
      this.setState({ emError: false });
      this.props.recoverUserAccount(this.state.em);
   }

   render () {
      return (
         <div style={{margin: '0 auto'}}>
            { this.props.loading ?
               <CircularProgress
                  color="primary"
                  size={60}
                  style={{position: 'absolute', top: '50%', left: '50%'}}
               />
                  :
               <div style={{display: 'flex', flexDirection: 'column', width: 300, alignItems: 'stretch'}}>
                  <RecoverUserAccountSuccessDialog />
                  <Typography
                     variant="headline"
                     component="h3"
                     style={{margin: '16px 0px'}}
                  >  Login
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
                  <form
                     onSubmit={this.handleLogIn}
                     style={{display: 'flex', flexDirection: 'column'}}
                  >
                     <EmailInput
                        em={this.state.em}
                        error={this.state.emError}
                        handleChange={this.handleChange}
                     />
                     <div
                        style={{margin: '8px 0px'}}
                     >
                        <PasswordInput
                           pw={this.state.pw}
                           error={this.state.pwError}
                           handleChange={this.handleChange}
                        />
                     </div>
                     <div 
                        style={{
                           display: 'flex',
                           flexDirection: 'row',
                           justifyContent: 'space-between',
                           marginTop: 16 
                        }}
                     >
                        <RecoverAccountButton
                           handleRecover={this.handleRecover}
                        />
                        <LogInButton
                           handleLogin={this.handleLogIn}
                        />
                     </div>
                  </form>
               </div>
            }
         </div>
      )
   }
}

const LogInWithStore = connect('loading, error, loginToken', actions)(LogIn);
export default withRouter(LogInWithStore);
