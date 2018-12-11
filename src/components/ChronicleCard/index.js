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
// import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
// import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

//icons
// import FavoriteIcon from '@material-ui/icons/Favorite';
import EditIcon from '@material-ui/icons/Edit';
import LimboIcon from '@material-ui/icons/Waves';
import ChronicleIcon from 'components/icons/ChronicleIcon';
import DeleteIcon from '@material-ui/icons/Delete';
// import ExpandMore from '@material-ui/icons/ExpandMore';
// import ExpandLess from '@material-ui/icons/ExpandLess';
// import MessageIcon from '@material-ui/icons/Message';
import MoreVertIcon from '@material-ui/icons/MoreVert';
// import SettingsIcon from '@material-ui/icons/Settings';
import AtlasIcon from '@material-ui/icons/LocationOn';
import DateIcon from '@material-ui/icons/Event';
import StoryIcon from '@material-ui/icons/Notes';

// import ChronicleCardComments from './ChronicleCardComments';
import ChronicleEditItemModal from 'routes/Chronicle/ChronicleEditItemModal';
import ChronicleDeleteItemModal from 'routes/Chronicle/ChronicleDeleteItemModal';
import ChronicleUpdateLocationModal from 'routes/Chronicle/ChronicleUpdateLocationModal';
import ChronicleUpdateStoryModal from 'routes/Chronicle/ChronicleUpdateStoryModal';

// const comments = [
//    { usr: "Bob", text: "I love this picture"},
//    { usr: "Ted", text: "I love this picture too!"},
//    { usr: "Ralph", text: "I love it more than you."}
// ]

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

   handleShowChronicleUpdateStoryModal = () => {
      this.setState({ showChronicleUpdateStoryModal: true })
   }

   handleCloseChronicleUpdateStoryModal = () => {
      this.setState({ showChronicleUpdateStoryModal: false })
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
               style={{overflow: 'visible', marginTop: 8}}
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
                  handleShowChronicleUpdateLocationModal={this.handleShowChronicleUpdateLocationModal}
               />
               <ChronicleCardMedia
                  item={this.props.item}
               />
               <ChronicleCardContent 
                  item={this.props.item}
                  showStory={this.state.showStory}
                  handleShowStory={this.handleShowStory}
                  handleHideStory={this.handleHideStory}
                  handleShowChronicleUpdateLocationModal={this.handleShowChronicleUpdateLocationModal}
                  handleShowChronicleUpdateStoryModal={this.handleShowChronicleUpdateStoryModal}
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
            </Card>
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
            <ChronicleUpdateLocationModal
               key={Math.random()}
               id={this.props.item.id}
               memorialId={this.props.memorialId} 
               showChronicleUpdateLocationModal={this.state.showChronicleUpdateLocationModal}
               handleShowChronicleUpdateLocationModal={this.handleShowChronicleUpdateLocationModal}
               handleCloseChronicleUpdateLocationModal={this.handleCloseChronicleUpdateLocationModal}
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
         </div>
      )
   }
}

export default withStyles(styles)(connect('', actions)(ChronicleCard));

const ChronicleCardHeader = (props) => (
   <CardHeader
      style={{paddingBottom: 0}}
      title={
         <div>
         <div style={{display: 'flex', alignItems: 'center'}}>
            {props.item.date ?
               <Typography
                  variant="subheading"
                  style={{
                  }}
               >
                  {props.item.date}
               </Typography>
               :
               <div
                  style={{display: 'flex', alignItems: 'center'}}
               >
                  <DateIcon />
                  <Typography
                     variant="caption"
                     style={{
                        marginLeft: 8
                     }}
                  > No date yet.
                  </Typography>
                  <Typography
                     variant="caption"
                     style={{
                        color: link3, marginLeft: 6,
                        cursor: 'pointer'
                     }}
                  > Add one
                  </Typography>
               </div>
            }
         </div>
         <div style={{display: 'flex', alignItems: 'center'}}>
            {props.item.location ?
                  <Typography
                     variant="caption"
                     style={{
                        marginBottom: 8
                     }}
                  >
                     {props.item.location}
                  </Typography>
                  :
                  <div
                     style={{
                        display: 'flex', 
                        alignItems: 'center',
                        marginBottom: (props.item.imageSrc || props.item.audioSrc || props.item.videoSrc ? 8 : 0),
                        cursor: 'pointer',
                        marginLeft: -2
                     }}
                     onClick={props.handleShowChronicleUpdateLocationModal}
                  >
                     <AtlasIcon  style={{color: 'rgba(0,0,0,0.54)'}} />
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
                     > Add one
                     </Typography>
                  </div>
            }
         </div>
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
               publishChronicleItem={props.publishChronicleItem}
               unpublishChronicleItem={props.unpublishChronicleItem}
               memorialId={props.memorialId} 
            />
      }
   />
)

const ChronicleCardMenu = (props) => {
   return (
      <div>
         <IconButton
            onClick={props.handleMenuClick}
            id={`chronicleCardMenuButton${props.item.id}`}
            style={{
               marginTop: -4,
               marginRight: 12 
            }}
         >
            <MoreVertIcon />
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
                           {props.item.published === 'true' ? <LimboIcon /> : <ChronicleIcon />}
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

// const ChronicleCardActions = (props) => {
//    return (
//       <CardActions
//          disableActionSpacing
//          style={{display: 'flex'}}
//       >
//          <IconButton onClick={props.handleLikeClick}>
//             <FavoriteIcon
//                color={props.liked ? "secondary" : "inherit"}
//             />
//          </IconButton>
//          <Typography variant="caption" style={{marginRight: 16}}>
//             {props.liked ? 7 : 6}
//          </Typography>
//          <IconButton onClick={props.handleExpandClick}>
//             <MessageIcon />
//          </IconButton>
//          <Typography variant="caption">
//             {comments.length} comments
//          </Typography>
//          <IconButton style={{marginLeft: 'auto'}} onClick={props.handleExpandClick}>
//             {props.expanded ? <ExpandLess /> : <ExpandMore />}
//          </IconButton>
//       </CardActions>
//    )
// }

const ChronicleCardContent = (props) => {
   return (
      <CardContent style={{paddingTop: 0}}>
         <ChronicleCardStory
            item={props.item}
            showStory={props.showStory}
            handleShowStory={props.handleShowStory}
            handleHideStory={props.handleHideStory}
            showChronicleUpdateStoryModal={props.showChronicleUpdateStoryModal}
            handleShowChronicleUpdateStoryModal={props.handleShowChronicleUpdateStoryModal}
            handleCloseChronicleUpdateStoryModal={props.handleCloseChronicleUpdateStoryModal}
         />
      </CardContent>
   )
}


const ChronicleCardStory = (props) => {
   return (
         <Collapse in={true} unmountOnExit >
            {props.item.txt ?
               <div style={{display: 'flex', alignItems: 'center'}}>
                  {props.showStory ? 
                     <div>
                        <Typography
                           variant="body1"
                           dangerouslySetInnerHTML={{__html: marked(props.item.txt.split("^J^J").join("\n"))}}
                        />
                        <Typography
                           variant="caption"
                           style={{
                              color: link3, 
                              cursor: 'pointer', 
                              marginBottom: 10
                           }}
                           onClick={props.handleHideStory}
                        > Read less
                        </Typography>
                     </div>
                        :
                     <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <Typography
                           variant="body1"
                           dangerouslySetInnerHTML={{
                              __html: (props.item.txt.length > 140 ?
                                 `${marked(props.item.txt.split("^J^J").join("\n")).substring(0, 140)}...`
                                    :
                                 marked(props.item.txt.split("^J^J").join("\n"))
                              )
                           }}
                           style={{alignSelf: 'flex-start'}}
                        />
                        {props.item.txt.length > 140 &&
                           <Typography
                              variant="caption"
                              style={{
                                 color: link3, 
                                 cursor: 'pointer', 
                                 alignSelf: 'flex-start',
                                 marginTop: -8 
                              }}
                              onClick={props.handleShowStory}
                           > Read more
                           </Typography>
                        }
                     </div>
                  }
               </div>
                  :
               <div 
                  style={{
                     display: 'flex',
                     alignItems: 'center',
                     marginTop: (props.item.imageSrc || props.item.audioSrc || props.item.videoSrc ? 8 : 0),
                     cursor: 'pointer'
                  }}
               >
                  <StoryIcon style={{color: 'rgba(0,0,0,0.54)'}}/>
                  <Typography variant="caption" style={{marginLeft: 8}}>
                     No caption yet.
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

