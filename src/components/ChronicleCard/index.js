import React from 'react';

// material-ui
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

//icons
import FavoriteIcon from '@material-ui/icons/Favorite';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ExpandLess from '@material-ui/icons/ExpandLess';
import MessageIcon from '@material-ui/icons/Message';
import CloseIcon from '@material-ui/icons/Close';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import ChronicleCardComments from './ChronicleCardComments';
import ChronicleEditItemModal from 'routes/Memorial/ChronicleEditItemModal';
import ChronicleDeleteItemModal from 'routes/Memorial/ChronicleDeleteItemModal';

const comments = [
   { usr: "Bob", text: "I love this picture"},
   { usr: "Ted", text: "I love this picture too!"},
   { usr: "Ralph", text: "I love it more than you."}
]

const styles = {
   card: {
      margin: 16,
      transform: 'translate(0px,0)',
      transition: '0.2s ease-in-out'
      // maxWidth: 400
   },
   edit: {
      transform: 'translate(-200px,0)',
      transition: '0.2s ease-in-out'
   },
}

class ChronicleCard extends React.Component {
   state = {
      expanded: false,
      liked: false,
      isAdmin: true,
      showMenu: false,
      showChronicleEditItemModal: false,
      showChronicleDeleteItemModal: false,
   }

   // toggleAdmin = () => {
   //    this.setState({ isAdmin: !this.state.isAdmin })
   // }

   handleExpandClick = () => {
      this.setState({ expanded: !this.state.expanded });
   }

   handleLikeClick = () => {
      this.setState({ liked: !this.state.liked });
   }

   handleMenuClick = () => {
      this.setState({ showMenu: !this.state.showMenu });
   }

   handleCloseMenu = () => {
      this.setState({ showMenu: false })
   }

   handleShowChronicleEditItemModal = () => {
      this.setState({ showChronicleEditItemModal: true })
   }

   handleCloseChronicleEditItemModal = () => {
      this.setState({ showChronicleEditItemModal: false })
   }

   handleShowChronicleDeleteItemModal = () => {
      this.setState({ showChronicleDeleteItemModal: true })
   }

   handleCloseChronicleDeleteItemModal = () => {
      this.setState({ showChronicleDeleteItemModal: false })
   }

   render () {
      const { classes } = this.props;
      return (
         <div>
            <Card 
               id={`chronicleCard${this.props.item.id}`}
               className={
                  classes.card
                  + (this.state.showMenu ? " " + classes.edit : "")
               }
                     
               style={{overflow: 'visible'}}
            >
               <ChronicleCardHeader 
                  item={this.props.item}
                  isAdmin={this.state.isAdmin}
                  showMenu={this.state.showMenu}
                  handleMenuClick={this.handleMenuClick}
                  showChronicleEditItemModal={this.state.showChronicleEditItemModal}
                  handleShowChronicleEditItemModal={this.handleShowChronicleEditItemModal}
                  handleCloseChronicleEditItemModal={this.handleCloseChronicleEditItemModal}
                  showChronicleDeleteItemModal={this.state.showChronicleDeleteItemModal}
                  handleShowChronicleDeleteItemModal={this.handleShowChronicleDeleteItemModal}
                  handleCloseChronicleDeleteItemModal={this.handleCloseChronicleDeleteItemModal}
               />
               <ChronicleCardMedia
                  item={this.props.item}
               />
               {this.props.item.txt &&
                  <ChronicleCardContent content={this.props.item.txt} />
               }
               <ChronicleCardActions
                  liked={this.state.liked}
                  handleLikeClick={this.handleLikeClick}
                  expanded={this.state.expanded}
                  handleExpandClick={this.handleExpandClick}
               />
               <ChronicleCardExpandedContent
                  expanded={this.state.expanded}
               />
            </Card>
            <ChronicleEditItemModal
               key={Math.random()}
               item={this.props.item}
               showChronicleEditItemModal={this.state.showChronicleEditItemModal}
               handleShowChronicleEditItemModal={this.handleShowChronicleEditItemModal}
               handleCloseChronicleEditItemModal={this.handleCloseChronicleEditItemModal}
               memorialId={this.props.memorialId} 
               handleCloseMenu={this.handleCloseMenu}
            />
            <ChronicleDeleteItemModal
               key={Math.random()}
               id={this.props.item.id}
               memorialId={this.props.memorialId} 
               showChronicleDeleteItemModal={this.state.showChronicleDeleteItemModal}
               handleShowChronicleDeleteItemModal={this.handleShowChronicleDeleteItemModal}
               handleCloseChronicleDeleteItemModal={this.handleCloseChronicleDeleteItemModal}
               handleCloseMenu={this.handleCloseMenu}
               handleDeleted={this.handleDeleted}
            />
         </div>
      )
   }
}

export default withStyles(styles)(ChronicleCard);

const ChronicleCardHeader = (props) => (
   <CardHeader
      title={props.item.title}
      subheader={
         <div>
            <Typography variant="caption">
               {props.item.date}
            </Typography>
            <Typography variant="caption">
               {props.item.location}
            </Typography>
         </div>
      }
      action={
         props.isAdmin && 
            <ChronicleCardMenu
               item={props.item}
               showMenu={props.showMenu}
               handleMenuClick={props.handleMenuClick}
               showChronicleEditItemModal={props.showChronicleEditItemModal}
               handleShowChronicleEditItemModal={props.handleShowChronicleEditItemModal}
               handleCloseChronicleEditItemModal={props.handleCloseChronicleEditItemModal}
               showChronicleDeleteItemModal={props.showChronicleDeleteItemModal}
               handleShowChronicleDeleteItemModal={props.handleShowChronicleDeleteItemModal}
               handleCloseChronicleDeleteItemModal={props.handleCloseChronicleDeleteItemModal}
            />
      }
   />
)

const ChronicleCardMenu = (props) => {
   return (
      <div>
         <IconButton
            onClick={props.handleMenuClick}
            style={{marginRight: 4}}
         >
            {props.showMenu ? 
               <CloseIcon/>
                  :
               <MoreVertIcon />
            }
         </IconButton>
         {props.showMenu &&
            <Paper
               elevation={0}
               style={{
                  position: 'absolute',
                  top: 0,
                  right: -200,
                  height: document.getElementById(`chronicleCard${props.item.id}`).scrollHeight,
                  backgroundColor: '#eee'
               }}
            >
               <List>
                  <ListItem button
                     onClick={props.handleShowChronicleEditItemModal}
                  >
                     <ListItemIcon>
                        <EditIcon />
                     </ListItemIcon>
                     <ListItemText inset primary="Edit item" />
                  </ListItem>
                  <ListItem button
                     onClick={props.handleShowChronicleDeleteItemModal}
                  >
                     <ListItemIcon>
                        <DeleteIcon />
                     </ListItemIcon>
                     <ListItemText inset primary="Delete item" />
                  </ListItem>
               </List>
            </Paper>
         }
      </div>
   )
}

const ChronicleCardMedia = (props) => {
   return (
      <div>
         {props.item.imageSrc &&
            <CardMedia
               image={props.item.imageSrc}
               style={{
                  height: 0,
                  paddingTop: (100 / parseFloat(props.item.ratio)).toString() + "%"
               }}
            />
         }
         {props.item.audioSrc &&
            <CardMedia
               component="audio"
               src={props.item.audioSrc}
               controls
            />
         }
         {props.item.videoSrc &&
            <CardMedia
               component="video"
               src={props.item.videoSrc}
               controls
            />
         }
      </div>
   )
}

const ChronicleCardActions = (props) => {
   return (
      <CardActions
         disableActionSpacing
         style={{display: 'flex'}}
      >
         <IconButton onClick={props.handleLikeClick}>
            <FavoriteIcon
               color={props.liked ? "secondary" : "inherit"}
            />
         </IconButton>
         <Typography variant="caption" style={{marginRight: 16}}>
            {props.liked ? 7 : 6}
         </Typography>
         <IconButton onClick={props.handleExpandClick}>
            <MessageIcon />
         </IconButton>
         <Typography variant="caption">
            {comments.length} comments
         </Typography>
         <IconButton style={{marginLeft: 'auto'}} onClick={props.handleExpandClick}>
            {props.expanded ? <ExpandLess /> : <ExpandMore />}
         </IconButton>
      </CardActions>
   )
}

const ChronicleCardContent = (props) => {
   return (
      <CardContent>
         <Typography variant="body1">
            {props.content}
         </Typography>
      </CardContent>
   )
}

const ChronicleCardExpandedContent = (props) => {
   return (
      <Collapse in={props.expanded} unmountOnExit >
         <CardContent>
            <ChronicleCardComments 
               comments={comments}
            />
         </CardContent>
      </Collapse>
   )
}

