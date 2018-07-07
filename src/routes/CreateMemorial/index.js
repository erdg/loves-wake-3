import React from 'react';
// import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Fade from '@material-ui/core/Fade';
import Divider from '@material-ui/core/Divider';

import MemorialAvatar from 'components/MemorialAvatar';

// memorial creation steps
import CreateMemorialName from './CreateMemorialName';
import CreateMemorialPhoto from './CreateMemorialPhoto';
import CreateMemorialBasicInfo from './CreateMemorialBasicInfo';
import CreateMemorialChooseInvitation from './CreateMemorialChooseInvitation';
import CreateMemorialCustomizeInvitation from './CreateMemorialCustomizeInvitation';
import CreateMemorialSendInvitations from './CreateMemorialSendInvitations';

function getSteps() {
   return [
      'Who are you honoring?',
      'Add a photo',
      'Basic Memorial Info',
      'Choose Invitation Template',
      'Customize Invitation',
      'Send Invitations'
   ];
}

class CreateMemorial extends React.Component {
   state = {
      activeStep: 0,
      activeStepVisible: true,
      skipped: new Set(),

      name: '',
      born: '',
      died: '',

      invitation: '',
      emails: [],

      file: null,
      fileURL: '',
      // for fancy upload animation
      uploading: false,
      uploadSuccess: false,

   };

   handleChange = (e) => {
      this.setState({ [e.target.name]: e.target.value });
   }

   handleFileChange = (files) => {
      console.log(files[0].name)
      this.setState({ file: files[0].name })
      this.setState({ uploading: true });
      this.makeFileURL(files[0]);
   }

   makeFileURL = (file) => {
      let reader = new FileReader();
      reader.onload = (e) => {
         setTimeout(() => {
            this.setState({
               fileURL: e.target.result,
               uploading: false,
               uploadSuccess: true
            });
         }, 750);
      }
      reader.readAsDataURL(file);
   }

   handleFileDelete = () => {
      this.setState({
         file: null,
         fileURL: '',
         uploading: false,
         uploadSuccess: false
      })
   }

   handleEmailAdd = (email) => {
      this.setState({ emails: [...this.state.emails, email] })
   }

   handleEmailDelete = (email) => {
      let emails = this.state.emails.filter((em) => em !== email);
      this.setState({ emails: emails });
   }

   getStepContent = (step) => {
      switch (step) {
         case 0:
            return (
               <CreateMemorialName
                  name={this.state.name}
                  handleChange={this.handleChange}
               />
            );
         case 1:
            return (
               <CreateMemorialPhoto
                  file={this.state.file}
                  handleFileChange={this.handleFileChange}
                  handleFileDelete={this.handleFileDelete}
                  uploading={this.state.uploading}
                  uploadSuccess={this.state.uploadSuccess}
               />
            );
         case 2:
            return (
               <CreateMemorialBasicInfo
                  handleChange={this.handleChange}
                  born={this.state.born}
                  died={this.state.died}
               />
            );
         case 3:
            return (
               <CreateMemorialChooseInvitation
                  handleChange={this.handleChange}
                  name={this.state.name}
                  invitation={this.state.invitation}
               />
            );
         case 4:
            return (
               <CreateMemorialCustomizeInvitation
                  handleChange={this.handleChange}
                  name={this.state.name}
                  invitation={this.state.invitation}
               />
            );
         case 5:
            return (
               <CreateMemorialSendInvitations
                  emails={this.state.emails}
                  handleEmailAdd={this.handleEmailAdd}
                  handleEmailDelete={this.handleEmailDelete}
               />
            );
         default:
            return 'Unknown step';
      }
   }

   isStepOptional = step => {
      let optionalSteps = [ 1, 3, 4, 5];
      if (optionalSteps.includes(step)) {
         return true
      }
   };

   isStepSkipped(step) {
      return this.state.skipped.has(step);
   }

   handleNext = () => {
      const { activeStep } = this.state;
      let { skipped } = this.state;
      if (this.isStepSkipped(activeStep)) {
         skipped = new Set(skipped.values());
         skipped.delete(activeStep);
      }
      // hacky timeouts to smooth ui transitions...
      this.setState({ activeStepVisible: false });
      setTimeout(() => {this.setState({ activeStep: activeStep + 1, skipped, })}, 0);
      setTimeout(() => {this.setState({activeStepVisible: true})}, 0);
   }

   handleBack = () => {
      const { activeStep } = this.state;
      // hacky timeouts to smooth ui transitions...
      this.setState({ activeStepVisible: false });
      setTimeout(() => {this.setState({ activeStep: activeStep - 1 })}, 0);
      setTimeout(() => {this.setState({activeStepVisible: true})}, 0);
   };

   handleSkip = () => {
      const { activeStep } = this.state;
      if (!this.isStepOptional(activeStep)) {
         // You probably want to guard against something like this,
         // it should never occur unless someone's actively trying to break something.
         throw new Error("You can't skip a step that isn't optional.");
      }
      const skipped = new Set(this.state.skipped.values());
      skipped.add(activeStep);
      // hacky timeouts to smooth ui transitions...
      this.setState({ activeStepVisible: false });
      setTimeout(() => {this.setState({ activeStep: this.state.activeStep + 1, skipped })}, 0);
      setTimeout(() => {this.setState({activeStepVisible: true})}, 0);
   };

   handleReset = () => {
      this.setState({
         activeStep: 0,
      });
   };

   render() {
      // const { classes } = this.props;
      const steps = getSteps();
      const { activeStep } = this.state;

      return (
         <div >
            <Typography variant="title">
               Create a New Memorial
            </Typography>
            <Stepper activeStep={activeStep} orientation="vertical">
               {steps.map((label, index) => {
                  const props = {};
                  const labelProps = {};
                  if (this.isStepOptional(index)) {
                     labelProps.optional = <Typography variant="caption">Optional</Typography>;
                  }
                  if (this.isStepSkipped(index)) {
                     props.completed = false;
                  }
                  return (
                     <Step key={label} {...props} style={{width: 320}}>
                        <StepLabel {...labelProps}>{label}</StepLabel>
                        <Fade in={this.state.activeStepVisible}>
                           <StepContent>
                              {activeStep === steps.length ? (
                                 <div>
                                    <Typography >
                                       All steps completed - you&quot;re finished
                                    </Typography>
                                    <Button onClick={this.handleReset} >
                                       Reset
                                    </Button>
                                 </div>
                              ) : (
                                 <div>
                                    { this.state.activeStep > 0 &&
                                       <div>
                                          <Divider style={{margin: '16px 48px'}}/>
                                          <Typography variant="caption" style={{textAlign: 'center'}}>
                                             in memoriam
                                          </Typography>
                                          <div
                                             style={{
                                                textAlign: 'center',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                margin: '8px 0px'
                                             }}
                                          >
                                             <MemorialAvatar
                                                name={this.state.name}
                                                src={this.state.fileURL}
                                                born={this.state.born}
                                                died={this.state.died}
                                             >
                                                { this.state.born &&
                                                   <Typography
                                                      variant="caption"
                                                      style={{display: 'inline'}}
                                                   >
                                                      {!this.state.died && "b."} {this.state.born}
                                                   </Typography>
                                                }
                                                {this.state.died &&
                                                   <Typography
                                                      variant="caption"
                                                      style={{display: 'inline'}}
                                                   >
                                                      {" -"} {this.state.died}
                                                   </Typography>
                                                }
                                             </MemorialAvatar>
                                          </div>
                                          <Divider style={{margin: '16px 48px'}}/>
                                       </div>
                                    }
                                    {this.getStepContent(activeStep)}
                                    <div style={{display: 'flex', justifyContent: 'space-between', marginTop: 32}}>
                                       <Button
                                          disabled={activeStep === 0}
                                          onClick={this.handleBack}
                                          style={{margin: 2}}
                                       > Back
                                       </Button>
                                       {this.isStepOptional(activeStep) && (
                                          <Button
                                             variant="outlined"
                                             onClick={this.handleSkip}
                                             style={{margin: 2}}
                                          > Skip
                                          </Button>
                                       )}
                                       <Button
                                          variant="contained"
                                          color="primary"
                                          onClick={this.handleNext}
                                          style={{margin: 2}}
                                       > {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                       </Button>
                                    </div>
                                 </div>
                              )}
                           </StepContent>
                        </Fade>
                     </Step>
                  );
               })}
            </Stepper>
         </div>
      );
   }
}

export default CreateMemorial;
