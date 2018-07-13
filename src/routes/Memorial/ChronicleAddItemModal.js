import React from 'react';
import { actions, API_ENDPOINT } from 'store';
import { connect } from 'unistore/react';
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

import EditIcon from '@material-ui/icons/Edit';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import FileUpload from 'components/FileUpload';

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
            <DialogTitle>
               Add an item to Chronicle
            </DialogTitle>
            <DialogContent>
               <ChronicleCardEditable
                  title={this.state.title}
                  location={this.state.location}
                  date={this.state.date}
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

               {/* just in case...
               //
               // <Card style={{marginTop: 16, marginBottom: 16}}>
               //    <CardHeader
               //       title={
               //          !this.state.rendertitle ?
               //             <TextField
               //                id="title"
               //                label="Title"
               //                name="title"
               //                type="text"
               //                value={this.state.title}
               //                onChange={this.handleChange}
               //                onBlur={
               //                   (e) => {
               //                      this.state.title !== "" && this.handleRenderField(e);
               //                   }
               //                }
               //                style={{display: 'flex'}}
               //             />
               //             :
               //             <div style={{display: 'flex', alignItems: 'center'}}>
               //                <Typography variant="title">
               //                   {this.state.title}
               //                </Typography>
               //                <IconButton
               //                   onClick={() => this.handleEditField("title")}
               //                   style={{marginLeft: 'auto'}}
               //                >
               //                   <EditIcon />
               //                </IconButton>
               //             </div>
               //       }
               //       subheader={
               //          <div
               //             style={{
               //                minWidth: (this.props.fullScreen ? 0 : 478),
               //                display: 'flex',
               //                flexDirection: 'column'
               //             }}
               //          >
               //             {!this.state.renderdate ?
               //                <TextField
               //                   id="date"
               //                   label="Date"
               //                   name="date"
               //                   type="text"
               //                   value={this.state.date}
               //                   onChange={this.handleChange}
               //                   onBlur={
               //                      (e) => {
               //                         this.state.date !== "" && this.handleRenderField(e);
               //                      }
               //                   }
               //                />
               //                   :
               //                <div style={{display: 'flex', alignItems: 'center'}}>
               //                   <Typography variant="caption">
               //                      {this.state.date}
               //                   </Typography>
               //                   <IconButton
               //                      onClick={() =>this.handleEditField("date")}
               //                      style={{marginLeft: 'auto'}}
               //                   >
               //                      <EditIcon />
               //                   </IconButton>
               //                </div>
               //             }
               //             {!this.state.renderlocation ?
               //                <TextField
               //                   id="location"
               //                   label="Location"
               //                   name="location"
               //                   type="text"
               //                   value={this.state.location}
               //                   onChange={this.handleChange}
               //                   onBlur={
               //                      (e) => {
               //                         this.state.location !== "" && this.handleRenderField(e);
               //                      }
               //                   }
               //                />
               //                   :
               //                <div style={{display: 'flex', alignItems: 'center'}}>
               //                   <Typography variant="caption">
               //                      {this.state.location}
               //                   </Typography>
               //                   <IconButton
               //                      onClick={() => this.handleEditField("location")}
               //                      style={{marginLeft: 'auto'}}
               //                   >
               //                      <EditIcon />
               //                   </IconButton>
               //                </div>
               //             }
               //          </div>
               //       }
               //    />
               //    {!this.state.renderMediaThumbnail ?
               //       <FileUpload
               //          accept="image/*, audio/*, video/*"
               //          file={this.state.file}
               //          handleFileChange={this.handleFileChange}
               //          handleFileDelete={this.handleFileDelete}
               //          uploading={this.state.uploading}
               //          uploadSuccess={this.state.uploadSuccess}
               //       />
               //          :
               //       <div>
               //          <CardMedia
               //             component={
               //                this.state.fileURL.split(':')[1].split('/')[0] === "image" ?
               //                   "img"
               //                      :
               //                   this.state.fileURL.split(':')[1].split('/')[0] 
               //             }
               //             src={this.state.fileURL}
               //             controls
               //          />
               //          <Button
               //             variant="outlined"
               //             color="inherit"
               //             onClick={this.handleFileDelete}
               //             style={{margin: '16px auto', display: 'flex'}}
               //          > Clear File
               //          </Button>
               //       </div>
               //    }
               //    <CardContent>
               //       <div
               //          style={{
               //             minWidth: (this.props.fullScreen ? 0 : 478),
               //             display: 'flex',
               //             flexDirection: 'column'
               //          }}
               //       >
               //          {!this.state.rendertxt ?
               //             <TextField
               //                multiline
               //                id="txt"
               //                label="Story, memory or caption..."
               //                name="txt"
               //                type="text"
               //                value={this.state.txt}
               //                onChange={this.handleChange}
               //                onBlur={
               //                   (e) => {
               //                      this.state.txt !== "" && this.handleRenderField(e);
               //                   }
               //                }
               //             />
               //                :
               //             <div style={{display: 'flex', alignItems: 'center'}}>
               //                <Typography variant="body1">
               //                   {this.state.txt}
               //                </Typography>
               //                <IconButton
               //                   onClick={() => this.handleEditField("txt")}
               //                   style={{marginLeft: 'auto'}}
               //                >
               //                   <EditIcon />
               //                </IconButton>
               //             </div>
               //          }
               //       </div>
               //    </CardContent>
               // </Card>
               */}

            </DialogContent>
            <DialogActions style={{marginLeft: 16, marginRight: 16}}>
               {this.state.error &&
                  <Typography
                     variant="body1"
                     style={{marginRight: 'auto', color: theme.palette.error.main}}
                  >
                     Please add media or a memory
                  </Typography>
               }
               <Button
                  onClick={
                     () => {
                        this.handleClearFields();
                        this.props.handleCloseChronicleAddItemModal();
                     }
                  }
               > Cancel
               </Button>
               <Button
                  variant="contained"
                  color="primary"
                  onClick={
                     () => {
                        this.newChronicle();
                     }
                  }
               > Add
               </Button>
            </DialogActions>
         </Dialog>
      )
   }
}

export default connect('', actions)(withMobileDialog()(ChronicleAddItemModal));
