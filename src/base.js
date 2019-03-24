import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDOOLYSbuHqHZK5G3CP-ACzvrsh6bPZA5w",
    authDomain: "cliffhanger-3cb85.firebaseapp.com",
    databaseURL: "https://cliffhanger-3cb85.firebaseio.com",
    projectId: "cliffhanger-3cb85",
    storageBucket: "cliffhanger-3cb85.appspot.com",
    messagingSenderId: "672265012045"
});

const base = Rebase.createClass(firebase.database());

export { firebaseApp };

export default base;