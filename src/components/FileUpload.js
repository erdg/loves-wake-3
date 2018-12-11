import React from 'react';
import Dropzone from 'react-dropzone';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import UploadIcon from '@material-ui/icons/CloudUpload';
import CheckIcon from '@material-ui/icons/Check';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';

import theme from 'theme';

// <FileUpload
//    handleFileChange={}
//    handleDeleteFile={}
//    uploading={}
//    uploadSuccess={}
// />

const FileUpload = (props) => {
      return (
         <div
            style={{
               display: 'flex',
               flexDirection: 'column',
               justifyContent: 'center',
               alignItems: 'center',
               position: 'relative'
            }}
         >
            <Dropzone
               onDrop={props.handleFileChange}
               accept={props.accept}
               style={{
                  border: '1px dashed rgba(0,0,0,0.54)',
                  borderRadius: '2px',
                  width: (props.width ? props.width : 256),
                  height: 256,
                  textAlign: 'center',
                  marginTop: 16
               }}
               acceptStyle={{
                  border: `1px solid ${theme.palette.primary.main}`,
               }}
               rejectStyle={{
                  border: `1px solid ${theme.palette.error.main}`,
               }}
            >
               <Typography
                  variant="caption"
                  style={{
                     marginTop: 32,
                     marginLeft: 48,
                     marginRight: 48,
                     marginBottom: 32 
                  }}
               >
                  Drop a file here, or click to select a file to upload.
               </Typography>
               <div style={{position: 'relative'}}>
                  <Button variant="fab" color={props.uploadSuccess ? "primary" : null}>
                     { props.uploadSuccess ?
                        <CheckIcon />
                           :
                        <UploadIcon />
                     }
                  </Button>
                  { props.uploading &&
                     <div>
                     <LinearProgress
                        variant="indeterminate"
                        style={{width: '50%', margin: '0 auto', marginTop: 16}}
                     />
                     </div>
                  }
               </div>
            </Dropzone>
            {props.uploadSuccess &&
               <Button
                  variant="raised"
                  onClick={props.handleFileDelete}
                  style={{position: 'absolute', bottom: 32}}
               >
                  Clear File
               </Button>
            }
         </div>
      )
   }

export default FileUpload;
