import React from 'react';

// import Typography from '@material-ui/core/Typography';
import ChipInput from 'material-ui-chip-input';

const CreateMemorialSendInvitations = (props) => {
   return (
      <div
         style={{
            display: 'flex',
            flexDirection: 'column',
            maxWidth: 400
         }}>
         <ChipInput
            label="Enter email addresses"
            value={props.emails}
            onAdd={(email) => props.handleEmailAdd (email)}
            onDelete={(email) => props.handleEmailDelete(email)}
         />
      </div>
   )
}

export default CreateMemorialSendInvitations;
