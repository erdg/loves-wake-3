import React from 'react';
import { connect } from 'unistore/react';
import { actions } from 'store';
import Typography from '@material-ui/core/Typography';
import LimboHeader from './LimboHeader';
import LimboContentList from './LimboContentList';

class Limbo extends React.Component {
   state = {
   }

   render () {
      let memorial = this.props.user.memorials.find((m) => (
         m.urlStr === this.props.match.params.urlStr && m.urlNm === this.props.match.params.urlNm
      ));

      return (
         <div style={{width: '100%'}}>
            <LimboHeader
               memorial={memorial}
            />
            <div style={{maxWidth: 600, margin: '0 auto'}}>
               <LimboContentList memorial={memorial} />
            </div>
         </div>
      )
   }
}

export default connect('user', actions)(Limbo);
