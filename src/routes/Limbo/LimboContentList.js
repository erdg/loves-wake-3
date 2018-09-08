import React from 'react';
import ChronicleCard from 'components/ChronicleCard';
import LazyLoad from 'react-lazyload';

const LimboContentList = (props) => {
   // only chronicle items that have been 'published'
   let filtered = props.memorial.items.filter(itm => itm.published === "false");
   // console.log("filtered: ", filtered);
   return (
      <div>
         {filtered.map((item, i) => (
            <LazyLoad 
               key={i}
               height={200}
               offset={200}
               once
            >
               <ChronicleCard
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
