import React from 'react';
import history from '../../history';
import Typography from '@material-ui/core/Typography';
import LogoMultiColor from 'components/icons/LogoMultiColor';
import Button from '@material-ui/core/Button';

const Home = (props) => {
   return (
      <div style={{margin: '40px auto', textAlign: 'center'}}>
         <Typography variant="display1" style={{margin: 36}}>
            Love's Wake
         </Typography>
         <LogoMultiColor
            height={160}
            width={160}
         />
         <Typography variant="body1" align="center"
            style={{margin: 36}}
         >
            A place to share memories about the ones we've lost
         </Typography>
         <Button
            variant="contained"
            color="primary"
            style={{display: 'block', margin: '0 auto'}}
            onClick={() => history.push("/login")}
         > Login
         </Button>
         <Button
            style={{display: 'block', margin: '8px auto'}}
            onClick={() => history.push("/signup")}
         > Sign up
         </Button>
      </div>
   )
}

export default Home;
