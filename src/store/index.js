import createStore from 'unistore';
import devtools from 'unistore/devtools';
import history from '../history';

// API
// development
// const API_ENDPOINT = "http://192.168.0.48:8887/";

// kathleen's house
// const API_ENDPOINT = "http://192.168.0.23:8887/";

// production
// const API_ENDPOINT = "https://erikdgustafson.com/api/";
const API_ENDPOINT = "https://erikdgustafson.com/lw3/";

// let store = devtools(createStore({
let store = createStore({
   // loading state toggle for store actions
   loading: null,
   // server error
   error: null,
   // user session token
   // NOTE - need to sync with local/sessionStorage
   loginToken: null,
   // user data
   user: {},

   secondaryAppHeader: false,
   secondaryAppHeaderVisible: true,

// }))
})

let actions = store => ({

   setSecondaryAppHeader (state) {
      store.setState({ secondaryAppHeader: true })
   },

   unsetSecondaryAppHeader (state) {
      store.setState({ secondaryAppHeader: false })
      store.setState({ secondaryAppHeaderVisible: true })
   },

   showSecondaryAppHeader (state) {
      store.setState({ secondaryAppHeaderVisible: true })
   },

   hideSecondaryAppHeader (state) {
      store.setState({ secondaryAppHeaderVisible: false })
   },

   loginUser (state, em, pw) {
      store.setState({ loading: true });
      fetch(API_ENDPOINT + "!loginUser", {
         method: "POST",
         body: JSON.stringify({
            // on the server...
            //
            // (let [Em (posted "em")  Pw (posted "pw") ]
            //    ... )
            //
            em: em,
            pw: pw
         })
      })
      .then((res) => {
         if (res.ok) {
            return res.json();
         }
         throw new Error("Hmm, something is wrong with the network. Please try again.");
      })
      .then((json) => {
         // if server error
         if (json.error) {
            store.setState({ 
               // display errors and remove loading spinner
               error: json.error, 
               loading: false
            });
         } else {
            // remove loading spinner
            store.setState({
               loading: false,
               loginToken: json.loginToken
            });
            // store login token in sessionStorage
            window.sessionStorage.setItem('loginToken', json.loginToken);
            // call getUserData
            this.getUserData(state);
            console.log('JWT: ', json.loginToken);
         }
      })
      .catch((error) => store.setState({ error: error.message, loading: false }))
   },

   getUserData (state) {
      store.setState({ loading: true });
      fetch(API_ENDPOINT + "!getUserData", {
            method: "POST",
            body: JSON.stringify({ loginToken: window.sessionStorage.getItem('loginToken')})
      })
      .then((res) => {
         // if token has expired, route to login page
         if (!res.ok) {
            alert('You need to login to access this page.');
            store.setState({ loading: false });
            return;
         } else {
            return res.json();
         }
      })
      .then((json) => {
         store.setState({ user: json.user, loading: false })
         history.push("/user");
      });
   },

   signup (state) {
      store.setState({ loading: true })
      setTimeout(() => {
         store.setState({ loading: false });
      }, 1000)
   }

})

export { store, actions };
