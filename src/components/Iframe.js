import React from 'react';

class Iframe extends React.Component {
   render () {
      return (
         <div>
            <iframe
               title={this.props.title}
               src={this.props.src}
               style={this.props.style}
            />
         </div>
      )
   }
}

export default Iframe;
