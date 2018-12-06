import React from 'react';
import CreateMemorialDatePicker from './CreateMemorialDatePicker';

const CreateMemorialBasicInfo = (props) => {
   return (
      <div style={{display: 'flex', flexDirection: 'column'}}>
         <div style={{margin: 8}}>
         <CreateMemorialDatePicker
             id="born"
             label="Born"
             start={1900}
             value={props.born}
             handleSetDate={props.handleSetBorn}
             onBlur={
                (e) => {
                   this.state.date !== "" && this.handleRenderField(e);
                }
             }
         />
         </div>
         <div style={{margin: 8}}>
         <CreateMemorialDatePicker
             id="died"
             label="Died"
             start={parseInt(props.born.split(/[^\d]/).find((n) => n.length === 4), 10)}
             value={props.died}
             handleSetDate={props.handleSetDied}
             onBlur={
                (e) => {
                   this.state.date !== "" && this.handleRenderField(e);
                }
             }
         />
         </div>
      </div>
   )
}

export default CreateMemorialBasicInfo;

