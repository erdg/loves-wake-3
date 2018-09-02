import React from 'react';
import ChronicleCard from 'components/ChronicleCard';
import LazyLoad from 'react-lazyload';

const ChronicleContentList = (props) => (
   <div>
      {props.memorial.items.map((item, i) => (
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

export default ChronicleContentList;
