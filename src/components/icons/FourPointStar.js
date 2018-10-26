import React from 'react';

const FourPointStar = (props) => (
   <span {...props}
      dangerouslySetInnerHTML={{__html:
         `<svg
            xmlns:dc="http://purl.org/dc/elements/1.1/"
            xmlns:cc="http://creativecommons.org/ns#"
            xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
            xmlns:svg="http://www.w3.org/2000/svg"
            xmlns="http://www.w3.org/2000/svg"
            id="svg8"
            version="1.1"
            viewBox="0 0 24 24"
            height="24"
            width="24">
            fill=${props.fill}
           <metadata
              id="metadata14">
             <rdf:RDF>
               <cc:Work
                  rdf:about="">
                 <dc:format>image/svg+xml</dc:format>
                 <dc:type
                    rdf:resource="http://purl.org/dc/dcmitype/StillImage" />
                 <dc:title></dc:title>
               </cc:Work>
             </rdf:RDF>
           </metadata>
           <defs
              id="defs12" />
           <path
              id="path4"
              d="M0 0h24v24H0V0z"
              fill="none" />
           <path
              style="stroke-width:2.5"
              id="path6"
              d="M 12,22 15.125,15.125 22,12 15.125,8.8750001 12,2 8.8750001,8.8750001 2,12 8.8750001,15.125 Z" />
         </svg>`
      }}
   />
)

export default FourPointStar;
      
