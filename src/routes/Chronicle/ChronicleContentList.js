import React from 'react';
import ChronicleCard from 'components/ChronicleCard';
import LazyLoad from 'react-lazyload';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const ChronicleContentList = (props) => {
   // only chronicle items that have been 'published'
   let publishedItems = props.memorial.items.filter(itm => itm.published === "true");
   let born = parseInt(props.memorial.born.split(/[^\d]/).find((n) => n.length === 4));
   // list of years (birth - present)
   let years = Array.from(new Array(new Date().getFullYear() - born + 1), (x, i) => i + born);
   // concat
   let contentList = years.concat(publishedItems);
   // console.log(contentList);
   // sort by date, earliest first
   let sorted = contentList.sort(
      (a, b) => (isNaN(a) ? (a.date.split(/[^\d]/).find((n) => n.length === 4)) : a) - (isNaN(b) ? (b.date.split(/[^\d]/).find((n) => n.length === 4)) : b)
   );
   // console.log("sorted: ", sorted);
   return (
      <div style={{marginTop: 16}}>
         {sorted.map((item, i) => (
            isNaN(item) ?
               <LazyLoad 
                  key={i}
                  height={200}
                  offset={600}
                  once
               >
                  <ChronicleCard
                     item={item}
                     memorialId={props.memorial.id}
                     born={props.memorial.born.split(/[^\d]/).find((n) => n.length === 4)}
                     died={props.memorial.died ? props.memorial.died.split(/[^\d]/).find((n) => n.length === 4) : new Date().getFullYear()}
                  />
               </LazyLoad>
               :
               <div
                  key={i}
                  style={{
                     display: 'flex',
                     alignItems: 'center',
                     margin: '2px 16px'
                  }}
               >
                  <Typography variant="caption">
                     {item}
                  </Typography>
                  <div
                     style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                        marginLeft: 8
                     }}
                  >
                     <Divider />
                     <Divider />
                     <Divider />
                  </div>
               </div>
   ))}
      </div>
   )
}

export default ChronicleContentList;
