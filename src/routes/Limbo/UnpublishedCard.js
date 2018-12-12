import React from 'react';
import marked from 'marked';

import { connect } from 'unistore/react';
import { actions } from 'store';

import { link1 } from 'links';
import theme from 'theme';

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
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';

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
import AddIcon from '@material-ui/icons/Add';

// import ChronicleCardComments from './ChronicleCardComments';
import ChronicleEditItemModal from 'routes/Chronicle/ChronicleEditItemModal';
import ChronicleDeleteItemModal from 'routes/Chronicle/ChronicleDeleteItemModal';
import ChronicleUpdateLocationModal from 'routes/Chronicle/ChronicleUpdateLocationModal';

import ChronicleUpdateStoryModal from 'routes/Chronicle/ChronicleUpdateStoryModal';

import DatePickerNoTextField from 'components/DatePickerNoTextField';

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
                  handleShowChronicleUpdateLocationModal={this.handleShowChronicleUpdateLocationModal}
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
                  showChronicleDeleteItemModal={this.state.showChronicleDeleteItemModal}
                  handleShowChronicleDeleteItemModal={this.handleShowChronicleDeleteItemModal}
                  handleCloseChronicleDeleteItemModal={this.handleCloseChronicleDeleteItemModal}
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
      style={{paddingBottom: 8}}
      title={
         <div>
            <div style={{display: 'flex', alignItems: 'center'}}>
               {props.item.date ?
                  <div
                     onClick={props.handleShowDatePicker}
                     style={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '100%',
                        cursor: 'pointer',
                        background: '#fafafa',
                        borderRadius: 4,
                     }}
                  >
                     <IconButton>
                        <DateIcon style={{color: 'rgba(0,0,0,0.54)'}}/>
                     </IconButton>
                     <Typography
                        variant="subheading"
                        style={{
                           marginLeft: 8
                        }}
                     >
                        {props.item.date}
                     </Typography>
                     <IconButton
                        style={{marginLeft: 'auto'}}
                     >
                        <EditIcon />
                     </IconButton>
                  </div>
                  :
                  <div
                     style={{
                        display: 'flex',
                        alignItems: 'center',
                        cursor: 'pointer',
                        background: '#fafafa',
                        width: '100%',
                     }}
                     onClick={props.handleShowDatePicker}
                  >
                     <IconButton>
                        <DateIcon style={{color: 'rgba(0,0,0,0.54)'}}/>
                     </IconButton>
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
                           color: link1, marginLeft: 6,
                           cursor: 'pointer'
                        }}
                     > Add one
                     </Typography>
                     <IconButton style={{marginLeft: 'auto'}}>
                        <AddIcon />
                     </IconButton>
                  </div>
               }
            </div>
            <div 
               style={{
                  display: 'flex',
                  alignItems: 'center',
                  background: '#fafafa',
                  borderRadius: 4,
                  marginTop: 16,
               }}
            >
               {props.item.location ?
                  <div
                     style={{display: 'flex', alignItems: 'center', width: '100%', cursor: 'pointer'}}
                     onClick={props.handleShowChronicleUpdateLocationModal}
                  >
                     <IconButton>
                        <AtlasIcon  style={{color: 'rgba(0,0,0,0.54)'}} />
                     </IconButton>
                     <Typography
                        variant="caption"
                        style={{
                           marginLeft: 8
                        }}
                     >
                        {props.item.location}
                     </Typography>
                     <IconButton
                        style={{marginLeft: 'auto'}}
                     >
                        <EditIcon />
                     </IconButton>
                  </div>
                     :
                  <div
                     style={{display: 'flex', alignItems: 'center', width: '100%', cursor: 'pointer'}}
                     onClick={props.handleShowChronicleUpdateLocationModal}
                  >
                     <IconButton>
                        <AtlasIcon  style={{color: 'rgba(0,0,0,0.54)'}} />
                     </IconButton>
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
                           color: link1, marginLeft: 6,
                           cursor: 'pointer'
                        }}
                     > Add one
                     </Typography>
                     <IconButton
                        style={{marginLeft: 'auto'}}
                     > <AddIcon />
                     </IconButton>
                  </div>
               }
            </div>
         </div>
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
                           {props.item.published === 'true' ?
                                 <LimboIcon />
                                 :
                                 <ChronicleIcon style={{marginTop: 4, marginLeft: 2}} fill={'rgba(0,0,0,0.54)'}/>
                           }
                        </ListItemIcon>
                        <ListItemText
                           inset
                           primary={props.item.published === 'true' ? "Unpublish" : "Publish"}
                           style={{marginLeft: 1}}
                        />
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
//          {/*
//          <Typography variant="caption">
//             {comments.length} comments
//          </Typography>
//          */}
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
         <div
            style={{
               display: 'flex',
               width: '100%',
               marginTop: 8
            }}
         >
            <Button
               size="small"
               onClick={props.handleShowChronicleDeleteItemModal}
               style={{
                  marginLeft: 'auto',
                  marginRight: 8 
               }}
            > Delete
            </Button>
            <Button
               variant="contained"
               disabled={!props.item.date ? true : false}
               color="primary"
               size="small"
               onClick={() => props.publishChronicleItem(props.item.id, props.memorialId)}
               style={{display: 'flex', alignItems: 'center'}}
            > 
               <ChronicleIcon fill="white" style={{marginRight: 8, marginBottom: -4}} /> Publish
            </Button>
         </div>
      </CardContent>
   )
}


const ChronicleCardStory = (props) => {
   return (
      <div>
         {props.item.txt ?
            <div 
               style={{
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%',
                  cursor: 'pointer',
                  marginTop: 16,
                  marginBottom: 16
               }}
            >
               {props.showStory ? 
                  <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                     <div
                        onClick={props.handleShowChronicleUpdateStoryModal}
                        style={{
                           display: 'flex',
                           alignItems: 'center',
                           background: '#fafafa',
                           borderRadius: 4,
                        }}
                     >
                        <IconButton
                           style={{
                              alignSelf: 'flex-start'
                           }}
                        >
                           <StoryIcon
                              style={{
                                 color: 'rgba(0,0,0,0.54)'
                              }}
                           />
                        </IconButton>
                        <div style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
                           <Typography
                              variant="body1"
                              dangerouslySetInnerHTML={{__html: marked(props.item.txt.split("^J^J").join("\n"))}}
                           />
                        </div>
                        <IconButton
                           onClick={props.handleShowChronicleUpdateStoryModal}
                           style={{marginLeft: 'auto', alignSelf: 'flex-start'}}
                        >
                           <EditIcon />
                        </IconButton>
                     </div>
                     <Typography
                        variant="caption"
                        style={{
                           color: link1,
                           cursor: 'pointer',
                           alignSelf: 'flex-start',
                           marginLeft: 16,
                           marginTop: 8 
                        }}
                        onClick={props.handleHideStory}
                     > Read less
                     </Typography>
                  </div>
                     :
                  <div style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
                     <div 
                        onClick={props.handleShowChronicleUpdateStoryModal}
                        style={{
                           display: 'flex',
                           alignItems: 'center',
                           background: '#fafafa',
                           borderRadius: 4,
                        }}
                     >
                        <IconButton
                           style={{
                              alignSelf: 'flex-start'
                           }}
                        >
                           <StoryIcon
                              style={{
                                 color: 'rgba(0,0,0,0.54)'
                              }}
                           />
                        </IconButton>
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
                     {props.item.txt.length > 70 &&
                        <Typography
                           variant="caption"
                           style={{
                              color: link1,
                              cursor: 'pointer',
                              marginTop: 8,
                              marginLeft: 16
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
               onClick={props.handleShowChronicleUpdateStoryModal}
               style={{
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%',
                  marginTop: 16,
                  marginBottom: 16,
                  background: '#fafafa',
                  borderRadius: 4,
                  cursor: 'pointer'
               }}
            >
               <IconButton>
                  <StoryIcon 
                     style={{color: 'rgba(0,0,0,0.54)', cursor: 'pointer', alignSelf: 'flex-start'}}
                  />
               </IconButton>
               <Typography
                  variant="caption" 
                  style={{marginLeft: 8, cursor: 'pointer'}}
               >
                  No caption yet.
               </Typography>
               <Typography 
                  variant="caption"
                  style={{
                     color: link1, marginLeft: 6,
                     cursor: 'pointer'
                  }}
               >
                  Add one 
               </Typography>
               <IconButton style={{marginLeft: 'auto'}}>
                  <AddIcon />
               </IconButton>
            </div>
         }
      </div>
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

