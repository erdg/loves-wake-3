import React from 'react';
import ChronicleCard from 'components/ChronicleCard';
import UnpublishedCard from './UnpublishedCard';
import LazyLoad from 'react-lazyload';

const LimboContentList = (props) => {
   // only chronicle items that have been 'published'
   let unpublishedItems = props.memorial.items.filter(itm => itm.published === "false");
   // console.log("filtered: ", filtered);
   return (
      <div style={{margin: 16}}>
         {unpublishedItems.map((item, i) => (
            <LazyLoad 
               key={Math.random()}
               height={200}
               offset={600}
               once
            >
               <UnpublishedCard
                  item={item}
                  memorialId={props.memorial.id}
                  born={props.memorial.born.split(/[^\d]/).find((n) => n.length === 4)}
                  died={props.memorial.died.split(/[^\d]/).find((n) => n.length === 4)}
               />
            </LazyLoad>
         ))}
      </div>
   )
}

export default LimboContentList;
