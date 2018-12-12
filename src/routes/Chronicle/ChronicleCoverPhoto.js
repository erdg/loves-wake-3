import React from 'react';
import Typography from '@material-ui/core/Typography';
import UploadPhotoIcon from '@material-ui/icons/PhotoLibrary';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/CheckCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FileUpload from 'components/FileUpload';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Collapse from '@material-ui/core/Collapse'
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

class ChronicleCoverPhoto extends React.Component {
   state = {
      file: '',
      fileURL: '',
      uploadPhoto: false,
      uploading: false,
      uploadSuccess: false,
      renderMediaThumbnail: false,
   }

   handleUploadPhotoClick = () => {
      this.setState({ uploadPhoto: !this.state.uploadPhoto })
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

   render () {
      return (
         <div>
            {this.props.memorial.chronicleCoverPhoto ?
               <div>Cover Photo</div>
                  :
               <div>
               <div
                  onClick={this.state.uploadSuccess ?
                        () => {}
                        :
                        () => {this.handleUploadPhotoClick()}
                  }
                  style={{
                     display: 'flex',
                     alignItems: 'center',
                     margin: 16,
                     marginBottom: this.state.uploadSuccess ? 16 : 0,
                     background: '#f0f0f0',
                     borderRadius: 4,
                     cursor: !this.state.uploadSuccess ? 'pointer' : 'initial'
                  }}
               >
                  <div style={{display: 'flex', margin: 12,}}>
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
                     style={{
                        marginLeft: 8,
                        cursor: !this.state.uploadSuccess ? 'pointer' : 'initial',
                        color: 'rgba(0,0,0,0.54)'
                     }}
                  >
                     Add a cover photo
                  </Typography>
                  {this.state.uploadSuccess &&
                        <IconButton
                           onClick={this.handleFileDelete}
                           style={{marginLeft: 'auto', zIndex: 12}}
                        >
                           <DeleteIcon />
                        </IconButton>
                  }
                  <IconButton
                     onClick={this.state.uploadSuccess ? () => {alert('Cover Photo Added')} : () => {}}
                     style={{
                        marginLeft: this.state.uploadSuccess ? 0 : 'auto'
                     }}
                  >
                     {this.state.uploadSuccess ?  <CloudUploadIcon color="primary" /> :
                           this.state.uploadPhoto ? 
                              <CloseIcon />
                                 : 
                              <AddIcon />
                     }
                  </IconButton>
               </div>
               <div style={{width: '100%', marginBottom: 16}}>
                  <Collapse in={this.state.uploadPhoto} timeout={400}>
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
                     }
                  </Collapse>
               </div>
            </div>
            }
         </div>
      )
   }
}

export default ChronicleCoverPhoto;
