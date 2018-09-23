import React from 'react';
import marked from 'marked';

import { connect } from 'unistore/react';
import { actions } from 'store';

import { link3 } from 'links';

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
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';

//icons
import FavoriteIcon from '@material-ui/icons/Favorite';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ExpandLess from '@material-ui/icons/ExpandLess';
import MessageIcon from '@material-ui/icons/Message';
import CloseIcon from '@material-ui/icons/Close';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SettingsIcon from '@material-ui/icons/Settings';
import AtlasIcon from '@material-ui/icons/Public';
import DateIcon from '@material-ui/icons/Event';
import StoryIcon from '@material-ui/icons/ImportContacts';

// import ChronicleCardComments from './ChronicleCardComments';
import ChronicleEditItemModal from 'routes/Chronicle/ChronicleEditItemModal';
import ChronicleDeleteItemModal from 'routes/Chronicle/ChronicleDeleteItemModal';
import ChronicleUpdateLocationModal from 'routes/Chronicle/ChronicleUpdateLocationModal';

import ChronicleUpdateStoryModal from 'routes/Chronicle/ChronicleUpdateStoryModal';

import DatePickerNoTextField from 'components/DatePickerNoTextField';

const comments = [
   { usr: "Bob", text: "I love this picture"},
   { usr: "Ted", text: "I love this picture too!"},
   { usr: "Ralph", text: "I love it more than you."}
]

const styles = {
   card: {
      margin: '0px 0px',
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
      showStory: false,
      showChronicleEditItemModal: false,
      showChronicleDeleteItemModal: false,
      showChronicleUpdateLocationModal: false,
      showChronicleUpdateStoryModal: false,
      showDatePicker: false,
   }

   // toggleAdmin = () => {
   //    this.setState({ isAdmin: !this.state.isAdmin })
   // }

   handleExpandClick = () => {
      this.setState({ expanded: !this.state.expanded });
   }

   handleShowStory = () => {
      this.setState({ showStory: true });
   }

   handleHideStory = () => {
      this.setState({ showStory: false });
   }

   handleShowChronicleUpdateStoryModal = () => {
      this.setState({ showChronicleUpdateStoryModal: true })
   }

   handleCloseChronicleUpdateStoryModal = () => {
      this.setState({ showChronicleUpdateStoryModal: false })
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

   handleShowChronicleUpdateLocationModal = () => {
      this.setState({ showChronicleUpdateLocationModal: true })
   }

   handleCloseChronicleUpdateLocationModal = () => {
      this.setState({ showChronicleUpdateLocationModal: false })
   }

   handleShowDatePicker = () => {
      this.setState({ showDatePicker: true })
   }

   handleCloseDatePicker = () => {
      this.setState({ showDatePicker: false })
   }

   handleSetDate = (date) => {
      this.props.updChronicleCardDate(this.props.item.id, this.props.memorialId, date);
   }

   render () {
      const { classes } = this.props;
      return (
         <div>
            <Card 
               id={`chronicleCard${this.props.item.id}`}
               className={
                  classes.card
               }
               square={true}
               elevation={0}
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
                  publishChronicleItem={this.props.publishChronicleItem}
                  unpublishChronicleItem={this.props.unpublishChronicleItem}
                  memorialId={this.props.memorialId} 
                  handleShowDatePicker={this.handleShowDatePicker}
               />
               <ChronicleCardMedia
                  item={this.props.item}
               />
               <ChronicleCardContent 
                  item={this.props.item}
                  memorialId={this.props.memorialId} 
                  showStory={this.state.showStory}
                  handleShowStory={this.handleShowStory}
                  handleHideStory={this.handleHideStory}
                  handleShowChronicleUpdateLocationModal={this.handleShowChronicleUpdateLocationModal}
                  handleShowChronicleUpdateStoryModal={this.handleShowChronicleUpdateStoryModal}
                  publishChronicleItem={this.props.publishChronicleItem}
                  unpublishChronicleItem={this.props.unpublishChronicleItem}
               />
               {/*
               <ChronicleCardActions
                  liked={this.state.liked}
                  handleLikeClick={this.handleLikeClick}
                  expanded={this.state.expanded}
                  handleExpandClick={this.handleExpandClick}
               />
               <ChronicleCardExpandedContent
                  expanded={this.state.expanded}
               />
               */}
               <Divider />
            </Card>
            <DatePickerNoTextField
               showDatePicker={this.state.showDatePicker}
               handleShowDatePicker={this.handleShowDatePicker}
               handleCloseDatePicker={this.handleCloseDatePicker}
               born={this.props.born}
               died={this.props.died}
               handleSetDate={this.handleSetDate}
            />
            <ChronicleEditItemModal
               key={Math.random()}
               item={this.props.item}
               showChronicleEditItemModal={this.state.showChronicleEditItemModal}
               handleShowChronicleEditItemModal={this.handleShowChronicleEditItemModal}
               handleCloseChronicleEditItemModal={this.handleCloseChronicleEditItemModal}
               memorialId={this.props.memorialId} 
               handleCloseMenu={this.handleCloseMenu}
               born={this.props.born}
               died={this.props.died}
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
            <ChronicleUpdateStoryModal
               key={Math.random()}
               id={this.props.item.id}
               item={this.props.item}
               memorialId={this.props.memorialId} 
               showChronicleUpdateStoryModal={this.state.showChronicleUpdateStoryModal}
               handleShowChronicleUpdateStoryModal={this.handleShowChronicleUpdateStoryModal}
               handleCloseChronicleUpdateStoryModal={this.handleCloseChronicleUpdateStoryModal}
            />
            <ChronicleUpdateLocationModal
               key={Math.random()}
               id={this.props.item.id}
               location={this.props.item.location}
               memorialId={this.props.memorialId} 
               showChronicleUpdateLocationModal={this.state.showChronicleUpdateLocationModal}
               handleShowChronicleUpdateLocationModal={this.handleShowChronicleUpdateLocationModal}
               handleCloseChronicleUpdateLocationModal={this.handleCloseChronicleUpdateLocationModal}
            />
         </div>
      )
   }
}

export default withStyles(styles)(connect('', actions)(ChronicleCard));

const ChronicleCardHeader = (props) => (
   <CardHeader
      style={{paddingBottom: 0}}
      subheader={
         <div style={{display: 'flex', alignItems: 'center'}}>
            {props.item.date ?
               <div
                  style={{display: 'flex', alignItems: 'center', width: '100%'}}
               >
                  <Typography
                     variant="subheading"
                     style={{
                     }}
                  >
                     {props.item.date}
                  </Typography>
                  <IconButton
                     style={{marginLeft: 'auto'}}
                     onClick={props.handleShowDatePicker}
                  >
                     <EditIcon />
                  </IconButton>
               </div>
               :
               <div
                  style={{display: 'flex', alignItems: 'center'}}
               >
                  <DateIcon style={{color: 'rgba(0,0,0,0.54)'}}/>
                  <Typography
                     variant="caption"
                     style={{
                        marginLeft: 8
                     }}
                  > No date yet.
                  </Typography>
                  <Typography
                     variant="caption"
                     onClick={props.handleShowDatePicker}
                     style={{
                        color: link3, marginLeft: 6,
                        cursor: 'pointer'
                     }}
                  > Add one
                  </Typography>
               </div>
            }
         </div>
      }
      title={
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
               publishChronicleItem={props.publishChronicleItem}
               unpublishChronicleItem={props.unpublishChronicleItem}
               memorialId={props.memorialId} 
            />
      }
   />
)

const ChronicleCardMenu = (props) => {
   return (
      <div style={{width: '100%', display: 'flex', alignItems: 'center'}}>
         <IconButton
            onClick={props.handleMenuClick}
            id={`chronicleCardMenuButton${props.item.id}`}
            style={{marginLeft: 'auto'}}
         >
            <SettingsIcon />
         </IconButton>
         {/*props.showMenu &&
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
         */}
         <Menu
            open={props.showMenu}
            onClose={props.handleMenuClick}
            anchorEl={() => document.getElementById(`chronicleCardMenuButton${props.item.id}`)}
         >
                     <MenuItem button
                        disabled={!props.item.date ? true : false}
                        onClick={
                           props.item.published === 'true' ?
                              () => {
                                 props.unpublishChronicleItem(props.item.id, props.memorialId);
                                 props.handleMenuClick();
                              }
                              : 
                              () => props.publishChronicleItem(props.item.id, props.memorialId)
                        }
                     >
                        <ListItemIcon>
                           <EditIcon />
                        </ListItemIcon>
                        <ListItemText inset primary={props.item.published === 'true' ? "Unpublish" : "Publish"} />
                     </MenuItem>
                     <MenuItem button
                        onClick={props.handleShowChronicleEditItemModal}
                     >
                        <ListItemIcon>
                           <EditIcon />
                        </ListItemIcon>
                        <ListItemText inset primary="Edit item" />
                     </MenuItem>
                     <MenuItem button
                        onClick={props.handleShowChronicleDeleteItemModal}
                     >
                        <ListItemIcon>
                           <DeleteIcon />
                        </ListItemIcon>
                        <ListItemText inset primary="Delete item" />
                     </MenuItem>
                  </Menu>
      </div>
   )
}

const ChronicleCardMedia = (props) => {
   return (
      <div style={{marginTop: 8}}>
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
         {/*
         <Typography variant="caption">
            {comments.length} comments
         </Typography>
         */}
         <IconButton style={{marginLeft: 'auto'}} onClick={props.handleExpandClick}>
            {props.expanded ? <ExpandLess /> : <ExpandMore />}
         </IconButton>
      </CardActions>
   )
}

const ChronicleCardContent = (props) => {
   return (
      <CardContent>
         {/*
         <Typography variant="body1">
            {props.content}
         </Typography>
         */}
         <div style={{display: 'flex', alignItems: 'center'}}>
            <AtlasIcon  style={{color: (props.item.location ? 'black' : 'rgba(0,0,0,0.54)')}} />
            {props.item.location ?
               <div style={{display: 'flex', alignItems: 'center', width: '100%'}}>
                  <Typography
                     variant="caption"
                     style={{
                        marginLeft: 8
                     }}
                  >
                     {props.item.location}
                  </Typography>
                  <IconButton
                     onClick={props.handleShowChronicleUpdateLocationModal}
                     style={{marginLeft: 'auto'}}
                  >
                     <EditIcon />
                  </IconButton>
               </div>
                  :
                  <div
                     style={{display: 'flex', alignItems: 'center'}}
                  >
                     <Typography
                        variant="caption"
                        style={{
                           marginLeft: 8
                        }}
                     > No location yet.
                     </Typography>
                     <Typography
                        variant="caption"
                        style={{
                           color: link3, marginLeft: 6,
                           cursor: 'pointer'
                        }}
                        onClick={props.handleShowChronicleUpdateLocationModal}
                     > Add one
                     </Typography>
                  </div>
            }
         </div>
         <ChronicleCardStory
            item={props.item}
            showStory={props.showStory}
            handleShowStory={props.handleShowStory}
            handleHideStory={props.handleHideStory}
            showChronicleUpdateStoryModal={props.showChronicleUpdateStoryModal}
            handleShowChronicleUpdateStoryModal={props.handleShowChronicleUpdateStoryModal}
            handleCloseChronicleUpdateStoryModal={props.handleCloseChronicleUpdateStoryModal}
         />
         <div
            style={{
               display: 'flex',
               width: '100%'
            }}
         >
            <Button
               variant="contained"
               disabled={!props.item.date ? true : false}
               color="primary"
               onClick={() => props.publishChronicleItem(props.item.id, props.memorialId)}
               style={{
                  marginLeft: 'auto',
               }}
            > Publish
            </Button>
         </div>
      </CardContent>
   )
}


const ChronicleCardStory = (props) => {
   return (
         <Collapse in={true} unmountOnExit >
            {props.item.txt ?
               <div style={{display: 'flex', alignItems: 'center', width: '100%'}}>
                  <StoryIcon
                     style={{
                        marginRight: 8,
                        alignSelf: 'flex-start',
                        marginTop: 12,
                        color: (props.item.txt ? 'black' : 'rgba(0,0,0,0.54)')
                     }}
                  />
                  {props.showStory ? 
                     <div>
                        <Typography
                           variant="body1"
                           dangerouslySetInnerHTML={{__html: marked(props.item.txt.split("^J^J").join("\n"))}}
                        />
                        <Typography
                           variant="caption"
                           style={{color: link3, cursor: 'pointer'}}
                           onClick={props.handleHideStory}
                        > Read less
                        </Typography>
                     </div>
                        :
                     <div style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
                        <div style={{display: 'flex', alignItems: 'center'}}>
                           <Typography
                              variant="body1"
                              dangerouslySetInnerHTML={{
                                 __html: (props.item.txt.length > 46 ?
                                    `${marked(props.item.txt.split("^J^J").join("\n")).substring(0, 40)}...`
                                       :
                                    marked(props.item.txt.split("^J^J").join("\n"))
                                 )
                              }}
                              style={{alignSelf: 'flex-start'}}
                           />
                           <IconButton
                              onClick={props.handleShowChronicleUpdateStoryModal}
                              style={{marginLeft: 'auto'}}
                           >
                              <EditIcon />
                           </IconButton>
                        </div>
                        {props.item.txt.length > 46 &&
                           <Typography
                              variant="caption"
                              style={{color: link3, cursor: 'pointer'}}
                              onClick={props.handleShowStory}
                           > Read more
                           </Typography>
                        }
                     </div>
                  }
               </div>
                  :
               <div style={{display: 'flex', alignItems: 'center', width: '100%'}}>
                  <StoryIcon style={{color: 'rgba(0,0,0,0.54)'}}/>
                  <Typography variant="caption" style={{marginLeft: 8}}>
                     No story yet.
                  </Typography>
                  <Typography 
                     variant="caption"
                     onClick={props.handleShowChronicleUpdateStoryModal}
                     style={{
                        color: link3, marginLeft: 6,
                        cursor: 'pointer'
                     }}
                  >
                     Add one 
                  </Typography>
               </div>
            }
         </Collapse>
   )
}

// const ChronicleCardExpandedContent = (props) => {
//    return (
//       <Collapse in={props.expanded} unmountOnExit >
//          <CardContent>
//             <ChronicleCardComments 
//                comments={comments}
//             />
//          </CardContent>
//       </Collapse>
//    )
// }

