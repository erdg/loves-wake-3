import React from 'react';
import { connect } from 'unistore/react';
import { actions } from 'store';
import ChronicleCard from 'components/ChronicleCard';
import UnpublishedCard from './UnpublishedCard';
import LazyLoad from 'react-lazyload';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';

class LimboContentList extends React.Component {
   render () {
      // only chronicle items that have been 'published'
      let unpublishedItems = this.props.memorial.items.filter(itm => itm.published === "false");
      // console.log("filtered: ", filtered);
      return (
         <div>
            {this.props.memorial.items.map((item, i) => (
               <LazyLoad 
                  key={i}
                  height={200}
                  offset={600}
                  once
               >
                  {item.published === "false" ?
                  <UnpublishedCard
                     item={item}
                     memorialId={this.props.memorial.id}
                     born={this.props.memorial.born.split(/[^\d]/).find((n) => n.length === 4)}
                     died={this.props.memorial.died.split(/[^\d]/).find((n) => n.length === 4)}
                  />
                        :
                  <div style={{display: 'flex'}}>
                     <Card
                        style={{width: '100%'}}
                        elevation={0}
                     >
                        <div
                           style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              width: '100%',
                           }}
                        >
                           {item.imageSrc &&
                              <CardMedia image={item.imageSrc}
                                 style={{
                                    height: 80,
                                    width: 80,
                                    marginTop: 16,
                                    marginBottom: 16
                                 }}
                              />
                           }
                           <CardContent
                              style={{
                                 padding: '0px 16px',
                                 width: '100%'
                              }}
                           >
                              <div
                                 style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                 }}
                              >
                                 <Typography variant="caption">
                                    Card Published to Chronicle
                                 </Typography>
                                 <Button
                                    onClick={() => this.props.unpublishChronicleItem(item.id, this.props.memorial.id)}
                                    style={{
                                       marginLeft: 'auto',
                                       marginTop: 8,
                                       marginBottom: 8
                                    }}
                                 > Unpublish
                                 </Button>
                              </div>
                           </CardContent>
                        </div>
                        <Divider />
                     </Card>
                  </div>
                  }
               </LazyLoad>
            ))}
         </div>
      )
   }
}

export default connect('', actions)(LimboContentList);
