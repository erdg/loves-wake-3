import React from 'react';
import history from '../../history';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Button from '@material-ui/core/Button';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import FlowerIcon from '@material-ui/icons/LocalFlorist';
import LocationIcon from '@material-ui/icons/LocationOn';
import EventIcon from '@material-ui/icons/Event';
import PhotoIcon from '@material-ui/icons/Photo';
import CakeIcon from '@material-ui/icons/Cake';
// import TimelineIcon from '@material-ui/icons/Timeline';
// import DateRangeIcon from '@material-ui/icons/DateRange';
import HeartIcon from '@material-ui/icons/Favorite';
// import EditIcon from '@material-ui/icons/Edit';

import HomePageBanner from 'components/HomePageBanner';


const Home = (props) => {
   return (
      <div>
         <div style={{position: 'relative'}}>
            <HomePageBanner />
            <Typography variant="body1" align="center"
               style={{
                  position: 'absolute',
                  top: '46%',
                  left: 0,
                  right: 0,
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  color: 'white',
                  width: '50%'
               }}
            >
               A place to share memories about the ones we've lost
            </Typography>
            <Button
               variant="contained"
               color="primary"
               onClick={() => history.push("/login")}
               style={{
                  position: 'absolute',
                  top: '60%',
                  left: 0,
                  right: 0,
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  width: 100,
                  color: 'white'
               }}
            > Login
            </Button>
            <Button
               onClick={() => history.push("/signup")}
               style={{
                  position: 'absolute',
                  top: '68%',
                  left: 0,
                  right: 0,
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  width: 100,
                  color: 'white'
               }}
            > Sign up
            </Button>
            <Typography variant="caption" align="center"
               style={{
                  position: 'absolute',
                  top: '94%',
                  left: 0,
                  right: 0,
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  color: 'white'
               }}
            >
               Scroll down to learn more
            </Typography>
         </div>

         <div style={{maxWidth: 800, margin: '0 auto'}}>
            <div style={{width: '90%', margin: '24px auto'}}>

               <Typography variant="headline" paragraph
               >
                  What is this? Who is this for?
               </Typography>
               <Typography variant="body1" paragraph >
                  Love’s Wake is a tool made of collective memory. Here, you collaborate with others to
                  build a memorial for someone you’ve all lost. Everyone contributes their pictures, memories, and energy.
               </Typography>
               <Typography variant="body1" paragraph >
                  Love’s Wake is not for the whole world - it is for a community.
                  Content has many privacy controls. Friends and family join and view by invite only.
               </Typography>

               <Typography variant="headline" paragraph
                  style={{marginTop: 24}}
               >
                  How does it work?
               </Typography>
               <Typography variant="body1" paragraph >
                  A memorial will be a reflection of the person you’ve lost.
               </Typography>

               <Typography variant="subheading">
                  It's sort of like a grave site
               </Typography>
               <List>
                  <ListItem>
                     <ListItemIcon>
                        <FlowerIcon />
                     </ListItemIcon>
                     <ListItemText
                        primary="Leave flowers and candles"
                     />
                  </ListItem>
                  <ListItem>
                     <ListItemIcon>
                        <HeartIcon />
                     </ListItemIcon>
                     <ListItemText
                        primary="Offer memories and share mementos"
                     />
                  </ListItem>
                  <ListItem>
                     <ListItemIcon>
                        <LocationIcon />
                     </ListItemIcon>
                     <ListItemText
                        primary="Add a place of rest on the world map"
                     />
                  </ListItem>
               </List>

               <Typography variant="subheading">
                  It's sort of like a scrapbook
               </Typography>
               <List>
                  <ListItem>
                     <ListItemIcon>
                        <PhotoIcon />
                     </ListItemIcon>
                     <ListItemText
                        primary="Add photos and videos"
                     />
                  </ListItem>
                  <ListItem>
                     <ListItemIcon>
                        <CakeIcon />
                     </ListItemIcon>
                     <ListItemText
                        primary="Mark important events and milestones"
                     />
                  </ListItem>
                  <ListItem>
                     <ListItemIcon>
                        <EventIcon />
                     </ListItemIcon>
                     <ListItemText
                        primary="Arrange things by time and place"
                     />
                  </ListItem>
               </List>

               <Typography variant="headline" paragraph
                  style={{marginTop: 16}}
               >
                  How do I use it?
               </Typography>
               <Typography variant="body1" paragraph >
                  Which one best represents you?
               </Typography>

               <ExpansionPanel>
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                     <Typography variant="subheading">
                        I was invited to collaborate on a memorial
                     </Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                     <div>
                        <Typography variant="body1">
                           As a collaborator, you can contribute in many ways:
                        </Typography>
                        <List>
                           <ListItem>
                              <ListItemText
                                 primary="Fill in details"
                                 secondary={
                                    `If you see something missing, use the "suggest" feature 
                                    to fill in what you know.`
                                 }
                              />
                           </ListItem>
                           <ListItem>
                              <ListItemText
                                 primary="Share a memory"
                                 secondary={`Visit the "Shrine" to leave a note, perhaps for no one but yourself.`}
                              />
                           </ListItem>
                           <ListItem>
                              <ListItemText
                                 primary="Add a photo or other artifacts"
                                 secondary="Dust off old yearbooks and photo boxes."
                              />
                           </ListItem>
                        </List>
                     </div>
                  </ExpansionPanelDetails>
               </ExpansionPanel>

               <ExpansionPanel>
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                     <Typography variant="subheading">
                     I'm here to start a memorial
                     </Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                     <List>
                        <ListItem>
                           <ListItemText
                           primary="Create a memorial"
                           secondary="All you need to start a memorial is a name, some rough dates, and a profile picture."
                        />
                        </ListItem>
                        <ListItem>
                           <ListItemText
                              primary="Invite collaborators"
                              secondary="Collaborators are key to building a rich memorial. They can add photos
                              and all sorts of other things. You can assign them permissions and approve
                              what they share."
                           />
                        </ListItem>
                        <ListItem>
                           <ListItemText
                              primary="Bulk upload"
                              secondary="Gather everything you’ve got and add it. Collaborators can help you 
                                 sort through everything and track down the details."
                              />
                        </ListItem>
                     </List>
                  </ExpansionPanelDetails>
               </ExpansionPanel>


               <ExpansionPanel>
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                     <Typography variant="subheading">
                        I'm searching for a memorial
                     </Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                     <List>
                        <ListItem>
                           <ListItemText
                              primary="Search by name"
                              secondary="Search among memorials and our directory of active contributors.
                                 (based on privacy settings)"
                           />
                        </ListItem>
                        <ListItem>
                           <ListItemText
                              primary="Search by map"
                              secondary="Browse the map for Shrines"
                           />
                        </ListItem>
                        <ListItem>
                           <ListItemText
                              primary="Can't find it? Reach out to the family"
                              secondary="Some memorials are not discoverable by search because of their privacy settings.
                                 If you think a memorial exists, but can't find it, ask around among friends and family
                                 for in invite."
                           />
                        </ListItem>
                     </List>
                  </ExpansionPanelDetails>
               </ExpansionPanel>

               <Typography variant="headline" paragraph
                  style={{marginTop: 32}}
               >
                  Can anyone see?
               </Typography>
               <Typography variant="body1">
                  Privacy settings
               </Typography>
               <List>
                  <ListItem>
                     <ListItemText
                        primary="Completely open"
                     />
                  </ListItem>
                  <ListItem>
                     <ListItemText
                        primary="Public view"
                     />
                  </ListItem>
                  <ListItem>
                     <ListItemText
                        primary="Request only (default)"
                     />
                  </ListItem>
                  <ListItem>
                     <ListItemText
                        primary="Completely hidden"
                        secondary="The memorial will not show up in search results 
                           and not allow requests for access. The only way to visit 
                           is with an invite from a collaborator or admin."
                     />
                  </ListItem>
               </List>


               <Typography variant="headline"
                  style={{marginTop: 8}}
               >
                  Can anyone post?
               </Typography>
               <Typography variant="body1" paragraph
               >
                  Love’s Wake gives a family total control over who can visit and post on a memorial.
               </Typography>
               
               <List>

                  <ListItem>
                     <div>
                        <Typography variant="title">
                           Visitors
                        </Typography>
                        <Typography variant="body1">
                           As a visitor you can:
                        </Typography>
                        <List>
                           <ListItem>
                              <ListItemText
                                 primary="Subscribe for anniversies and reminders"
                              />
                           </ListItem>
                           <ListItem>
                              <ListItemText
                                 primary="Like photos and other posts"
                              />
                           </ListItem>
                           <ListItem>
                              <ListItemText
                                 primary="Suggest answers to missing details, or suggest edits"
                              />
                           </ListItem>
                           <ListItem>
                              <ListItemText
                                 primary="Offer something, like a card, a candle or flower"
                              />
                           </ListItem>
                        </List>
                     </div>
                  </ListItem>

                  <ListItem>
                     <div>
                        <Typography variant="title">
                           Collaborators
                        </Typography>
                        <Typography variant="body1">
                           As a collaborator you have all the powers of a visitor, plus more. Work as a team to:
                        </Typography>
                        <List>
                           <ListItem>
                              <ListItemText
                                 primary="Publish to and actively develop the memorial"
                              />
                           </ListItem>
                           <ListItem>
                              <ListItemText
                                 primary="Add & edit photos, videos, mementos and more"
                              />
                           </ListItem>
                           <ListItem>
                              <ListItemText
                                 primary="Moderate suggestions and make edits as necessary"
                              />
                           </ListItem>
                           <ListItem>
                              <ListItemText
                                 primary="Sort out what’s in Limbo - a sort of work area - the middle place where 
                                    things sit before publishing"
                              />
                           </ListItem>
                           <ListItem>
                              <ListItemText
                                 primary="Invite visitors from your community"
                              />
                           </ListItem>
                        </List>
                     </div>
                  </ListItem>

                  <ListItem>
                     <div>
                        <Typography variant="title">
                           Administators
                        </Typography>
                        <Typography variant="body1">
                           As an administrator, you are trusted with the keys. Your additional responsibilities are to:
                        </Typography>
                        <List>
                           <ListItem>
                              <ListItemText
                                 primary="Manage privacy settings for the memorial"
                              />
                           </ListItem>
                           <ListItem>
                              <ListItemText
                                 primary="Assign privileges to new collaborators and administrators"
                              />
                           </ListItem>
                           <ListItem>
                              <ListItemText
                                 primary="Revoke and remove and report as necessary"
                              />
                           </ListItem>
                        </List>
                     </div>
                  </ListItem>
               </List>

            </div>
         </div>
      </div>
   )
}

export default Home;
