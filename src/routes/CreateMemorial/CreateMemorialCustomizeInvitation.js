import React from 'react';

import marked from 'marked';
// import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import TextDialog from 'components/TextDialog';
import MailIcon from '@material-ui/icons/Mail';

class CreateMemorialCustomizeInvitation extends React.Component {
   state = {
      previewOpen: false
   }

   componentDidMount () {
      marked.setOptions({
         sanitize: true
      })
   }

   handlePreviewOpen = () => {
      this.setState({ previewOpen: true })
   }

   handlePreviewClose = () => {
      this.setState({ previewOpen: false })
   }

   render () {
      return (
         <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
            <TextField
               id="invitation"
               label="Invitation"
               name="invitation"
               value={this.props.invitation}
               onChange={this.props.handleChange}
               multiline={true}
               rows={12}
            />
            <Button
               style={{marginTop: 16}}
               variant="outlined"
               color="primary"
               onClick={this.handlePreviewOpen}
            > Preview Invitation
               <MailIcon style={{marginLeft: 8}}/>
            </Button>
            <TextDialog
               open={this.state.previewOpen}
               handleClose={this.handlePreviewClose}
               title={"In memory of " + this.props.name}
               content={
                  <div
                     dangerouslySetInnerHTML={{__html: marked(this.props.invitation)}}
                  />
               }
            />
         </div>
      )
   }
}

export default CreateMemorialCustomizeInvitation;
