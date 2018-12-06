import React from 'react';
import { connect } from 'unistore/react';
import { actions } from 'store';
import Typography from '@material-ui/core/Typography';
import MemorialList from './MemorialList';
import ConfirmAccountModal from './ConfirmAccountModal';
import Button from '@material-ui/core/Button';
import history from '../../history';

class User extends React.Component {
   state = {
      showConfirmAccountModal: true
   }

   componentDidMount () {
      !this.props.user.email && this.props.getUserData();
   }

   closeConfirmAccountModal = () => {
      this.setState({ showConfirmAccountModal: false })
   }

   render () {
      return (
         <div>
            <ConfirmAccountModal
               open={this.props.user.confirmed && this.props.user.confirmed !== 'true' ? true : false}
               closeConfirmAccountModal={this.closeConfirmAccountModal}
            />
            <Typography variant="display1">
               User Profile Page
            </Typography>
            <Typography variant="body1">
               Logged in with email: {this.props.user.email}
            </Typography>
            <Button
               onClick={() => history.push("/create-memorial")}
               variant="outlined"
            > Create New Memorial
            </Button>
            <MemorialList memorials={this.props.user.memorials || []} />
         </div>
      )
   }
}

export default connect('loginToken, user', actions)(User);
