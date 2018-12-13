import React from 'react';
import { actions, API_ENDPOINT } from 'store';
import { connect } from 'unistore/react';
import theme from 'theme';

// import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Fade from '@material-ui/core/Fade';
import Zoom from '@material-ui/core/Zoom';
import FileUpload from 'components/FileUpload';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Collapse from '@material-ui/core/Collapse';

import Card from '@material-ui/core/Card';
// import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
// import CardContent from '@material-ui/core/CardContent';
// import CardActions from '@material-ui/core/CardActions';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import StarIcon from '@material-ui/icons/Stars';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import CheckIcon from '@material-ui/icons/CheckCircle';
import StoryIcon from '@material-ui/icons/LibraryBooks';
import UploadPhotoIcon from '@material-ui/icons/PhotoLibrary';
import UploadVideoIcon from '@material-ui/icons/VideoLibrary';
import UploadAudioIcon from '@material-ui/icons/LibraryMusic';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import { link3 } from 'links';
import AddIcon from '@material-ui/icons/Add';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
// import EditIcon from '@material-ui/icons/Edit';
import withMobileDialog from '@material-ui/core/withMobileDialog';
// import FileUpload from 'components/FileUpload';

import ChronicleCardEditable from 'components/ChronicleCardEditable';

class ChronicleAddItemModal extends React.Component {
   state = {
      title: '',
      location: '',
      date: '',
      txt: '',
      file: '',
      fileURL: '',
      uploading: false,
      uploadSuccess: false,
      rendertitle: false,
      renderdate: false,
      renderlocation: false,
      rendertxt: false,
      renderMediaThumbnail: false,
      uploadPhoto: false,
      uploadStory: false
   }

   handleUploadPhotoClick = () => {
      this.setState({ uploadPhoto: !this.state.uploadPhoto })
   }

   handleUploadStoryClick = () => {
      this.setState({ uploadStory: !this.state.uploadStory })
   }

   render () {
      return (
         <Dialog
            open={this.props.showChronicleAddItemModal}
            onClose={
               () => {
                  this.handleClearFields();
                  this.props.handleCloseChronicleAddItemModal();
               }
            }
            fullScreen={this.props.fullScreen}
         >
            <DialogTitle
               disableTypography
               style={{
                  background: theme.palette.primary.dark,
                  display: 'flex',
                  padding: 12
               }}
            >
               <div style={{width: '100%', display: 'flex', alignItems: 'center'}}>
                  <IconButton
                     onClick={
                        () => {
                           this.handleClearFields();
                           this.props.handleCloseChronicleAddItemModal();
                        }
                     }
                  > <CloseIcon style={{color: 'white'}}/>
                  </IconButton>
                  <Typography
                     variant="headline"
                     style={{
                        color: 'white',
                        display: 'inline',
                        marginLeft: 16 
                     }}
                  > Add Something
                  </Typography>
                  {(this.state.fileURL || this.state.txt) &&
                     <Button
                        color="primary"
                        variant="contained"
                        size="small"
                        onClick={
                           () => {
                              this.newChronicle();
                           }
                        }
                        style={{color: 'white', marginLeft: 'auto', marginRight: 5}}
                     > Submit
                     </Button>
                  }
               </div>
            </DialogTitle>
            <DialogContent style={{padding: 0}}>

               <div
                  onClick={this.props.openCreateMilestoneDialog}
                  style={{
                     display: 'flex',
                     alignItems: 'center',
                     margin: 16,
                     background: '#f0f0f0',
                     borderRadius: 4,
                     cursor: 'pointer'
                  }}
               >
                  <IconButton>
                     <StarIcon 
                        style={{color: 'rgba(0,0,0,0.54)', cursor: 'pointer', alignSelf: 'flex-start'}}
                     />
                  </IconButton>
                  <Typography
                     variant="subheading" 
                     style={{marginLeft: 8, cursor: 'pointer'}}
                  >
                     Milestone
                  </Typography>
                  <IconButton style={{marginLeft: 'auto'}}>
                     <ArrowForwardIcon />
                  </IconButton>
               </div>

               <div
                  onClick={this.handleUploadPhotoClick}
                  style={{
                     display: 'flex',
                     alignItems: 'center',
                     margin: 16,
                     marginBottom: 0,
                     background: '#f0f0f0',
                     borderRadius: 4,
                     cursor: 'pointer',
                  }}
               >
                  <div style={{display: 'flex', margin: 12}}>
                     {this.state.uploadSuccess ? 
                        <CheckIcon style={{color: '#378533', alignSelf: 'flex-start'}} />
                           :
                        <UploadPhotoIcon 
                           style={{color: 'rgba(0,0,0,0.54)', cursor: 'pointer', alignSelf: 'flex-start'}}
                        />
                     }
                  </div>
                  <Typography
                     variant="subheading" 
                     style={{marginLeft: 8, cursor: 'pointer'}}
                  >
                     Photo, Video or Audio
                  </Typography>
                  {this.state.uploadSuccess &&
                        <IconButton
                           onClick={this.handleFileDelete}
                           style={{marginLeft: 'auto', zIndex: 12}}
                        >
                           <DeleteIcon />
                        </IconButton>
                  }
                  <IconButton style={{marginLeft: this.state.uploadSuccess ? 0 : 'auto'}}>
                     {this.state.uploadPhoto ?  <ExpandLessIcon /> :
                           this.state.uploadSuccess ? 
                              <ExpandMoreIcon />
                                 : 
                              <AddIcon />
                     }
                  </IconButton>
               </div>
               <div style={{width: '100%'}}>
                  <Collapse in={this.state.uploadPhoto}>
                     {!this.state.renderMediaThumbnail ?
                        <FileUpload
                           accept="image/*, audio/*, video/*"
                           file={this.state.file}
                           handleFileChange={this.handleFileChange}
                           handleFileDelete={this.handleFileDelete}
                           uploading={this.state.uploading}
                           uploadSuccess={this.state.uploadSuccess}
                           width="100%"
                        />
                           :
                        <div style={{marginTop: 16}}>
                           <Card elevation={0} square >
                              <CardMedia
                                 component={
                                    this.state.fileURL.split(':')[1].split('/')[0] === "image" ?
                                       "img"
                                          :
                                       this.state.fileURL.split(':')[1].split('/')[0] 
                                 }
                                 src={this.state.fileURL}
                                 controls
                              />
                           </Card>
                        </div>
                     }
                  </Collapse>
               </div>

               <div
                  onClick={this.handleUploadStoryClick}
                  style={{
                     display: 'flex',
                     alignItems: 'center',
                     margin: 16,
                     marginBottom: 0,
                     background: '#f0f0f0',
                     borderRadius: 4,
                     cursor: 'pointer'
                  }}
               >
                  <IconButton>
                     <StoryIcon 
                        style={{color: 'rgba(0,0,0,0.54)', cursor: 'pointer', alignSelf: 'flex-start'}}
                     />
                  </IconButton>
                  <Typography
                     variant="subheading" 
                     style={{marginLeft: 8, cursor: 'pointer'}}
                  >
                     Story or Memory
                  </Typography>
                  <IconButton style={{marginLeft: 'auto'}}>
                     {this.state.uploadStory ? <ExpandLessIcon /> : <AddIcon />}
                  </IconButton>
               </div>

               <Collapse
                  in={this.state.uploadStory}
                  style={{
                     margin: 16,
                     marginTop: 10,
                     paddingTop: 6,
                     marginBottom: this.state.uploadStory ? 16 : 0
                  }}
               >
                  <TextField
                     label="Story or Memory"
                     name="txt"
                     variant="outlined"
                     multiline
                     rows={10}
                     onChange={this.handleChange}
                     style={{
                        width: '100%',
                     }}
                  />
               </Collapse>
               {/*
               <div
                  style={{
                     display: 'flex',
                     alignItems: 'center',
                     width: '100%',
                     marginTop: 16,
                     marginBottom: 16,
                     background: '#f0f0f0',
                     borderRadius: 4,
                     cursor: 'pointer'
                  }}
               >
                  <IconButton>
                     <UploadAudioIcon 
                        style={{color: 'rgba(0,0,0,0.54)', cursor: 'pointer', alignSelf: 'flex-start'}}
                     />
                  </IconButton>
                  <Typography
                     variant="subheading" 
                     style={{marginLeft: 8, cursor: 'pointer'}}
                  >
                     Audio
                  </Typography>
                  <IconButton style={{marginLeft: 'auto'}}>
                     <AddIcon />
                  </IconButton>
               </div>
               */}

               <div
                  style={{
                     display: 'flex',
                     alignItems: 'center',
                     margin: '0px 16px',
                     marginBottom: 16,
                     background: '#f0f0f0',
                     borderRadius: 4,
                     cursor: 'pointer'
                  }}
               >
                  <IconButton>
                     <LibraryAddIcon 
                        style={{color: 'rgba(0,0,0,0.54)', cursor: 'pointer', alignSelf: 'flex-start'}}
                     />
                  </IconButton>
                  <Typography
                     variant="subheading" 
                     style={{marginLeft: 8, cursor: 'pointer'}}
                  >
                     Upload Many
                  </Typography>
                  <IconButton style={{marginLeft: 'auto'}}>
                     <AddIcon />
                  </IconButton>
               </div>

               {/*
               <ChronicleCardEditable
                  title={this.state.title}
                  location={this.state.location}
                  date={this.state.date}
                  handleSetDate={this.handleSetDate}
                  born={this.props.born}
                  died={this.props.died}
                  txt={this.state.txt}
                  file={this.state.file}
                  fileURL={this.state.fileURL}
                  uploading={this.state.uploading}
                  uploadSuccess={this.state.uploadSuccess}
                  rendertitle={this.state.rendertitle}
                  renderdate={this.state.renderdate}
                  renderlocation={this.state.renderlocation}
                  rendertxt={this.state.rendertxt}
                  renderMediaThumbnail={this.state.renderMediaThumbnail}
                  handleChange={this.handleChange}
                  handleRenderField={this.handleRenderField}
                  handleEditField={this.handleEditField}
                  handleFileChange={this.handleFileChange}
                  makeFileURL={this.makeFileURL}
                  handleFileDelete={this.handleFileDelete}
                  handleClearFields={this.handleClearFields}
                  fullScreen={this.props.fullScreen}
               />
               */}
            </DialogContent>
         </Dialog>
      )
   }


   handleChange = (e) => {
      this.setState({
         [e.target.name]: e.target.value,
      })
   }

   handleSetDate = (selectedDate) => {
      this.setState({ date: selectedDate });
   }

   handleRenderField = (e) => {
      this.setState({ [`render${e.target.name}`]: true })
   }

   handleEditField = (name) => {
      this.setState({ [`render${name}`]: false });
      setTimeout(() => {document.getElementById(name).focus()}, 25);
   }

   handleFileChange = (files) => {
      this.setState({ file: files[0].name })
      this.setState({ uploading: true });
      this.makeFileURL(files[0]);
   }

   makeFileURL = (file) => {
      let reader = new FileReader();
      reader.onload = (e) => {
         this.setState({ fileURL: e.target.result })
         setTimeout(() => {
            this.setState({
               uploading: false,
               uploadSuccess: true,
               renderMediaThumbnail: true
            });
         }, 750);
      }
      reader.readAsDataURL(file);
   }

   handleFileDelete = () => {
      this.setState({
         renderMediaThumbnail: false,
         file: null,
         fileURL: '',
         uploading: false,
         uploadSuccess: false,
      })
   }

   handleClearFields = () => {
      this.setState({
         title: '',
         location: '',
         date: '',
         txt: '',
         file: '',
         fileURL: '',
         uploading: false,
         uploadSuccess: false,
         rendertitle: false,
         renderdate: false,
         renderlocation: false,
         rendertxt: false,
         renderMediaThumbnail: false,
         uploadPhoto: false,
         uploadStory: false,
      })
   }

   // should this all be in the store? something like:
   //
   //    let payload = JSON.stringify({ ... })
   //    this.props.newChronicle(payload);
   //
   // it  would certainly make this thing shorter...
   //
   newChronicle = () => {
      // if there's an image to upload...
      if (this.state.fileURL) {
         // data
         let str = this.state.fileURL.split(',')[1];
         // mimetype
         let blob = this.state.fileURL.split(':')[1].split('/')[0];
         fetch( API_ENDPOINT + "!newChronicle", { 
            method: "POST", 
            body: JSON.stringify({ 
               loginToken: window.sessionStorage.getItem('loginToken'),
               memorialId: this.props.memorialId,
               title: this.state.title,
               location: this.state.location,
               date: this.state.date,
               txt: this.state.txt,
               [blob]: str
            }) 
         })
         .then(res => res.json())
         .then(json => {
            // add item to store
            this.props.addChronicleItem(json, this.props.memorialId);
         })
         .then(this.props.handleCloseChronicleAddItemModal())
         .then(this.handleClearFields());
      } else {
         fetch( API_ENDPOINT + "!newChronicle", {
            method: "POST",
            body: JSON.stringify({
               loginToken: window.sessionStorage.getItem('loginToken'),
               memorialId: this.props.memorialId,
               title: this.state.title,
               location: this.state.location,
               date: this.state.date,
               txt: this.state.txt,
            })
         })
         .then(res => res.json())
         .then(json => {
            // add item to store
            this.props.addChronicleItem(json, this.props.memorialId);
         })
         .then(this.props.handleCloseChronicleAddItemModal())
         .then(this.handleClearFields());
      }
   }

}

export default connect('', actions)(withMobileDialog()(ChronicleAddItemModal));
