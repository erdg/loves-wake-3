import React from 'react';
import ChronicleCard from 'components/ChronicleCard';
import LazyLoad from 'react-lazyload';

const Chronicle = (props) => (
   <div>
      {props.memorial.items.map((item, i) => (
         <LazyLoad 
            key={i}
            height={400}
            offset={400}
            once
         >
            <ChronicleCard
               item={item}
               memorialId={props.memorial.id}
            />
         </LazyLoad>
      ))}
   </div>
)

export default Chronicle;
