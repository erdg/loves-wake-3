import React from 'react';
import { connect } from 'unistore/react';
import { actions } from 'store';
import Typography from '@material-ui/core/Typography';
// import MemorialAvatar from 'components/MemorialAvatar';
import MemorialTabs from './MemorialTabs';
import ChronicleContentList from './ChronicleContentList';
import ChronicleFab from './ChronicleFab';
import ChronicleEditItemModal from './ChronicleEditItemModal';

class Chronicle extends React.Component {
   state = {
      view: "C",
   }

   handleTabChange = (e, val) => {
      this.setState({ view: val })
   }

   render () {
      let memorial = this.props.user.memorials.find((m) => (
         m.urlStr === this.props.match.params.urlStr && m.urlNm === this.props.match.params.urlNm
      ));

      return (
         <div style={{width: '100%'}}>
            <MemorialTabs
               memorial={memorial}
               handleTabChange={this.handleTabChange}
               view={this.state.view}
            />
            {this.state.view === "S" &&
               <div>
                  <Typography variant="title">
                     {memorial.nm}'s Shrine
                  </Typography>
               </div>
            }
            {this.state.view === "C" &&
               <div style={{maxWidth: 600, margin: '0 auto'}}>
                  <ChronicleContentList memorial={memorial} />
               </div>
            }
            {this.state.view === "A" &&
               <div>
                  <Typography variant="title">
                     {memorial.nm}'s Atlas
                  </Typography>
               </div>
            }
         </div>
      )
   }
}

export default connect('user', actions)(Chronicle);
