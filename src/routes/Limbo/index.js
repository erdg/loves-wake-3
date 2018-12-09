import React from 'react';
import { connect } from 'unistore/react';
import { actions } from 'store';
// import Typography from '@material-ui/core/Typography';
import LimboContentList from './LimboContentList';

class Limbo extends React.Component {
   state = {
   }

   componentDidUpdate () {
      let memorial =
         this.props.user.memorials ?
            this.props.user.memorials.find((m) => (
               m.urlStr === this.props.match.params.urlStr && m.urlNm === this.props.match.params.urlNm
            )) 
         : 
         {};
      if (memorial.id && !memorial.events) {
         this.props.getMemorialEvents(memorial.id);
      }
   }

   render () {
      let memorial =
         this.props.user.memorials ?
            this.props.user.memorials.find((m) => (
               m.urlStr === this.props.match.params.urlStr && m.urlNm === this.props.match.params.urlNm
            )) 
         : 
         {};

      return (
         <div style={{width: '100%'}}>
            { memorial.nm &&
               <div>
                  <div style={{maxWidth: 600, margin: '0 auto'}}>
                     <LimboContentList memorial={memorial} />
                  </div>
               </div>
            }
         </div>
      )
   }
}

export default connect('user', actions)(Limbo);
