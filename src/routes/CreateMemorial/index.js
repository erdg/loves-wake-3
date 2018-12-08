import React from 'react';
import { connect } from 'unistore/react';
import { actions } from 'store';
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
// import CreateMemorialChooseInvitation from './CreateMemorialChooseInvitation';
// import CreateMemorialCustomizeInvitation from './CreateMemorialCustomizeInvitation';
// import CreateMemorialSendInvitations from './CreateMemorialSendInvitations';

const dateObjFromStr = (string) => {
   let str = string.split(', ');
   switch (str.length) {
      case 1:  // year only, e.g. "~1992"
         // create Date obj from year, e.g. new Date("1992")
         return new Date(str[0].split(/[^\d]/).find((n) => n.length === 4), 0, 1, 2);
      default: // month || month/day || season || holiday
         let str1 = str[0].split(' ');
         switch (str1.length) {
            case 1:
               // date from month, season or holiday
               return dateObjFromMonthSeasonHoliday(str);
            case 2:
               // could be exact date (e.g. "January 12, 1982") or multi-word holiday (e.g. "Mother's Day")
               let day = parseInt(str1[1], 10);
               // console.log(day);
               // if exact date
               if (!isNaN(day)) {
                  return new Date(string);
               } else {
               // else holiday
               return dateObjFromMonthSeasonHoliday(str);
               }
            default: 
               return dateObjFromMonthSeasonHoliday(str);
         }
   }
}

const dateObjFromMonthSeasonHoliday = (arr) => {
   // console.log(arr);
   switch (arr[0]) {
      // months
      case "January":
         return new Date(arr[1], 0);
      case "February":
         return new Date(arr[1], 1);
      case "March":
         return new Date(arr[1], 2);
      case "April":
         return new Date(arr[1], 3);
      case "May":
         return new Date(arr[1], 4);
      case "June":
         return new Date(arr[1], 5);
      case "July":
         return new Date(arr[1], 6);
      case "August":
         return new Date(arr[1], 7);
      case "September":
         return new Date(arr[1], 8);
      case "October":
         return new Date(arr[1], 9);
      case "November":
         return new Date(arr[1], 10);
      case "December":
         return new Date(arr[1], 11);
      // seasons
      case "Winter":
         return new Date(arr[1], 1, 1);
      case "Spring":
         return new Date(arr[1], 2, 20);
      case "Summer":
         return new Date(arr[1], 5, 20);
      case "Autumn":
         return new Date(arr[1], 8, 22);
      // holidays
      case "New Year's Day":
         return new Date(arr[1], 0, 1, 1);
      case "Easter":
         return new Date(arr[1], 3, 5);
      case "Mother's Day":
         return new Date(arr[1], 4, 11);
      case "Memorial Day":
         return new Date(arr[1], 4, 28);
      case "Father's Day":
         return new Date(arr[1], 5, 18);
      case "Fourth of July":
         return new Date(arr[1], 6, 4);
      case "Halloween":
         return new Date(arr[1], 9, 31);
      case "Thanksgiving":
         return new Date(arr[1], 10, 25);
      case "Christmas":
         return new Date(arr[1], 11, 25);
      // unknown -> today's date (placed at bottom of chronicle)
      default:
         return new Date();
   }
}

function getSteps() {
   return [
      'Who are you honoring?',
      'Add a photo',
      'Basic Memorial Info',
      // 'Choose Invitation Template',
      // 'Customize Invitation',
      // 'Send Invitations'
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

   componentDidMount () {
      !this.props.user.email && this.props.getUserData();
   }

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

   handleSetBorn = (selectedDate) => {
      this.setState({ born: selectedDate });
      // if (!this.state.edited) {
      //    this.setState({ edited: true })
      // }
   }

   handleSetDied = (selectedDate) => {
      this.setState({ died: selectedDate });
      // if (!this.state.edited) {
      //    this.setState({ edited: true })
      // }
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
                  handleSetBorn={this.handleSetBorn}
                  handleSetDied={this.handleSetDied}
                  born={this.state.born}
                  died={this.state.died}
               />
            );
         // case 3:
         //    return (
         //       <CreateMemorialChooseInvitation
         //          handleChange={this.handleChange}
         //          name={this.state.name}
         //          invitation={this.state.invitation}
         //       />
         //    );
         // case 4:
         //    return (
         //       <CreateMemorialCustomizeInvitation
         //          handleChange={this.handleChange}
         //          name={this.state.name}
         //          invitation={this.state.invitation}
         //       />
         //    );
         // case 5:
         //    return (
         //       <CreateMemorialSendInvitations
         //          emails={this.state.emails}
         //          handleEmailAdd={this.handleEmailAdd}
         //          handleEmailDelete={this.handleEmailDelete}
         //       />
         //    );
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

   handleCreateMemorial = () => {
      // alert("Memorial Created")
      this.props.newMemorial(
         this.state.name,
         this.state.born,
         this.state.died,
         this.state.fileURL.split(",")[1],
      )
   }

   render() {
      // const { classes } = this.props;
      const steps = getSteps();
      const { activeStep } = this.state;

      return (
         <div style={{width: '92%', margin: '0 auto', marginTop: 16}}>
            {activeStep === 0 ? 
            <Typography variant="headline" paragraph style={{marginTop: 8, marginBottom: 16}}>
               Create A New Memorial
            </Typography>
               :
            <div>
               { this.state.activeStep > 0 &&
                     <Fade in={activeStep > 0}
                        style={{margin: '16px 0px'}}
                     >
                     <div>
                     <Divider style={{margin: '4px 16px'}}/>
                     <Typography variant="caption" style={{textAlign: 'center', margin: 4}}>
                        in memoriam
                     </Typography>
                     <div
                        style={{
                           textAlign: 'center',
                           display: 'flex',
                           justifyContent: 'center',
                        }}
                     >
                        <MemorialAvatar
                           name={this.state.name}
                           src={this.state.fileURL}
                           born={this.state.born}
                           died={this.state.died}
                           variant="headline"
                        >
                           { this.state.born &&
                              <Typography
                                 style={{marginTop: 4}}
                                 variant="caption"
                              >
                                 {this.state.born}
                              </Typography>
                           }
                           {this.state.died &&
                              <Typography
                                 variant="caption"
                                 style={{display: 'inline'}}
                              >
                                 {this.state.died}
                              </Typography>
                           }
                        </MemorialAvatar>
                     </div>
                     <Divider
                        style={{
                           margin: '4px 16px',
                           marginTop: this.state.born ? 4 : 24
                        }}
                     />
                  </div>
                  </Fade>
               }
            </div>
            }

            <Stepper
               activeStep={activeStep}
               orientation="vertical"
               style={{
                  padding: 0,
                  paddingTop: activeStep === 0 ? 0 : 16
               }}
            >
               {steps.map((label, index) => {
                  const props = {};
                  const labelProps = {};
                  if (this.isStepOptional(index)) {
                     labelProps.optional = 
                        <Typography variant="caption" style={{marginTop: this.state.activeStep === 1 ? -8 : 0}}>
                           Optional
                        </Typography>;
                  }
                  if (this.isStepSkipped(index)) {
                     props.completed = false;
                  }
                  return (
                     <Step key={label} {...props} style={{width: 320}}>
                        <StepLabel {...labelProps}>
                           <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                              {label}
                              <div style={{alignSelf: 'flex-end'}}>
                                 {activeStep === index &&
                                    <div>
                                       {activeStep > 0 &&
                                          <Button
                                             disabled={activeStep === 0}
                                             onClick={this.handleBack}
                                             size="small"
                                             style={{margin: 2}}
                                          > Back
                                          </Button>
                                       }
                                       {(this.isStepOptional(activeStep) && !this.state.uploadSuccess) &&
                                          <Button
                                             variant="outlined"
                                             onClick={this.handleSkip}
                                             size="small"
                                             style={{margin: 2}}
                                             disabled={this.state.activeStep === 1 && this.state.fileURL}
                                          > Skip
                                          </Button>
                                       }
                                       {(activeStep === 1 && !this.state.uploadSuccess) ||
                                       <Button
                                          variant="contained"
                                          size="small"
                                          color="primary"
                                          onClick={this.state.activeStep === 2 ? this.handleCreateMemorial : this.handleNext}
                                          disabled={
                                             (this.state.activeStep === 0 && !this.state.name)
                                                ||
                                             (this.state.activeStep === 1 && !this.state.uploadSuccess)
                                                ||
                                             (this.state.activeStep === 2 && (
                                                (!this.state.born || !this.state.died)
                                                   || 
                                                (dateObjFromStr(this.state.born) > dateObjFromStr(this.state.died))
                                             ))
                                          }
                                          style={{margin: 2}}
                                       > {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                       </Button>
                                       }
                                    </div>
                                 }
                              </div>
                           </div>
                        </StepLabel>
                        <Fade in={this.state.activeStepVisible}>
                           <StepContent>
                                 <div>
                                    {/* this.state.activeStep > 0 &&
                                       <div>
                                          <Divider style={{margin: 4}}/>
                                          <Typography variant="caption" style={{textAlign: 'center', margin: 4}}>
                                             in memoriam
                                          </Typography>
                                          <div
                                             style={{
                                                textAlign: 'center',
                                                display: 'flex',
                                                justifyContent: 'center',
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
                                                      style={{marginTop: 4}}
                                                      variant="caption"
                                                   >
                                                      {this.state.born}
                                                   </Typography>
                                                }
                                                {this.state.died &&
                                                   <Typography
                                                      variant="caption"
                                                      style={{display: 'inline'}}
                                                   >
                                                      {this.state.died}
                                                   </Typography>
                                                }
                                             </MemorialAvatar>
                                          </div>
                                          <Divider
                                             style={{
                                                margin: 4,
                                                marginBottom: 24,
                                                marginTop: this.state.born ? 4 : 24
                                             }}
                                          />
                                       </div>
                                       */}
                                    {this.getStepContent(activeStep)}
                                    {this.state.activeStep === 2 && 
                                       (dateObjFromStr(this.state.born) > dateObjFromStr(this.state.died))
                                          &&
                                       <Typography variant="caption" color="error" align="center">
                                          Date of Birth cannot be after Date of Death
                                       </Typography>
                                    }
                                    {/*
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
                                             disabled={this.state.activeStep === 1 && this.state.fileURL}
                                          > Skip
                                          </Button>
                                       )}
                                       <Button
                                          variant="contained"
                                          color="primary"
                                          onClick={this.state.activeStep === 2 ? this.handleCreateMemorial : this.handleNext}
                                          disabled={
                                             (this.state.activeStep === 0 && !this.state.name)
                                                ||
                                             (this.state.activeStep === 1 && !this.state.uploadSuccess)
                                                ||
                                             (this.state.activeStep === 2 && (
                                                (!this.state.born || !this.state.died)
                                                   || 
                                                (dateObjFromStr(this.state.born) > dateObjFromStr(this.state.died))
                                             ))
                                          }
                                          style={{margin: 2}}
                                       > {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                       </Button>
                                    </div>
                                    */}
                                 </div>
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

export default connect("user", actions)(CreateMemorial);
