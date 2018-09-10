import React from 'react';
import marked from 'marked';
import { actions, API_ENDPOINT } from 'store';
import { connect } from 'unistore/react';
import update from 'immutability-helper'
import theme from 'theme';

import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import CircularProgress from '@material-ui/core/CircularProgress';

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

import WarningIcon from '@material-ui/icons/Warning';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import FileUpload from 'components/FileUpload';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import ChronicleCardEditable from 'components/ChronicleCardEditable';
import ErrorSnackbar from 'components/ErrorSnackbar';
import DatePicker from 'components/DatePicker';

class UnpublishedCard extends React.Component {
   state = {
      id: this.props.item.id,
      title: this.props.item.title || '',
      location: this.props.item.location || '',
      date: this.props.item.date || '',
      txt: (this.props.item.txt ? this.props.item.txt.split("^J^J").join('\n') : ''),
      existingImage: this.props.item.imageSrc || '',
      existingAudio: this.props.item.audioSrc || '',
      existingVideo: this.props.item.videoSrc || '',
      initId: this.props.item.id,
      initTitle: this.props.item.title || '',
      initLocation: this.props.item.location || '',
      initDate: this.props.item.date || '',
      initTxt: (this.props.item.txt ? this.props.item.txt.split("^J^J").join('\n') : ''),
      initExistingImage: this.props.item.imageSrc || '',
      initExistingAudio: this.props.item.audioSrc || '',
      initExistingVideo: this.props.item.videoSrc || '',
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
      edited: false,
      loading: false,
   }

   handleChange = (e) => {
      this.setState({
         [e.target.name]: e.target.value,
      })
      if (!this.state.edited) {
         this.setState({ edited: true })
      }
   }

   handleSetDate = (selectedDate) => {
      this.setState({ date: selectedDate });
      if (!this.state.edited) {
         this.setState({ edited: true })
      }
   }

   handleRenderField = (e) => {
      this.setState({ [`render${e.target.name}`]: true })
   }

   handleEditField = (name) => {
      this.setState({ [`render${name}`]: false });
      // setTimeout(() => {document.getElementById(name).focus()}, 25);
   }

   handleFileChange = (files) => {
      this.setState({ file: files[0].name })
      this.setState({ uploading: true });
      this.makeFileURL(files[0]);
      if (!this.state.edited) {
         this.setState({ edited: true })
      }
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
         edited: false,
      })
   }

   handleCancel = () => {
      this.setState({
         id: this.state.initId,
         title: this.state.initTitle,
         location: this.state.initLocation,
         date: this.state.initDate,
         txt: this.state.initTxt,
         file: '',
         fileURL: '',
         renderMediaThumbnail: false,
         uploadSuccess: false,
         edited: false
      });
   }

   // should this all be in the store? something like:
   //
   //    let payload = JSON.stringify({ ... })
   //    this.props.updChronicle(payload);
   //
   // it  would certainly make this thing shorter...
   //
   updChronicle = () => {
      if (!this.state.edited) {
         this.setState({ error: true });
         return;
      }
      this.setState({ error: false });

      this.setState({ loading: true });
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
            this.setState({ loading: false });
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
            this.setState({ loading: false });
            console.log(json);
            // add item to store
            this.props.updChronicleItem(json, this.props.memorialId);
         })
      }
   }

   render () {
      return (
         <Card style={{marginTop: 16}}>
             <CardHeader
                title={
                   <div
                      style={{
                         display: 'flex',
                         justifyContent: 'flex-end',
                         alignItems: 'center',
                         marginBottom: 8
                      }}
                   >
                      <Button
                         size="small"
                         disabled={this.state.edited ? false : true}
                         onClick={this.handleCancel}
                      > Cancel
                      </Button>
                      <Button
                         variant="contained"
                         color="primary"
                         size="small"
                         disabled={this.state.edited ? false : true}
                         onClick={() => this.updChronicle()}
                         style={{
                            position: 'relative',
                            width: (this.state.loading ? 77 : 'unset'),
                            marginLeft: 8,
                            marginRight: 8
                         }}
                      > 
                         { this.state.loading ?
                            <CircularProgress
                               size={20}
                               style={{position: 'absolute', color: 'white'}}
                            />
                            :
                            "Update"
                         }
                      </Button>
                      <Button
                         variant="contained"
                         color="primary"
                         size="small"
                         disabled={ (this.state.date && !this.state.edited) ? false : true }
                         onClick={
                            () => {
                               this.props.publishChronicleItem(this.props.item.id, this.props.memorialId);
                            }
                         }
                      > Publish
                      </Button>
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
                      <DatePicker
                         id="date"
                         label="Date"
                         born={parseInt(this.props.born)}
                         died={parseInt(this.props.died)}
                         value={this.state.date}
                         handleSetDate={this.handleSetDate}
                         onBlur={
                            (e) => {
                               this.state.date !== "" && this.handleRenderField(e);
                            }
                         }
                      />
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
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
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
                      variant="raised"
                      onClick={this.handleFileDelete}
                      style={{marginTop: 16}}
                   > Choose a different file
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
                   {/* !this.state.renderlocation ? */}
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
                      {/*
                         :
                      <div
                         style={{display: 'flex', alignItems: 'center'}}
                         onClick={() => this.handleEditField("location")}
                      >
                         <Typography variant="caption">
                            {this.state.location}
                         </Typography>
                         <IconButton
                            style={{marginLeft: 'auto'}}
                         >
                            <EditIcon />
                         </IconButton>
                      </div>
                      */}
                   {/*!this.state.rendertxt ? */}
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
                         style={{marginTop: 16}}
                      />
                      {/*
                         :
                      <div
                         style={{display: 'flex', alignItems: 'center'}}
                         onClick={() => this.handleEditField("txt")}
                      >
                         <div dangerouslySetInnerHTML={{__html: marked(this.state.txt)}} />
                         <IconButton
                            style={{marginLeft: 'auto'}}
                         >
                            <EditIcon />
                         </IconButton>
                      </div>
                      */}
                </div>
             </CardContent>
         </Card>
      )
   }
}

export default connect('', actions)(withMobileDialog()(UnpublishedCard));
