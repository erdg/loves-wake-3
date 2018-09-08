import React from 'react';
import Typography from '@material-ui/core/Typography';
import LogoMultiColor from 'components/icons/LogoMultiColor';

const Home = (props) => {
   return (
      <div style={{margin: '40px auto', textAlign: 'center'}}>
         <LogoMultiColor
            height={160}
            width={160}
         />
         <Typography variant="display1" style={{marginTop: 16}}>
            LOVESWAKE
         </Typography>
      </div>
   )
}

export default Home;
