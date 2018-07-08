import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'unistore/react';
import { actions } from 'store';
import ChronicleCard from 'components/ChronicleCard';
import ReactList from 'react-list';

const Chronicle = (props) => (
   <div>
      {props.memorial.items.map((item, i) => (
         <ChronicleCard
            item={item}
            key={i}
         />
      ))}
   </div>
)

const Chronicle2 = (props) => (
   <div
      style={{
         overflow: 'auto',
         maxHeight: (
            props.secondaryAppHeaderVisible ? 
               window.screen.availHeight - 260
                  :
               document.getElementById("screen").scrollHeight
         )
      }}
   >
      <ReactList
         itemRenderer={(item, i) => (<ChronicleCard item={props.memorial.items[item]} key={i} />)}
         length={props.memorial.items.length}
         type='simple'
      />
   </div>
)

const renderChronicleItem = (item, i) => (
   <ChronicleCard item={item} key={i} />
)

export default connect('secondaryAppHeaderVisible', actions)(Chronicle2);
