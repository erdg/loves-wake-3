import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
import { link3 } from 'links';
import EditObituaryModal from './EditObituaryModal';
import marked from 'marked';
// import EditIcon from '@material-ui/icons/Edit';
// import history from '../../history';

class Obituary extends React.Component {
   state = {
      obituary: '',
      showEditObituaryModal: false
   }

   showEditObituaryModal = () => {
      this.setState({ showEditObituaryModal: true })
   }

   hideEditObituaryModal = () => {
      this.setState({ showEditObituaryModal: false })
   }

   render () {
      let name = this.props.name.split(" ")[0];
      return (
         <div>
            {this.props.obituary ?
               <div style={{margin: 16}}>
                  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                     <Typography variant="subheading" >
                        Obituary
                     </Typography>
                     <Button
                        size="small"
                        onClick={this.showEditObituaryModal}
                        style={{color: 'rgba(0,0,0,0.54)'}}
                     > Edit
                     </Button>
                  </div>
                  <Typography variant="body1"
                     dangerouslySetInnerHTML={{
                        __html: marked(this.props.obituary.split("^J^J").join("\n"))
                     }}
                  />
               </div>
                  :
               <div style={{margin: 16}}>
                  <Typography variant="subheading">
                     Obituary
                  </Typography>
                  <div style={{display: 'flex', alignItems: 'center'}}>
                     <Typography variant="body1" paragraph style={{margin: 0}}>
                        {name} does not have an obituary yet.
                     </Typography>
                     <Button
                        style={{
                           color: link3,
                           textTransform: 'none'
                        }}
                        onClick={
                           () => {
                              this.showEditObituaryModal();
                           }
                        }
                     >
                        Add one
                     </Button>
                  </div>
               </div>
            }
            <EditObituaryModal
               key={Math.random()}
               name={name}
               open={this.state.showEditObituaryModal}
               hideEditObituaryModal={this.hideEditObituaryModal}
               memorialId={this.props.memorialId}
               obituary={this.props.obituary}
            />
         </div>
      )
   }
}

export default Obituary;
