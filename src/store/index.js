import createStore from 'unistore';
import devtools from 'unistore/devtools';
import history from '../history';
import update from 'immutability-helper';

// API
// development
const API_ENDPOINT = "http://192.168.0.48:8887/";

// kathleen's house
// const API_ENDPOINT = "http://192.168.0.23:8887/";

// parent's house
// const API_ENDPOINT = "http://10.0.0.98:8887/";

// production
// const API_ENDPOINT = "https://erikdgustafson.com/api/";
// const API_ENDPOINT = "https://erikdgustafson.com/lw3/";

let store = devtools(createStore({
// let store = createStore({

   // loading state toggle for store actions
   loading: null,
   // server error
   error: null,
   // user session token
   // NOTE - need to sync with local/sessionStorage
   loginToken: null,
   // user data
   // TODO - refactor this nested mess!
   user: {},

}))
// })

let actions = store => ({

   addChronicleItem (state, item, memorialId) {
      // fuck this noise
      // this is the pattern
      let newState = update(state.user, {
         memorials: memorials => update(memorials, {
            [memorials.findIndex((m) => m.id === memorialId)]: memorial => update(memorial, {
               items: items => update(items, {$unshift: [item]})
            })
         })
      });
      console.log({ newState });
      return { user: newState };
   },

   updChronicleItem (state, newItem, memorialId) {
      // gotta love nested state
      let newState = update(state.user, {
         memorials: memorials => update(memorials, {
            [memorials.findIndex((m) => m.id === memorialId)]: memorial => update(memorial, {
               items: items => update(items, {
                  [items.findIndex((itm) => itm.id === newItem.id)]: item => update(item, {$set: newItem})
               })
            })
         })
      });
      console.log({ newState });
      return { user: newState };
   },

   delChronicleItem (state, itemId, memorialId) {
      console.log('deleting item ' + itemId + ' from memorial ' + memorialId);
      // sheesh, all this nested data is the worst
      // this works now
      let newState = update(state.user, {
         memorials: memorials => update(memorials, {
            [memorials.findIndex((m) => m.id === memorialId)]: memorial => update(memorial, {
               items: items => update(items, {
                  $splice: [[items.findIndex((itm) => itm.id === itemId), 1]]
               })
            })
         })
      });
      console.log({ newState });
      return { user: newState };
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

export { store, actions, API_ENDPOINT };
