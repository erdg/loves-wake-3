import React from 'react';
import Dropzone from 'react-dropzone';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import UploadIcon from '@material-ui/icons/CloudUpload';
import CheckIcon from '@material-ui/icons/Check';
import CircularProgress from '@material-ui/core/CircularProgress';

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
               alignItems: 'center'
            }}
         >
            <Dropzone
               onDrop={props.handleFileChange}
               accept={props.accept}
               style={{
                  border: '1px dashed rgba(0,0,0,0.54)',
                  borderRadius: '2px',
                  width: 256,
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
                     marginTop: '24%',
                     marginLeft: 48,
                     marginRight: 48,
                     marginBottom: 16
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
                     <CircularProgress
                        size={80}
                        style={{
                           position: 'absolute',
                           top: -12,
                           right: 88,
                           zIndex: 1
                        }}
                     />
                  }
               </div>
            </Dropzone>
            <Button
               variant="outlined"
               onClick={props.handleFileDelete}
               style={{marginTop: 16}}
               disabled={!props.file}
            >
               Clear File
            </Button>
         </div>
      )
   }

export default FileUpload;
