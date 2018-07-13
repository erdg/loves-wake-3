import React from 'react';
import FileUpload from 'components/FileUpload'

const CreateMemorialPhoto = (props) => {
   return (
      <FileUpload
         file={props.file}
         handleFileChange={props.handleFileChange}
         handleFileDelete={props.handleFileDelete}
         uploading={props.uploading}
         uploadSuccess={props.uploadSuccess}
         accept="image/*"
      />
   )
}

export default CreateMemorialPhoto;
