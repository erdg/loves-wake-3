import React from 'react';
import { connect } from 'unistore/react';
import { actions } from 'store';
import Typography from '@material-ui/core/Typography';

class Moderation extends React.Component {
   state = {
   }

   render () {
      let memorial = this.props.user.memorials.find((m) => (
         m.urlStr === this.props.match.params.urlStr && m.urlNm === this.props.match.params.urlNm
      ));

      return (
         <div style={{width: '100%'}}>
            <Typography variant="title">
               {memorial.nm}'s Content Moderation Station
            </Typography>
         </div>
      )
   }
}

export default connect('user, secondaryAppHeaderVisible', actions)(Moderation);
