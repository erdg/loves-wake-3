import createStore from 'unistore';
import devtools from 'unistore/devtools';
import history from '../history';
import update from 'immutability-helper';

// API
// development
const API_ENDPOINT = "http://192.168.0.48:8887/";

// christine's house
// const API_ENDPOINT = "http://192.168.1.23:8887/";

// kathleen's house
// const API_ENDPOINT = "http://192.168.0.23:8887/";

// parent's house
// const API_ENDPOINT = "http://10.0.0.98:8887/";

// production
// const API_ENDPOINT = "https://erikdgustafson.com/api/";
// const API_ENDPOINT = "https://erikdgustafson.com/lw3/";

// let store = devtools(createStore({
let store = createStore({

   // loading state toggle for store actions
   loading: false,
   // server error message
   error: '',
   // server success message
   success: '',

   recoverUserAccountSuccess: false,
   // user session token
   // NOTE - need to sync with local/sessionStorage
   loginToken: null,
   // user data
   // TODO - refactor this nested mess!
   user: {},

   // modal/dialog flags
   showCreateMilestoneDialog: false,

// }))
})

let actions = store => ({

   // FRONTEND FUNCTIONS
   openCreateMilestoneDialog (state) {
      store.setState({ showCreateMilestoneDialog: true })
   },

   closeCreateMilestoneDialog (state) {
      store.setState({ showCreateMilestoneDialog: false })
   },

   // API/BACKEND FUNCTIONS
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
      store.setState({ loading: true, error: '' });
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
            // store copy of token in localStorage, so I don't have to login 
            // every bloody time I close the browser
            window.localStorage.setItem('loveswakeUserToken', json.loginToken);
            history.push("/user");
            // call getUserData
            // this.getUserData(state);
            // console.log('JWT: ', json.loginToken);
         }
      })
      .catch((error) => store.setState({ error: error.message, loading: false }))
   },

   logoutUser (state, em, pw) {
      // see ya!
      history.push("/login");
      // remove login token from sessionStorage
      window.sessionStorage.removeItem('loginToken');
      // remove login token from localStorage
      window.localStorage.removeItem('loveswakeUserToken');
      return { user: {}};
   },

   getUserData (state) {
      store.setState({ loading: true });
      // if no token in sessionStorage, check localStorage to refresh
      if (!window.sessionStorage.getItem('loginToken')) {
         window.sessionStorage.setItem('loginToken', window.localStorage.getItem('loveswakeUserToken'))
      }
      fetch(API_ENDPOINT + "!getUserData", {
            method: "POST",
         body: JSON.stringify({
            loginToken: window.sessionStorage.getItem('loginToken')
         })
      })
      .then((res) => {
         // if token has expired, route to login page
         if (!res.ok) {
            alert('You need to login to access this page.');
            store.setState({ loading: false });
            history.push("/login");
            return;
         } else {
            return res.json();
         }
      })
      .then((json) => {
         store.setState({ user: json.user, loading: false })
      });
   },

   newUser (state, em, pw) {
      store.setState({ loading: true, error: '' })
      fetch(API_ENDPOINT + "!newUser", {
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
            history.push("/user");
            // call getUserData
            this.getUserData(state);
            console.log('JWT: ', json.loginToken);
         }
      })
      .catch((error) => store.setState({ error: error.message, loading: false }))
   },

   confirmUser (state, code) {
      store.setState({ loading: true });
      fetch(API_ENDPOINT + '!confirmUser', {
         method: "POST",
         body: JSON.stringify({
            loginToken: window.sessionStorage.getItem('loginToken'),
            code: code
         })
      })
      .then(res => res.json())
      .then(json => { 
         if (json.error) {
            store.setState({
               // display errors and remove loading spinner
               error: json.error,
               loading: false
         });
         } else if (json.loginToken) {
            // remove loading spinner
            store.setState({ loading: false});
            window.sessionStorage.setItem('loginToken', json.loginToken);
            // call getUserData
            this.getUserData(state);
         }
      })
   },

   publishChronicleItem (state, itemId, memorialId) {
      fetch(API_ENDPOINT + "!publishChronicleItem", {
         method: "POST",
         body: JSON.stringify({
            loginToken: window.sessionStorage.getItem('loginToken'),
            id: itemId,
            memorialId: memorialId
         })
      })
      .then((res) => res.json())
      .then((newItem) => {
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
         store.setState({ user: newState });
      })
   },

   unpublishChronicleItem (state, itemId, memorialId) {
      fetch(API_ENDPOINT + "!unpublishChronicleItem", {
         method: "POST",
         body: JSON.stringify({
            loginToken: window.sessionStorage.getItem('loginToken'),
            id: itemId,
            memorialId: memorialId
         })
      })
      .then((res) => res.json())
      .then((newItem) => {
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
         store.setState({ user: newState });
      })
   },

   updChronicleCardLocation (state, itemId, memorialId, location) {
      fetch(API_ENDPOINT + "!updChronicleCardLocation", {
         method: "POST",
         body: JSON.stringify({
            loginToken: window.sessionStorage.getItem('loginToken'),
            id: itemId,
            memorialId: memorialId,
            location: location
         })
      })
      .then((res) => res.json())
      .then((newItem) => {
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
         store.setState({ user: newState });
      })
   },

   updChronicleCardDate (state, itemId, memorialId, date) {
      fetch(API_ENDPOINT + "!updChronicleCardDate", {
         method: "POST",
         body: JSON.stringify({
            loginToken: window.sessionStorage.getItem('loginToken'),
            id: itemId,
            memorialId: memorialId,
            date: date
         })
      })
      .then((res) => res.json())
      .then((newItem) => {
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
         store.setState({ user: newState });
      })
   },

   updChronicleCardStory (state, itemId, memorialId, story) {
      fetch(API_ENDPOINT + "!updChronicleCardStory", {
         method: "POST",
         body: JSON.stringify({
            loginToken: window.sessionStorage.getItem('loginToken'),
            id: itemId,
            memorialId: memorialId,
            story: story
         })
      })
      .then((res) => res.json())
      .then((newItem) => {
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
         store.setState({ user: newState });
      })
   },

   getMemorial (state, urlStr, urlNm) {
      fetch(API_ENDPOINT + "!getMemorial", {
         method: "POST",
         body: JSON.stringify({
            loginToken: window.sessionStorage.getItem('loginToken'),
            urlStr: urlStr,
            urlNm: urlNm
         })
      })
      .then((res) => res.json())
      .then((memorial) => {
         let newState = update(state.user, {
            memorials: memorials => update(memorials, {$push: [memorial]})
         });
         console.log({ newState });
         store.setState({ user: newState });
      })
   },

   getMemorialEvents (state, memorialId) {
      console.log('getting memorial events');
      fetch(API_ENDPOINT + "!getMemorialEvents", {
         method: "POST",
         body: JSON.stringify({
            loginToken: window.sessionStorage.getItem('loginToken'),
            memorialId: memorialId
         })
      })
      .then((res) => res.json())
      .then((events) => {
         console.log(events);
         console.log(memorialId);
         let newState = update(state.user, {
            memorials: memorials => update(memorials, {
               [memorials.findIndex((m) => m.id === memorialId)]: memorial => update(memorial,
                  {$merge: events}
               )
            }) 
         });
         console.log({ newState });
         store.setState({ user: newState });
      })
   },

   newMemorial (state, nm, born, died, img) {
      let loginToken = window.sessionStorage.getItem("loginToken");
      store.setState({ loading: true });
      fetch(API_ENDPOINT + "!newMemorial",
         {
            method: "POST",
            body: JSON.stringify({
               nm: nm,
               // nm1: this.state.firstName,
               // nm2: this.state.middleName,
               // nm3: this.state.lastName,
               born: born,
               died: died,
               // strip leading "data:image/${mime};base64," so PL can
               // send it to "base64 -d" without having to 'chop' it.
               img: img,
               loginToken: loginToken
            })
         }
      )
      .then(res => res.json())
      .then(json => {
         let newState = update(state.user, {
            memorials: memorials => update(memorials, {$push: [json]})
         });
         console.log({ newState });
         store.setState({ user: newState, loading: false });
         history.push("/user");
      })
   },

   updMemorialObituary (state, memorialId, obituary) {
      fetch(API_ENDPOINT + "!updMemorialObituary", {
         method: "POST",
         body: JSON.stringify({
            loginToken: window.sessionStorage.getItem('loginToken'),
            memorialId: memorialId,
            obituary: obituary
         })
      })
      .then((res) => res.json())
      .then((json) => {
         let newState = update(state.user, {
            memorials: memorials => update(memorials, {
               [memorials.findIndex((m) => m.id === memorialId)]: memorial => update(memorial, {
                  obituaryText: obituaryText => update(obituaryText, {$set: json.obituary.split('^J').join('\n')})
                  })
               })
         });
         console.log({ newState });
         store.setState({ user: newState });
      })
   },

   recoverUserAccount (state, em) {
      store.setState({ loading: true });
      fetch(API_ENDPOINT + "!recoverUserAccount", {
         method: "POST",
         body: JSON.stringify({
            em: em
         })

      })
      .then(r => r.json())
      .then(json => {
         if (json.error) {
            store.setState({ 
               // display errors
               error: json.error, 
               loading: false
            });
         } else if (json.ok) {
            // handle recover success
            store.setState({
               loading: false,
               recoverUserAccountSuccess: true,
               error: ''
            })
         }
      })
   },

   hideRecoverUserAccountSuccessDialog (state) {
      store.setState({ recoverUserAccountSuccess: false });
   },

   updUserPassword (state, pw) {
      console.log(pw);
      store.setState({ loading: true });
      fetch(API_ENDPOINT + "!updUserPassword", {
         method: "POST",
         body: JSON.stringify({
            loginToken: window.sessionStorage.getItem('loginToken'),
            pw: pw
         })
      })
      .then(r => r.json())
      .then(json => {
         if (json.error) {
            store.setState({ 
               // display errors
               error: json.error, 
               loading: false
            });
         } else if (json.ok) {
            // handle recover success
            store.setState({
               loading: false,
               error: '',
               success: json.ok
            })
         }
      })
   },

   clearSuccess (state) {
      store.setState({ success: '' })
   },

   clearError (state) {
      store.setState({ error: '' })
   },


})

export { store, actions, API_ENDPOINT };
