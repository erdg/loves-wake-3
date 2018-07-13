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
         >
            <ChronicleCard
               item={item}
            />
         </LazyLoad>
      ))}
   </div>
)

export default Chronicle;
