import React from 'react';
import Button from '@material-ui/core/Button';
import Zoom from '@material-ui/core/Zoom';

import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear';
import PhotoIcon from '@material-ui/icons/Photo';
import VideoIcon from '@material-ui/icons/Videocam';
import AudioIcon from '@material-ui/icons/Audiotrack';
import EmailIcon from '@material-ui/icons/Email';

import ChronicleAddItemModal from './ChronicleAddItemModal';

class ChronicleSpeedDial extends React.Component {
   state = {
      open: false,
      speedDialActions: false,
      showChronicleAddItemModal: false
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
         <div
            style={{
               position: 'fixed',
               bottom: 16,
               right: 16
            }}
         >
            <ChronicleAddItemModal
               showChronicleAddItemModal={this.state.showChronicleAddItemModal}
               handleCloseChronicleAddItemModal={this.handleCloseChronicleAddItemModal}
               memorialId={this.props.memorial.id}
            />
            <Button
               variant="fab"
               color="primary"
               onClick={this.handleClick}
            > {this.state.open ? <ClearIcon /> : <AddIcon />}
            </Button>
            {this.state.open &&
                  <Zoom in={this.state.open}>
               <div
                  style={{
                     position: 'absolute',
                     bottom: 56,
                     right: 8,
                     display: 'flex',
                     flexDirection: 'column',
                  }}
               >
                  <Button
                     variant="fab"
                     mini
                     onClick={
                        () => {
                           this.handleClick();
                           this.handleActionClick();
                        }
                     }
                     style={{marginBottom: 16}}
                  > <PhotoIcon />
                  </Button>
                  <Button
                     variant="fab"
                     mini
                     onClick={
                        () => {
                           this.handleClick();
                           alert("Added a story/memory");
                        }
                     }
                     style={{marginBottom: 16}}
                  > <EmailIcon />
                  </Button>
                  <Button
                     variant="fab"
                     mini
                     onClick={
                        () => {
                           this.handleClick();
                           alert("Added a video");
                        }
                     }
                     style={{marginBottom: 16}}
                  > <VideoIcon />
                  </Button>
                  <Button
                     variant="fab"
                     mini
                     onClick={
                        () => {
                           this.handleClick();
                           alert("Added audio");
                        }
                     }
                     style={{marginBottom: 16}}
                  > <AudioIcon />
                  </Button>
               </div>
            </Zoom>
            }
         </div>
      )
   }
}

export default ChronicleSpeedDial;
