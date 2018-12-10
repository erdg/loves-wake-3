import React from 'react';
import { connect } from 'unistore/react';
import { actions } from 'store';
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

      if (this.props.memorial.items.length === 0) {
         return (
            <div style={{width: '92%', margin: '0 auto', marginTop: 16}}>
               <Typography variant="headline" paragraph >
                  This is Limbo.
               </Typography>
               <Typography variant="subheading" paragraph >
                  It's a collaborative workspace. All uploaded content lands here first. You and your
                  fellow contributors can work together here to chase down dates and stories. When an
                  item is ready, it can be published to Chronicle.
               </Typography>
               <Typography variant="subheading" paragraph >
                  Begin by clicking the "add" icon above. You can upload photos, videos, audio, or 
                  written notes. Fill in any details when uploading if you'd like, but only a file 
                  or story is needed to submit.
               </Typography>
            </div>
         )
      } else {
         return (
            <div>
               {/*this.props.memorial.items.map((item, i) => (*/}
               {unpublishedItems.map((item, i) => (
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
                                       size="small"
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
}

export default connect('', actions)(LimboContentList);
