import React from 'react';

import theme from '../../../theme';
import history from '../../../history';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider';
// import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ExpandLess from '@material-ui/icons/ExpandLess';
import Dot from '@material-ui/icons/FiberManualRecord';

import { connect } from 'unistore/react';

class Shrines extends React.Component {
   state = {
      shrinesOpen: true,
      custodianOpen: false,
      visitorOpen: false,
      followerOpen: false,
   }

   handleShrinesClick = () => {
      this.setState({ shrinesOpen: !this.state.shrinesOpen })
   }

   handleCustodianClick = () => {
      this.setState({ custodianOpen: !this.state.custodianOpen })
   }

   handleVisitorClick = () => {
      this.setState({ visitorOpen: !this.state.visitorOpen })
   }

   handleFollowerClick = () => {
      this.setState({ followerOpen: !this.state.followerOpen })
   }

   render () {
      return (
         <div>
            <ShrinesHeader
               shrinesOpen={this.state.shrinesOpen}
               handleShrinesClick={this.handleShrinesClick}
            />
            { this.state.shrinesOpen && <Divider /> }
            { this.state.shrinesOpen && <Divider /> }
            <ShrinesContent
               shrinesOpen={this.state.shrinesOpen}
               handleShrinesClick={this.handleShrinesClick}
               custodianOpen={this.state.custodianOpen}
               handleCustodianClick={this.handleCustodianClick}
               visitorOpen={this.state.visitorOpen}
               handleVisitorClick={this.handleVisitorClick}
               followerOpen={this.state.followerOpen}
               handleFollowerClick={this.handleFollowerClick}
               toggleMenu={this.props.toggleMenu}
            />
            { this.state.shrinesOpen && <Divider /> }
         </div>
      )
   }
}

export default Shrines;

const style = {
   colorPrimary: {
      color: theme.palette.primary.main
   },
   colorSecondary: {
      color: theme.palette.secondary.main,
   },
   colorGrey: {
      color: '#CCCCCC'
   },
}

const ShrinesHeader = (props) => {
   return (
      <ListItem button onClick={props.handleShrinesClick}>
         <ListItemIcon>
            <FavoriteIcon style={style.colorPrimary} color="primary" />
         </ListItemIcon>
         <ListItemText primary="My Shrines" />
         {props.shrinesOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
   )
}

const ShrinesContent = connect('user')(
   (props) => {
   return (
      <Collapse in={props.shrinesOpen} timeout="auto" unmountOnExit >
         <List component="div">
            {/*
            <Custodian
               custodianOpen={props.custodianOpen}
               handleCustodianClick={props.handleCustodianClick}
               shrines={testData.custodian}
            />
            <Visitor
               visitorOpen={props.visitorOpen}
               handleVisitorClick={props.handleVisitorClick}
               shrines={testData.visitor}
            />
            <Follower
               followerOpen={props.followerOpen}
               handleFollowerClick={props.handleFollowerClick}
               shrines={testData.follower}
            />
            */}
            { props.user.memorials && props.user.memorials.map((m, index) => (
               <ListItem
                  key={index}
                  button
                  onClick={
                     () => {
                        props.toggleMenu();
                        history.push("/memorial/" + m.urlStr + "/" + m.urlNm);
                     }
                  }
               >
                  <Dot style={style.colorSecondary} />
                  <Dot style={style.colorGrey} />
                  <ListItemText
                     inset
                     primary={m.nm}
                     primaryTypographyProps={{variant: "caption"}}
                  />
               </ListItem>
            ))}
         </List>
      </Collapse>
   )
})

// const Custodian = (props) => {
//    return (
//       <div>
//          <ListItem button onClick={props.handleCustodianClick}>
//             {props.custodianOpen ? <ExpandLess style={style.colorPrimary} /> : <ExpandMore style={style.colorPrimary} />}
//             <ListItemText>
//                <Typography style={style.colorPrimary}
//                   variant="subheading"
//                >
//                   {`Custodian (${props.shrines.length})`} 
//                </Typography>
//             </ListItemText>
//          </ListItem>
//          <Collapse in={props.custodianOpen} timeout="auto" unmountOnExit >
//             <List component="div">
//                { props.shrines.map((name, index) => (
//                   <ListItem key={index} >
//                      <Dot style={style.colorSecondary} />
//                      <Dot style={style.colorGrey} />
//                      <ListItemText
//                         inset
//                         primary={name}
//                      />
//                   </ListItem>
//                ))}
//             </List>
//          </Collapse>
//       </div>
//    )
// }

// const Visitor = (props) => {
//    return (
//       <div>
//          <ListItem button onClick={props.handleVisitorClick}>
//             {props.visitorOpen ? <ExpandLess style={style.colorPrimary} /> : <ExpandMore style={style.colorPrimary} />}
//             <ListItemText>
//                <Typography style={style.colorPrimary}
//                   variant="subheading"
//                >
//                   {`Visitor (${props.shrines.length})`} 
//                </Typography>
//             </ListItemText>
//          </ListItem>
//          <Collapse in={props.visitorOpen} timeout="auto" unmountOnExit >
//             <List component="div">
//                { props.shrines.map((name, index) => (
//                   <ListItem key={index} >
//                      <ListItemText
//                         inset
//                         primary={name}
//                      />
//                   </ListItem>
//                ))}
//             </List>
//          </Collapse>
//       </div>
//    )
// }

// const Follower = (props) => {
//    return (
//       <div>
//          <ListItem button onClick={props.handleFollowerClick}>
//             {props.followerOpen ? <ExpandLess style={style.colorPrimary} /> : <ExpandMore style={style.colorPrimary} />}
//             <ListItemText>
//                <Typography style={style.colorPrimary}
//                   variant="subheading"
//                >
//                   {`Follower (${props.shrines.length})`} 
//                </Typography>
//             </ListItemText>
//          </ListItem>
//          <Collapse in={props.followerOpen} timeout="auto" unmountOnExit >
//             <List component="div">
//                { props.shrines.map((name, index) => (
//                   <ListItem key={index}>
//                      <ListItemText
//                         inset
//                         primary={name}
//                      />
//                   </ListItem>
//                ))}
//             </List>
//          </Collapse>
//       </div>
//    )
// }

