import React from 'react';
import Button from '@material-ui/core/Button';
import Zoom from '@material-ui/core/Zoom';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';

import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear';
import PhotoIcon from '@material-ui/icons/Photo';
import VideoIcon from '@material-ui/icons/Videocam';
import AudioIcon from '@material-ui/icons/Audiotrack';
import EmailIcon from '@material-ui/icons/Email';
import AddCardIcon from '@material-ui/icons/LibraryAdd';

import ChronicleAddItemModal from './ChronicleAddItemModal';

class ChronicleSpeedDial extends React.Component {
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
      return (
         <div >
            <ChronicleAddItemModal
               showChronicleAddItemModal={this.state.showChronicleAddItemModal}
               handleCloseChronicleAddItemModal={this.handleCloseChronicleAddItemModal}
               memorialId={this.props.memorial.id}
               born={this.props.memorial.born.split(/[^\d]/).find((n) => n.length === 4)}
               died={this.props.memorial.died ?
                  this.props.memorial.died.split(/[^\d]/).find((n) => n.length === 4)
                  :
                  new Date().getFullYear()
               }
            />
            <IconButton
               variant="fab"
               onClick={this.handleActionClick}
            > <AddCardIcon />
            </IconButton>
         </div>
      )
   }
}

export default ChronicleSpeedDial;
