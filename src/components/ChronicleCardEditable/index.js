import React from 'react';
import marked from 'marked';

import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
// import CardActions from '@material-ui/core/CardActions';

// import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
// import withMobileDialog from '@material-ui/core/withMobileDialog';
import FileUpload from 'components/FileUpload';

import DatePicker from 'components/DatePicker';

// import theme from 'theme';

// expects the following props:
//
//       title: '',
//       location: '',
//       date: '',
//       txt: '',
//       file: '',
//       fileURL: '',
//       uploading: false,
//       uploadSuccess: false,
//       rendertitle: false,
//       renderdate: false,
//       renderlocation: false,
//       rendertxt: false,
//       renderMediaThumbnail: false,
//
// and the following function props:
//
//       handleChange
//       handleRenderField
//       handleEditField
//       handleFileChange
//       makeFileURL
//       handleFileDelete
//       handleClearFields
//       
// don't know if this is a good idea to break off
// into a functional component. seems pretty tied
// to the context in which it occurs.

const ChronicleCardEditable = (props) => {
   return (
      <Card
         style={{
            marginTop: 24,
         }}
      >
         <CardHeader
            title={<div>
               {/*
               !props.rendertitle ?
                  <TextField
                     id="title"
                     label="Title"
                     name="title"
                     type="text"
                     value={props.title}
                     onChange={props.handleChange}
                     onBlur={
                        (e) => {
                           props.title !== "" && props.handleRenderField(e);
                        }
                     }
                     multiline
                     style={{
                        display: 'flex',
                     }}
                  />
                  :
                  <div style={{display: 'flex', alignItems: 'center'}}>
                     <Typography variant="title">
                        {props.title}
                     </Typography>
                     <IconButton
                        onClick={() => props.handleEditField("title")}
                        style={{marginLeft: 'auto'}}
                     >
                        <EditIcon />
                     </IconButton>
                  </div>
                  */}
               </div>
            }
            subheader={
               <div
                  style={{
                     minWidth: (props.fullScreen ? 0 : 478),
                     display: 'flex',
                     flexDirection: 'column'
                  }}
               >
                  {!props.renderdate ?
                     <DatePicker
                        id="date"
                        label="Date"
                        name="date"
                        born={props.born}
                        died={props.died}
                        value={props.date}
                        handleSetDate={props.handleSetDate}
                        onBlur={
                           (e) => {
                              props.date !== "" && props.handleRenderField(e);
                           }
                        }
                     />
                        :
                     <div style={{display: 'flex', alignItems: 'center'}}>
                        <Typography variant="caption">
                           {props.date}
                        </Typography>
                        <IconButton
                           onClick={() => props.handleEditField("date")}
                           style={{marginLeft: 'auto'}}
                        >
                           <EditIcon />
                        </IconButton>
                     </div>
                  }
               </div>
            }
         />
         {!props.renderMediaThumbnail ?
            <FileUpload
               accept="image/*, audio/*, video/*"
               file={props.file}
               handleFileChange={props.handleFileChange}
               handleFileDelete={props.handleFileDelete}
               uploading={props.uploading}
               uploadSuccess={props.uploadSuccess}
            />
               :
            <div style={{display: 'flex', flexDirection: 'column'}}>
               <CardMedia
                  component={
                     props.fileURL.split(':')[1].split('/')[0] === "image" ?
                        "img"
                           :
                        props.fileURL.split(':')[1].split('/')[0] 
                  }
                  src={props.fileURL}
                  controls
               />
               <Button
                  variant="contained"
                  onClick={props.handleFileDelete}
                  mini
                  style={{
                     margin: '16px auto',
                     alignSelf: 'center'
                  }}
               > Choose a different file
               </Button>
            </div>
         }
         <CardContent>
            <div
               style={{
                  minWidth: (props.fullScreen ? 0 : 478),
                  display: 'flex',
                  flexDirection: 'column'
               }}
            >
               {!props.renderlocation ?
                  <TextField
                     id="location"
                     label="Location"
                     name="location"
                     type="text"
                     value={props.location}
                     onChange={props.handleChange}
                     onBlur={
                        (e) => {
                           props.location !== "" && props.handleRenderField(e);
                        }
                     }
                  />
                     :
                  <div
                     style={{display: 'flex', alignItems: 'center'}}
                     onClick={() => props.handleEditField("location")}
                  >
                     <Typography variant="caption">
                        {props.location}
                     </Typography>
                     <IconButton
                        style={{marginLeft: 'auto'}}
                     >
                        <EditIcon />
                     </IconButton>
                  </div>
               }

               {!props.rendertxt ?
                  <TextField
                     multiline
                     id="txt"
                     label="Story, memory or caption"
                     name="txt"
                     type="text"
                     value={props.txt}
                     onChange={props.handleChange}
                     onBlur={
                        (e) => {
                           props.txt !== "" && props.handleRenderField(e);
                        }
                     }
                  />
                     :
                  <div
                     style={{display: 'flex', alignItems: 'center'}}
                     onClick={() => props.handleEditField("txt")}
                  >
                     {/*
                     <Typography variant="body1">
                        {props.txt}
                     </Typography>
                     */}
                     <div dangerouslySetInnerHTML={{__html: marked(props.txt)}} />
                     <IconButton
                        style={{marginLeft: 'auto'}}
                     >
                        <EditIcon />
                     </IconButton>
                  </div>
               }
            </div>
         </CardContent>
      </Card>
   )
}

export default ChronicleCardEditable;
