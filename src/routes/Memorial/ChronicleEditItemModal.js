import React from 'react';
import { actions, API_ENDPOINT } from 'store';
import { connect } from 'unistore/react';
import update from 'immutability-helper'
import theme from 'theme';

import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import FileUpload from 'components/FileUpload';

import ChronicleCardEditable from 'components/ChronicleCardEditable';

class ChronicleEditItemModal extends React.Component {
   state = {
      id: this.props.item.id,
      title: this.props.item.title || '',
      location: this.props.item.location || '',
      date: this.props.item.date || '',
      txt: this.props.item.txt || '',
      existingImage: this.props.item.imageSrc || '',
      existingAudio: this.props.item.audioSrc || '',
      existingVideo: this.props.item.videoSrc || '',
      file: '',
      fileURL: '',
      uploading: false,
      uploadSuccess: false,
      rendertitle: this.props.item.title ? true : false,
      renderdate: this.props.item.date ? true : false,
      renderlocation: this.props.item.location ? true : false,
      rendertxt: this.props.item.txt ? true : false,
      renderMediaThumbnail: this.props.item.imageSrc || this.props.item.audioSrc || this.props.item.videoSrc || false,
      error: false,
   }

   handleChange = (e) => {
      this.setState({
         [e.target.name]: e.target.value,
      })
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
         existingImage: '',
         existingAudio: '',
         existingVideo: '',
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
         error: false,
      })
   }

   // should this all be in the store? something like:
   //
   //    let payload = JSON.stringify({ ... })
   //    this.props.updChronicle(payload);
   //
   // it  would certainly make this thing shorter...
   //
   updChronicle = () => {
      // handle errors
      if (  // nothing has changed
            this.props.item.title === this.state.title
            && this.props.item.date === this.state.date
            && this.props.item.location === this.state.location
            && this.props.item.txt === this.state.txt
            && !this.state.fileURL ) {
         this.setState({ error: true });
         return;
      }
      this.setState({ error: false });

      // if there's an image to upload...
      if (this.state.fileURL) {
         // data
         let str = this.state.fileURL.split(',')[1];
         // mimetype
         let blob = this.state.fileURL.split(':')[1].split('/')[0];
         fetch( API_ENDPOINT + "!updChronicle", { 
            method: "POST", 
            body: JSON.stringify({ 
               loginToken: window.sessionStorage.getItem("loginToken"),
               memorialId: this.props.memorialId,
               id: this.state.id,
               title: this.state.title,
               location: this.state.location,
               date: this.state.date,
               txt: this.state.txt,
               [blob]: str
            }) 
         })
         .then(res => res.json())
         .then(json => {
            console.log(json);
            // add item to store
            // NOTE - the any media will not update because the url
            // stays the same. to workaround this, take the json object returned
            // from the server, substitute the ${media}Src for the fileURL
            // (see state above) and then add it to the store.
            let item = update(json, {
               [Object.keys(json).find((k) => k.indexOf("Src") !== -1)]: val => update(val, {$set: this.state.fileURL})
            });
            console.log(item);
            this.props.updChronicleItem(item, this.props.memorialId);
         })
         .then(this.props.handleCloseChronicleEditItemModal())
         .then(this.handleClearFields())
         .then(this.props.handleCloseMenu());
      } else {
         fetch( API_ENDPOINT + "!updChronicle", {
            method: "POST",
            body: JSON.stringify({
               loginToken: window.sessionStorage.getItem("loginToken"),
               memorialId: this.props.memorialId,
               id: this.state.id,
               title: this.state.title,
               location: this.state.location,
               date: this.state.date,
               txt: this.state.txt,
            })
         })
         .then(res => res.json())
         .then(json => {
            console.log(json);
            // add item to store
            this.props.updChronicleItem(json, this.props.memorialId);
         })
         .then(this.props.handleCloseChronicleEditItemModal())
         .then(this.handleClearFields())
         .then(this.props.handleCloseMenu());
      }
   }

   render () {
      return (
         <Dialog
            open={this.props.showChronicleEditItemModal}
            onClose={
               () => {
                  this.handleClearFields();
                  this.props.handleCloseChronicleEditItemModal();
               }
            }
            fullScreen={this.props.fullScreen}
         >
            <DialogTitle>
               Edit item
            </DialogTitle>
            <DialogContent style={{borderTop: '1px solid #ddd', borderBottom: '1px solid #ddd'}}>
                <Card style={{marginTop: 16, marginBottom: 16}}>
                   <CardHeader
                      title={
                         !this.state.rendertitle ?
                            <TextField
                               id="title"
                               label="Title"
                               name="title"
                               type="text"
                               value={this.state.title}
                               onChange={this.handleChange}
                               onBlur={
                                  (e) => {
                                     this.state.title !== "" && this.handleRenderField(e);
                                  }
                               }
                               style={{display: 'flex'}}
                               multiline
                            />
                            :
                            <div style={{display: 'flex', alignItems: 'center'}}>
                               <Typography variant="title">
                                  {this.state.title}
                               </Typography>
                               <IconButton
                                  onClick={() => this.handleEditField("title")}
                                  style={{marginLeft: 'auto'}}
                               >
                                  <EditIcon />
                               </IconButton>
                            </div>
                      }
                      subheader={
                         <div
                            style={{
                               minWidth: (this.props.fullScreen ? 0 : 478),
                               display: 'flex',
                               flexDirection: 'column'
                            }}
                         >
                            {!this.state.renderdate ?
                               <TextField
                                  id="date"
                                  label="Date"
                                  name="date"
                                  type="text"
                                  value={this.state.date}
                                  onChange={this.handleChange}
                                  onBlur={
                                     (e) => {
                                        this.state.date !== "" && this.handleRenderField(e);
                                     }
                                  }
                               />
                                  :
                               <div style={{display: 'flex', alignItems: 'center'}}>
                                  <Typography variant="caption">
                                     {this.state.date}
                                  </Typography>
                                  <IconButton
                                     onClick={() =>this.handleEditField("date")}
                                     style={{marginLeft: 'auto'}}
                                  >
                                     <EditIcon />
                                  </IconButton>
                               </div>
                            }
                            {!this.state.renderlocation ?
                               <TextField
                                  id="location"
                                  label="Location"
                                  name="location"
                                  type="text"
                                  value={this.state.location}
                                  onChange={this.handleChange}
                                  onBlur={
                                     (e) => {
                                        this.state.location !== "" && this.handleRenderField(e);
                                     }
                                  }
                               />
                                  :
                               <div style={{display: 'flex', alignItems: 'center'}}>
                                  <Typography variant="caption">
                                     {this.state.location}
                                  </Typography>
                                  <IconButton
                                     onClick={() => this.handleEditField("location")}
                                     style={{marginLeft: 'auto'}}
                                  >
                                     <EditIcon />
                                  </IconButton>
                               </div>
                            }
                         </div>
                      }
                   />
                   {!this.state.renderMediaThumbnail ?
                      <FileUpload
                         accept="image/*, audio/*, video/*"
                         file={this.state.file}
                         handleFileChange={this.handleFileChange}
                         handleFileDelete={this.handleFileDelete}
                         uploading={this.state.uploading}
                         uploadSuccess={this.state.uploadSuccess}
                      />
                         :
                      <div style={{position: 'relative'}}>
                         {this.state.existingImage &&
                            <CardMedia component="img" src={this.state.existingImage} />
                         }
                         {this.state.existingAudio &&
                            <CardMedia component="audio" src={this.state.existingAudio} controls />
                         }
                         {this.state.existingVideo &&
                            <CardMedia component="video" src={this.state.existingVideo} controls />
                         }
                         {this.state.file &&
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
                         }
                         <Button
                            variant="fab"
                            onClick={this.handleFileDelete}
                            color="inherit"
                            mini
                            style={{
                               position: 'absolute',
                               top: 16,
                               right: (this.props.fullScreen ? 24 : 30),
                               width: 36,
                               height: 36,
                               display: 'flex',
                               color: 'rgba(0, 0, 0, 0.54)',
                            }}
                         > <CloseIcon />
                         </Button>
                      </div>
                   }
                   <CardContent>
                      <div
                         style={{
                            minWidth: (this.props.fullScreen ? 0 : 478),
                            display: 'flex',
                            flexDirection: 'column'
                         }}
                      >
                         {!this.state.rendertxt ?
                            <TextField
                               multiline
                               id="txt"
                               label="Story, memory or caption..."
                               name="txt"
                               type="text"
                               value={this.state.txt}
                               onChange={this.handleChange}
                               onBlur={
                                  (e) => {
                                     this.state.txt !== "" && this.handleRenderField(e);
                                  }
                               }
                            />
                               :
                            <div style={{display: 'flex', alignItems: 'center'}}>
                               <Typography variant="body1">
                                  {this.state.txt}
                               </Typography>
                               <IconButton
                                  onClick={() => this.handleEditField("txt")}
                                  style={{marginLeft: 'auto'}}
                               >
                                  <EditIcon />
                               </IconButton>
                            </div>
                         }
                      </div>
                   </CardContent>
                </Card>
            </DialogContent>
            <DialogActions style={{marginLeft: 16, marginRight: 16}}>
               {this.state.error &&
                  <Typography
                     variant="body1"
                     style={{marginRight: 'auto', color: theme.palette.error.main}}
                  >
                     Nothing has changed
                  </Typography>
               }
               <Button
                  onClick={
                     () => {
                        this.props.handleCloseChronicleEditItemModal();
                     }
                  }
               > Cancel
               </Button>
               <Button
                  variant="contained"
                  color="primary"
                  onClick={
                     () => {
                        this.updChronicle();
                     }
                  }
               > Update
               </Button>
            </DialogActions>
         </Dialog>
      )
   }
}

export default connect('', actions)(withMobileDialog()(ChronicleEditItemModal));
