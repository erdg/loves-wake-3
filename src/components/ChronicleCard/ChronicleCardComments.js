import React from 'react';

import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import MemorialAvatar from 'components/MemorialAvatar';
import Avatar from '@material-ui/core/Avatar';

import Collapse from '@material-ui/core/Collapse';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ExpandLess from '@material-ui/icons/ExpandLess';
import AddIcon from '@material-ui/icons/Add';

class ChronicleCardComments extends React.Component {
   state = {
      commentsVisible: false
   }

   handleToggleExpandComments = () => {
      this.setState({ commentsVisible: !this.state.commentsVisible })
   }

   render () {
      return (
         <div>
            <div style={{display: 'flex', alignItems: 'center'}}>
               <Typography variant="subheading">
                  Comments ({this.props.comments.length})
               </Typography>
            </div>
               <ul>
                  {this.props.comments.map((c, index) => (
                     <li key={index} style={{display: 'flex', margin: '8px 0px'}}>
                        <CommentAvatar name={c.usr}>
                           <Typography variant="body1" style={{marginLeft: 16}}>
                              {c.text}
                           </Typography>
                        </CommentAvatar>
                     </li>
                  ))}
               </ul>
               <NewComment />
         </div>
      )
   }
}

export default ChronicleCardComments;

const CommentAvatar = (props) => {
   return (
      <div>
         <div style={{display: 'flex', alignItems: 'center'}}>
            <Avatar
               src={props.src}
               alt={props.name}
               style={{
                  width: 24,
                  height: 24
               }}
            >{!props.src ? props.name[0] : ''}
            </Avatar>
            <Typography
               style={{marginLeft: 8}}
               variant="subheading"
            > {props.name}
            </Typography>
         </div>
         {props.children}
      </div>

   )
}

const NewComment = (props) => {
   return (
      <div style={{display: 'flex', flexDirection: 'column'}}>
         <TextField
            id="comment"
            label="Add a comment"
            multiline
         />
         <Button
            variant="contained"
            size="small"
            color="primary"
            style={{width: '25%', marginTop: 16}}
         > Add
         </Button>
      </div>
   )
}
