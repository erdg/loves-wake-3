import React from 'react';
import { connect } from 'unistore/react';
import { actions } from 'store';
import Typography from '@material-ui/core/Typography';
// import MemorialAvatar from 'components/MemorialAvatar';
import MemorialTabs from './MemorialTabs';
import Chronicle2 from './Chronicle';
import ChronicleSpeedDial from './ChronicleSpeedDial';

class Memorial extends React.Component {
   state = {
      view: "C"
   }

   componentDidMount () {
      this.props.setSecondaryAppHeader();
   }
   
   componentWillUnmount () {
      this.props.unsetSecondaryAppHeader();
   }

   handleTabChange = (e, val) => {
      this.setState({ view: val })
   }

   render () {
      let memorial = this.props.user.memorials.find((m) => (
         m.urlStr === this.props.match.params.urlStr && m.urlNm === this.props.match.params.urlNm
      ));

      return (
         <div>
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
               <div>
                  <Chronicle2 memorial={memorial} />
                  <ChronicleSpeedDial />
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

export default connect('user, secondaryAppHeaderVisible', actions)(Memorial);
