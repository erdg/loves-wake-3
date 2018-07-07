import React from 'react';
import { connect } from 'unistore/react';
import { actions } from 'store';
import Typography from '@material-ui/core/Typography';
import MemorialList from './MemorialList';

class User extends React.Component {
   componentDidMount () {
      !this.props.user.email && this.props.getUserData();
   }

   render () {
      return (
         <div>
            <Typography variant="display1">
               User Profile Page
            </Typography>
            <Typography variant="body1">
               Logged in with email: {this.props.user.email}
            </Typography>
            <MemorialList memorials={this.props.user.memorials || []} />
         </div>
      )
   }
}

export default connect('loginToken, user', actions)(User);
