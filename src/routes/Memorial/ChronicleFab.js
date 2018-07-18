import React from 'react';
import Button from '@material-ui/core/Button';
import Zoom from '@material-ui/core/Zoom';
import Slide from '@material-ui/core/Slide';

import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear';
import PhotoIcon from '@material-ui/icons/Photo';
import VideoIcon from '@material-ui/icons/Videocam';
import AudioIcon from '@material-ui/icons/Audiotrack';
import EmailIcon from '@material-ui/icons/Email';

import ChronicleAddItemModal from './ChronicleAddItemModal';

class ChronicleSpeedDial extends React.Component {
   state = {
      visible: true,
      open: false,
      speedDialActions: false,
      showChronicleAddItemModal: false,
   }

   componentDidMount () {
      // observer to watch classes on AppBar
      this.observer = new MutationObserver(observerCallback);
      this.observer.observe(document.getElementById('AppHeader'), {
         attributes: true,
         atrributeFilter: ['class']
      });
      var that = this;
      // when headroom is visible, make the FAB visible
      function observerCallback (mutations, observer) {
         mutations.forEach((e) => {
            // console.log(e.target.classList);
            if (e.target.classList.contains('headroom--unpinned') && that.state.visible) {
               that.setState({ visible: false })
            }
            if (e.target.classList.contains('headroom--pinned')) {
               that.setState({ visible: true })
            }
         })
      }

   }

   componentWillUnmount () {
      this.observer.disconnect();
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
         <Slide in={this.state.visible} direction="up">
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
                  onClick={this.handleActionClick}
               > {this.state.open ? <ClearIcon /> : <AddIcon />}
               </Button>
               {/*
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
               */}
            </div>
         </Slide>
      )
   }
}

export default ChronicleSpeedDial;
