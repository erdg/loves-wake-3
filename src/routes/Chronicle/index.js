import React from 'react';
import { connect } from 'unistore/react';
import { actions } from 'store';
// import Typography from '@material-ui/core/Typography';
// import MemorialAvatar from 'components/MemorialAvatar';
import ChronicleContentList from './ChronicleContentList';

class Chronicle extends React.Component {
   state = {
   }

   componentDidMount () {
      !this.props.user.email && this.props.getUserData();
   }

   render () {
      // to the top! weee!!
      window.scrollTo(0,0);
      let memorial =
         this.props.user.memorials ?
            this.props.user.memorials.find((m) => (
               m.urlStr === this.props.match.params.urlStr && m.urlNm === this.props.match.params.urlNm
            )) 
         : 
         {};

      return (
         <div style={{width: '100%'}}>
            {memorial.nm &&
               <div>
                  <div style={{maxWidth: 600, margin: '0 auto'}}>
                     <ChronicleContentList memorial={memorial} />
                  </div>
               </div>
            }
         </div>
      )
   }
}

export default connect('user', actions)(Chronicle);
