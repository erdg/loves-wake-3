import React from 'react';
import { actions, API_ENDPOINT } from 'store';
import { connect } from 'unistore/react';
import theme from 'theme';

import ErrorSnackbar from 'components/ErrorSnackbar';
// import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// import Card from '@material-ui/core/Card';
// import CardHeader from '@material-ui/core/CardHeader';
// import CardMedia from '@material-ui/core/CardMedia';
// import CardContent from '@material-ui/core/CardContent';
// import CardActions from '@material-ui/core/CardActions';

import CloseIcon from '@material-ui/icons/Close';
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
      error: false,
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
         error: false,
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
      // handle errors
      if (!(this.state.file || this.state.txt)) {
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
                  background: theme.palette.primary.main,
                  display: 'flex'
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
                     variant="title"
                     component="h2"
                     style={{
                        color: 'white',
                        display: 'inline',
                        marginLeft: 16 
                     }}
                  > Add a Card to Chronicle
                  </Typography>
                  <Button
                     onClick={
                        () => {
                           this.newChronicle();
                        }
                     }
                     style={{color: 'white', marginLeft: 'auto'}}
                  > Submit
                  </Button>
               </div>
            </DialogTitle>
            <DialogContent >
               <ErrorSnackbar
                  message="Nothing to submit"
                  open={this.state.error}
               />
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
                  error={this.state.error}
                  handleChange={this.handleChange}
                  handleRenderField={this.handleRenderField}
                  handleEditField={this.handleEditField}
                  handleFileChange={this.handleFileChange}
                  makeFileURL={this.makeFileURL}
                  handleFileDelete={this.handleFileDelete}
                  handleClearFields={this.handleClearFields}
                  fullScreen={this.props.fullScreen}
               />
            </DialogContent>
         </Dialog>
      )
   }
}

export default connect('', actions)(withMobileDialog()(ChronicleAddItemModal));
