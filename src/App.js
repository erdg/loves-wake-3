import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import history from './history';
import { Provider } from 'unistore/react';
import { store } from './store';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './theme';

import Screen from './components/Screen';
import AppNav from './components/AppNav';
// import ChronicleCard from 'components/ChronicleCard';

// routes

import Home from './routes/Home/';
import LogIn from './routes/LogIn';
import SignUp from './routes/SignUp';
import User from './routes/User';
import UserNews from './routes/UserNews';
import CreateMemorial from './routes/CreateMemorial';
import Search from './routes/Search';
import Memorial from './routes/Memorial';

class App extends Component {
   render() {
      return (
         <MuiThemeProvider theme={theme}>
            <AppRouter />
         </MuiThemeProvider>
      );
   }
}

export default () => (
   <Provider store={store}>
      <App />
   </Provider>
)

const AppRouter = () => {
   return (
      <Router history={history}>
         <div>
            <AppNav />
            <Screen>
               <Route exact path="/" component={Home} />
               <Route exact path="/login" component={LogIn} />
               <Route exact path="/signup" component={SignUp} />
               <Route exact path="/search" component={Search} />
               <Route exact path="/user" component={User} />
               <Route exact path="/user/news" component={UserNews} />
               <Route exact path="/create-memorial" component={CreateMemorial} />
               <Route path="/memorial/:urlStr/:urlNm" component={Memorial} />
            </Screen>
         </div>
      </Router>
   )
}
