import React from 'react';
import { connect } from 'unistore/react';
import { actions } from 'store';
import IconButton from '@material-ui/core/IconButton';
import AddCardIcon from '@material-ui/icons/LibraryAdd';
import ChronicleAddItemModal from './ChronicleAddItemModal';
import { withRouter } from 'react-router';

class ChronicleFab extends React.Component {
   state = {
      visible: true,
      open: false,
      showChronicleAddItemModal: false,
   }

   handleClick = () => {
      this.setState(state => ({ open: !state.open }));
   }

   handleOpen = () => {
      this.setState({ open: true });
   }

   handleClose = () => {
      this.setState({ open: false })
   }

   // handle speed dial action click (add photo, video, etc..)
   handleActionClick = () => {
      this.setState({ showChronicleAddItemModal: true })
   }

   handleCloseChronicleAddItemModal = () => {
      this.setState({ showChronicleAddItemModal: false })
   }

   render () {
      // hacks all the way down
      let location = this.props.location.pathname.split('/');
      let memorial =
         this.props.user.memorials ?
            this.props.user.memorials.find((m) => (
               m.urlStr === location[2] && m.urlNm === location[3]
            )) 
         : 
         {};
      return (
         <div >
            <ChronicleAddItemModal
               showChronicleAddItemModal={this.state.showChronicleAddItemModal}
               handleCloseChronicleAddItemModal={this.handleCloseChronicleAddItemModal}
               memorialId={memorial.id}
               born={memorial.born.split(/[^\d]/).find((n) => n.length === 4)}
               died={memorial.died ?
                  memorial.died.split(/[^\d]/).find((n) => n.length === 4)
                  :
                  new Date().getFullYear()
               }
            />
            <IconButton
               onClick={this.handleActionClick}
               style={{color: 'white'}}
            > <AddCardIcon />
            </IconButton>
         </div>
      )
   }
}

export default connect('user', actions)(withRouter(ChronicleFab));
