import React from 'react';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
// import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MailIcon from '@material-ui/icons/Mail';

import TextDialog from 'components/TextDialog';

class CreateMemorialChooseInvitation extends React.Component {
   state = {
      previewOpen: false
   }

   handlePreviewOpen = () => {
      this.setState({ previewOpen: true })
   }

   handlePreviewClose = () => {
      this.setState({ previewOpen: false })
   }

   render () {
      // edit templates below
      const mourn = 'This is the mourn together template...';
      const heal = 'This is the heal together template...';
      const remember = 'This is the remember together template...';
      return (
         <div style={{display: 'flex', flexDirection: 'column'}}>
            <RadioGroup
               aria-label="Invitation Template"
               name="invitation"
               value={this.props.invitation}
               onChange={this.props.handleChange}
            >
               <FormControlLabel
                  value={mourn}
                  control={<Radio />}
                  label="Mourn Together"
               >
               </FormControlLabel>
               <FormControlLabel
                  value={heal}
                  control={<Radio />}
                  label="Heal Together"
               />
               <FormControlLabel
                  value={remember}
                  control={<Radio />}
                  label="Remember Together"
               />
            </RadioGroup>
            <Button
               color="primary"
               variant="outlined"
               onClick={this.handlePreviewOpen}
            > Preview invitation <MailIcon style={{marginLeft: 8}}/>
            </Button>
            <TextDialog
               open={this.state.previewOpen}
               handleClose={this.handlePreviewClose}
               title={"In memory of " + this.props.name}
               content={this.props.invitation}
            />
         </div>
      )
   }
}

export default CreateMemorialChooseInvitation;
