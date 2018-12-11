import React from 'react';

const ShrineIcon = (props) => (
   <span {...props}
      dangerouslySetInnerHTML={{__html:
         `<svg
            xmlns:dc="http://purl.org/dc/elements/1.1/"
            xmlns:cc="http://creativecommons.org/ns#"
            xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
            xmlns:svg="http://www.w3.org/2000/svg"
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            width="20"
            height="20"
            fill=${props.fill}
            viewBox="0 0 5.2916665 5.2916669"
            id="svg3222">
           <metadata
              id="metadata9">
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
              id="defs7" />
           <path
              id="path1633"
              d="m 2.6458335,-1.25e-7 -0.20671,0.454752995 -0.45475,0.206706 0.45475,0.206705 0.20671,0.45475293 0.2067001,-0.45475293 0.45476,-0.206705 -0.45476,-0.206706 z M 1.5875034,1.8520838 V 2.6458337 H 3.7041636 V 1.8520838 Z m -0.79374997,1.322916 v 0.79375 H 4.4979136 v -0.79375 z m -0.79375,1.322917 v 0.79375 H 5.2916633 v -0.79375 z"
              style="opacity:1;fill-opacity:1;stroke:none;stroke-width:0.57146776;stroke-linecap:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
         </svg>`
      }}
   />
)

export default ShrineIcon;
