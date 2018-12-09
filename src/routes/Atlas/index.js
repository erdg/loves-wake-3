import React from 'react';
import { connect } from 'unistore/react';
import { actions } from 'store';
import Iframe from 'components/Iframe';

class Atlas extends React.Component {
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
                  <Iframe
                     title="AtlasIframe"
                     src="https://u0lddk.axshare.com/atlas.html"
                     style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        width: '99%',
                        height: '99%'
                     }}
                  />
               </div>
            }
         </div>
      )
   }
}

export default connect('user', actions)(Atlas);
