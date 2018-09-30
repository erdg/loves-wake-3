import React from 'react';
import { actions, API_ENDPOINT } from 'store';
import { connect } from 'unistore/react';
// import update from 'immutability-helper'

// import TextField from '@material-ui/core/TextField';
// import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// import Card from '@material-ui/core/Card';
// import CardHeader from '@material-ui/core/CardHeader';
// import CardMedia from '@material-ui/core/CardMedia';
// import CardContent from '@material-ui/core/CardContent';
// import CardActions from '@material-ui/core/CardActions';

class ChronicleDeleteItemModal extends React.Component {
   state = {
      id: this.props.id,
      // title: this.props.item.title || '',
      // location: this.props.item.location || '',
      // date: this.props.item.date || '',
      // txt: this.props.item.txt || '',
      // existingImage: this.props.item.imageSrc || '',
      // existingAudio: this.props.item.audioSrc || '',
      // existingVideo: this.props.item.videoSrc || '',
      // file: '',
      // fileURL: '',
      // uploading: false,
      // uploadSuccess: false,
      // rendertitle: this.props.item.title ? true : false,
      // renderdate: this.props.item.date ? true : false,
      // renderlocation: this.props.item.location ? true : false,
      // rendertxt: this.props.item.txt ? true : false,
      // renderMediaThumbnail: this.props.item.imageSrc || this.props.item.audioSrc || this.props.item.videoSrc || false,
      // error: false,
   }

   delChronicle = () => {
      fetch(API_ENDPOINT + "!delChronicle", {
         method: "POST",
         body: JSON.stringify({
            id: this.state.id,
            loginToken: window.sessionStorage.getItem('loginToken')
         })
      })
      .then(res => res.json())
      .then(json => {
         if (json.error) {
            alert(json.error);
         } else {
            this.props.handleCloseMenu();
            // update store
            this.props.delChronicleItem(this.state.id, this.props.memorialId);
         }
      })
   }

   render () {
      return (
         <Dialog
            open={this.props.showChronicleDeleteItemModal}
            onClose={
               () => {
                  this.props.handleCloseChronicleDeleteItemModal();
               }
            }
         >
            <DialogTitle>
               Delete Item from Chronicle?
            </DialogTitle>
            <DialogContent>
               <DialogContentText>
                  Are you sure you want to delete this item?
                  This action cannot be undone.
               </DialogContentText>
               {/* just in case we need a preview of the card to be deleted...
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
                //          {this.state.existingImage &&
                //             <CardMedia component="img" src={this.state.existingImage} />
                //          }
                //          {this.state.existingAudio &&
                //             <CardMedia component="audio" src={this.state.existingAudio} controls />
                //          }
                //          {this.state.existingVideo &&
                //             <CardMedia component="video" src={this.state.existingVideo} controls />
                //          }
                //          {this.state.file &&
                //             <CardMedia
                //                component={
                //                   this.state.fileURL.split(':')[1].split('/')[0] === "image" ?
                //                      "img"
                //                         :
                //                      this.state.fileURL.split(':')[1].split('/')[0] 
                //                }
                //                src={this.state.fileURL}
                //                controls
                //             />
                //          }
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
               <Button
                  color="primary"
                  onClick={
                     () => {
                        this.props.handleCloseChronicleDeleteItemModal();
                     }
                  }
               > Cancel
               </Button>
               <Button
                  color="primary"
                  onClick={
                     () => {
                        this.delChronicle();
                        this.props.handleCloseChronicleDeleteItemModal();
                     }
                  }
               > Delete
               </Button>
            </DialogActions>
         </Dialog>
      )
   }
}

export default connect('', actions)(ChronicleDeleteItemModal);
