import React from 'react';
import { connect } from 'unistore/react';
import { actions } from 'store';
import Typography from '@material-ui/core/Typography';

class Atlas extends React.Component {
   state = {
   }

   render () {
      let memorial = this.props.user.memorials.find((m) => (
         m.urlStr === this.props.match.params.urlStr && m.urlNm === this.props.match.params.urlNm
      ));

      return (
         <div style={{width: '100%'}}>
            <Typography variant="title">
               {memorial.nm}'s Atlas
            </Typography>
         </div>
      )
   }
}

export default connect('user, secondaryAppHeaderVisible', actions)(Atlas);
