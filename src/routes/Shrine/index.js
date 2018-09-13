import React from 'react';
import { connect } from 'unistore/react';
import { actions } from 'store';
import Typography from '@material-ui/core/Typography';
import ShrineHeader from './ShrineHeader';

class Shrine extends React.Component {
   state = {
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
                  <ShrineHeader
                     memorial={memorial}
                  />
                  <Typography variant="display1" align="center" style={{marginTop: 48}}>
                     Coming Soon!
                  </Typography>
               </div>
            }
         </div>
      )
   }
}

export default connect('user', actions)(Shrine);
