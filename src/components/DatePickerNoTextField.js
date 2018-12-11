import React from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import withMobileDialog from '@material-ui/core/withMobileDialog';

import Divider from '@material-ui/core/Divider';

import LuxonUtils from 'material-ui-pickers/utils/luxon-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import DatePicker from 'material-ui-pickers/DatePicker';
import BasePicker from 'material-ui-pickers/_shared/BasePicker';
import Calendar from 'material-ui-pickers/DatePicker/components/Calendar';

import LeftArrowIcon from '@material-ui/icons/KeyboardArrowLeft';
import RightArrowIcon from '@material-ui/icons/KeyboardArrowRight';
import CalendarIcon from '@material-ui/icons/Event';
import SnowflakeIcon from '@material-ui/icons/AcUnit';
import CakeIcon from '@material-ui/icons/Cake';
import MenuIcon from '@material-ui/icons/Reorder';
import AppsIcon from '@material-ui/icons/Apps';

import theme from 'theme';

import { link3 } from 'links';

function getSteps() {
   return ['Year', 'Month / Season / Holiday', 'Day'];
}

const months = [
   'January', 'February', 'March',
   'April', 'May', 'June',
   'July', 'August', 'September',
   'October', 'November', 'December'
]

const seasons = [
   'Winter', 'Spring', 'Summer', 'Autumn'
]

const holidays = [
   "New Year's Day",
   "Easter",
   "Mother's Day",
   "Memorial Day",
   "Father's Day",
   "Fourth of July",
   "Halloween",
   "Thanksgiving",
   "Christmas"
]


// expects the following props:
//    born={number}
//    died={number}
//    handleSetDate={function}
//
class AppDatePickerNoTextField extends React.Component {
   state = {
      showDatePicker: false,
      activeStep: 0,
      date: '',
      year: '',
      month: '',
      monthIdx: null,
      season: '',
      holiday: '',
   };

   getStepContent = (step) => {
      switch (step) {
         case 0:
            return (
               <DatePickerYear
                  born={parseInt(this.props.born, 10)}
                  died={parseInt(this.props.died, 10)}
                  handleNext={this.handleNext}
                  handleSetYear={this.handleSetYear}
               />
            );
         case 1:
            return (
               <DatePickerMonthSeasonHoliday
                  handleNext={this.handleNext}
                  handleSetMonth={this.handleSetMonth}
                  handleSetSeason={this.handleSetSeason}
                  handleSetHoliday={this.handleSetHoliday}
                  gotoStep={this.gotoStep}
                />
            );
         case 2:
            return (
               <DatePickerDay
                  year={this.state.year}
                  month={this.state.month}
                  monthIdx={this.state.monthIdx}
                  handleExactDateChange={this.handleExactDateChange}
                  handleNext={this.handleNext}
               />
            );
         default:
            return 'Unknown step';
      }
   }

   gotoStep = (index) => {
      this.setState({ activeStep: index })
   }

   handleShowDatePicker = () => {
      this.setState({ showDatePicker: true });
   }

   handleCloseDatePicker = () => {
      this.setState({ showDatePicker: false });
      setTimeout(() => this.handleReset(), 50);
   }

   handleReturnDate = () => {
      this.props.handleSetDate(
         // if exact date is set, return it
         this.state.date ?
            this.state.date
            : // else if [month|season|holiday]
            this.state.month || this.state.season || this.state.holiday ?
               // return [month|season|holiday], year
               `${this.state.month || this.state.season || this.state.holiday}, ${this.state.year}`
               :
               // else return year '~year'
               `~${this.state.year}`
      );
      this.props.handleCloseDatePicker();
      this.handleReset();
   }

   handleReset = () => {
      this.gotoStep(0);
      this.setState({
         date: '',
         year: '',
         month: '',
         monthIdx: '',
         season: '',
         holiday: '',
      });
   }

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1,
    }));
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

   handleSetYear = (year) => {
      this.setState({ year: year, date: '' });
      this.handleNext();
   }

   handleSetMonth = (str, i) => {
      this.setState({ month: str, monthIdx: i, season: '', holiday: '', date: '' })
   }

   handleSetSeason = (str) => {
      this.setState({ season: str, month: '', holiday: '', date: '' })
   }

   handleSetHoliday = (str) => {
      this.setState({ holiday: str, month: '', season: '', date: ''})
   }

   handleShowExactPicker = () => {
      this.picker.open();
   }

   handleExactDateChange = () => {
      let exactDate = document.getElementById('exact-date').value;
      console.log(exactDate);
      this.setState({
         date: exactDate,
      });
      // this.handleNext();
   }

  render() {
    const steps = getSteps();
    const { activeStep } = this.state;

    return (
      <div>
         <Dialog
            open={this.props.showDatePicker}
            onClose={this.props.handleCloseDatePicker}
            fullScreen={this.props.fullScreen}
         >
            <DialogTitle
               disableTypography
               style={{
                  background: theme.palette.primary.dark,
                  color: 'white'
               }}
            >
               <div style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                  { !this.state.date && !this.state.year ?
                     <div>
                        <Typography variant="title" style={{color: 'white'}}>
                           Select a date
                        </Typography>
                        <Typography variant="caption" style={{color: 'white'}}>
                           If you don't know exactly, give a rough date
                        </Typography>
                     </div>
                     :
                     <div>
                        <Typography variant="display1" style={{color: 'white'}}>
                           { this.state.date ?
                              this.state.date
                              :
                              this.state.month || this.state.season || this.state.holiday ?
                                 `${this.state.month ? this.state.month + ", " : ""}
                                 ${this.state.season ? this.state.season + ", " : ""}
                                 ${this.state.holiday ? this.state.holiday + ", " : ""}
                                 ${this.state.year}`
                                 :
                                 `~${this.state.year}`
                           }
                        </Typography>
                     </div>
                  }
               </div>
            </DialogTitle>
            <DialogContent>
               <Stepper activeStep={activeStep} style={{margin: 0, padding: '16px 0px'}} orientation="vertical">
                {steps.map((label, index) => {
                  return (
                    <Step key={label}>
                          {/* Click on step label does nothing if it's the the currently active step.
                              No jumping around until a year has been selected.  I love all these crazy 
                              conditionals that are possible in jsx. I won't be able to read this next
                              week. */}
                       <StepLabel
                          onClick={
                             this.state.activeStep === index ?
                                null : this.state.year ? 
                                   () => this.gotoStep(index) : null
                          }
                          style={{
                             cursor: (this.state.year ? 'pointer' : 'unset'),
                             display: 'flex',
                             alignItems: 'space-between',
                          }}
                       >
                          <div
                             style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                             }}
                          >
                             <div
                                onClick={this.state.year ? () => this.gotoStep(index) : null}
                             >
                                {label}
                             </div>
                             {index > 0 && index < 3 &&
                                 <Button
                                    size="small"
                                    onClick={index === 1 ? () => this.gotoStep(3) : () => this.handleNext()}
                                    style={{
                                       display: (this.state.activeStep !== index ? 'none' : 'unset'),
                                       color: link3
                                    }}
                                 > Skip
                                 </Button>
                             }
                          </div>
                       </StepLabel>
                       <StepContent
                       >
                        {this.getStepContent(index)}
                      </StepContent>
                    </Step>
                  );
                })}
              </Stepper>
            </DialogContent>
            <DialogActions>
               <Button
                  onClick={this.props.handleCloseDatePicker}
               >Cancel
               </Button>
               <Button
                  color="primary"
                  variant="contained"
                  disabled={!this.state.year ? true : false}
                  onClick={this.handleReturnDate}
               > Ok
               </Button>
            </DialogActions>
         </Dialog>
      </div>
    );
  }
}

// const DatePickerCertainty = (props) => (
//    <div
//       style={{
//          display: 'flex',
//          flexDirection: 'column'
//       }}
//    >
//       <Button
//          variant="raised"
//          color="primary"
//          onClick={
//             () => {
//                props.handleShowExactPicker();
//                props.handleSetExact();
//             }}
//          style={{marginBottom: 16}}
//       > Exact
//       </Button>
//       <Button
//          variant="raised"
//          color="primary"
//          onClick={
//             () => {
//                props.handleSetRough();
//                props.handleNext();
//             }
//          }
//       > Rough
//       </Button>
//    </div>
// )

class DatePickerYear extends React.Component {
   state = {
      value: 0,
   }

   handleTabChange = (event, value) => {
      this.setState({ value });
   }

   render () {
      // array of dates from birth - present, e.g. [1956, 1957, ... 2017, 2018]
      let dates = Array.from(new Array(new Date().getFullYear() - this.props.born + 1), (x, i) => i + this.props.born);
      return (
         <div>
            <Paper elevation={4}>
               <Tabs value={this.state.value} onChange={this.handleTabChange}
                  indicatorColor="primary"
                  textColor="primary"
                  fullWidth
               >
                  <Tab label={<MenuIcon />}/>
                  <Tab label={<AppsIcon />}/>
               </Tabs>
            </Paper>
            <div
               style={{
                  maxHeight: 200,
                  width: 246,
                  overflowY: 'scroll',
                  margin: '0 auto'
               }}
            >
               {this.state.value === 0 && dates.map((date, i) => (
                  <div
                     key={i}
                     onClick={() => this.props.handleSetYear(date)}
                     style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        margin: 8,
                        cursor: 'pointer'
                     }}
                  >
                     <Button
                        color="primary"
                        variant="raised"
                        style={{marginRight: 24}}
                     > {date}
                     </Button>
                     <Typography
                        variant="caption"
                     > 
                        {/* lol */}
                        {date > this.props.died ?
                           date - this.props.died === 1 ? '1 year beyond' : `${date - this.props.died} years beyond`
                           :
                           date - this.props.born === 0 ? 
                              'Infancy'
                              :
                              date - this.props.born === 1 ? '1 year old' : `${date - this.props.born} years old`
                        }
                     </Typography>
                  </div>
               ))}
               {this.state.value === 1 && dates.map((date, i) => (
                     date.toString().endsWith('0') ?
                        <div key={i} style={{display: 'flex', alignItems: 'center', width: '100%'}}>
                           <Button
                              variant="raised"
                              color="primary"
                              onClick={() => this.props.handleSetYear(date)}
                              style={{margin: 4}}
                           > {date}
                           </Button>
                           <div
                              style={{
                                 display: 'flex',
                                 flexDirection: 'column',
                                 width: '100%',
                                 marginLeft: 8,
                                 marginRight: 24 
                              }}
                           >
                              <Divider />
                              <Divider />
                              <Divider />
                              <Divider />
                              <Divider />
                           </div>
                        </div>
                           :
                        <Button
                           key={i}
                           variant="raised"
                           color="primary"
                           onClick={() => this.props.handleSetYear(date)}
                           style={{margin: 4, display: 'inline-block'}}
                        > {date}
                        </Button>
               ))}
            </div>
         </div>
      )
   }
}

class DatePickerMonthSeasonHoliday extends React.Component {
   state = {
      value: 0
   }

   handleTabChange = (event, value) => {
      this.setState({ value });
   }

   render () {
      return (
         <div>
            <Paper elevation={4}
            >
               <Tabs value={this.state.value} onChange={this.handleTabChange}
                  indicatorColor="primary"
                  textColor="primary"
                  fullWidth
               >
                  <Tab label={<CalendarIcon />} />
                  <Tab label={<SnowflakeIcon />} />
                  <Tab label={<CakeIcon />} />
               </Tabs>
            </Paper>
            <div
               style={{
                  display: 'flex',
                  flexDirection: 'column',
                  maxHeight: 200,
                  overflowY: 'scroll',
               }}
            >
               {this.state.value === 0 &&
                  <div
                     style={{
                        display: 'flex',
                        flexDirection: 'column',
                     }}
                  >
                     {months.map((month, i) => (
                        <Button
                           key={i}
                           variant="raised"
                           color="primary"
                           onClick={
                              () => {
                                 this.props.handleNext();
                                 this.props.handleSetMonth(month, i);
                              }
                           }
                           style={{
                              margin: 8,
                              justifyContent: 'left',
                              textTransform: 'unset'
                           }}
                        > {month}
                        </Button>
                     ))}
                  </div>
               }
               {this.state.value === 1 &&
                  <div
                     style={{
                        display: 'flex',
                        flexDirection: 'column'
                     }}
                  >
                     {seasons.map((season, i) => (
                        <Button
                           key={i}
                           variant="raised"
                           color="primary"
                           onClick={
                              () => {
                                 this.props.gotoStep(3);
                                 this.props.handleSetSeason(season);
                              }
                           }
                           style={{
                              margin: 8,
                              justifyContent: 'left',
                              textTransform: 'unset'
                           }}
                        > {season}
                        </Button>
                     ))}
                  </div>
               }
               {this.state.value === 2 &&
                  <div
                     style={{
                        display: 'flex',
                        flexDirection: 'column'
                     }}
                  >
                     {holidays.map((holiday, i) => (
                        <Button
                           key={i}
                           variant="raised"
                           color="primary"
                           onClick={
                              () => {
                                 this.props.gotoStep(3);
                                 this.props.handleSetHoliday(holiday);
                              }
                           }
                           style={{
                              margin: 8,
                              justifyContent: 'left',
                              textTransform: 'unset'
                           }}
                        > {holiday}
                        </Button>
                     ))}
                  </div>
               }
            </div>
         </div>
      )
   }
}

class DatePickerDay extends React.Component {
   state = {
      calendarDate: this.props.month ? new Date(this.props.year, this.props.monthIdx) : ''
   }

   handleDateChange = (date) => {
      this.setState({ calendarDate: date });
      setTimeout(() => { this.props.handleExactDateChange() }, 25);
   }

   render () {
      return (
         <div style={{padding: '0px 4px'}}>
           <div className="picker"
              style={{
                 display: 'none'
              }}
           >
               <MuiPickersUtilsProvider utils={LuxonUtils}>
                  <DatePicker
                     id="exact-date"
                     key={Math.random()}
                     ref={(node) => { this.picker = node; }}
                     value={this.state.calendarDate}
                     format="DDD"
                     onChange={this.handleDateChange}
                     leftArrowIcon={<LeftArrowIcon />}
                     rightArrowIcon={<RightArrowIcon />}
                  />
               </MuiPickersUtilsProvider>
            </div>
            <MuiPickersUtilsProvider utils={LuxonUtils}>
               <BasePicker
                  id="exact-date"
                  value={this.state.calendarDate}
                  onChange={this.handleDateChange}
               >
                  {
                     ({
                        date,
                        handleAccept,
                        handleChange,
                        handleClear,
                        handleDismiss,
                     }) => (
                        <div>
                           <Calendar
                              key={Math.random()}
                              ref={(node) => { this.picker = node; }}
                              date={date}
                              format="DDD"
                              onChange={this.handleDateChange}
                              leftArrowIcon={<LeftArrowIcon />}
                              rightArrowIcon={<RightArrowIcon />}
                           />
                        </div>
                     )
                  }
               </BasePicker>
            </MuiPickersUtilsProvider>
         </div>
      )
   }
}

// class DatePickerConfirm extends React.Component {
//    state = {
//    }
//
//    render () {
//       return (
//          <div>
//             <Button
//                variant="outlined"
//                onClick={this.props.handleReset}
//                style={{marginRight: 16}}
//             > Reset
//             </Button>
//             <Button
//                variant="contained"
//                color="primary"
//                onClick={this.props.handleReturnDate}
//             >
//                Confirm Date
//             </Button>
//          </div>
//       )
//    }
// }

export default withMobileDialog()(AppDatePickerNoTextField);
