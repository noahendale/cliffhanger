import Rebase from 're-base';
import firebase from 'firebase';
import config from './config';

const firebaseApp = firebase.initializeApp({
    apiKey: config.FIREBASE_API_KEY,
    authDomain: "cliffhanger-3cb85.firebaseapp.com",
    databaseURL: "https://cliffhanger-3cb85.firebaseio.com",
    projectId: "cliffhanger-3cb85",
    storageBucket: "cliffhanger-3cb85.appspot.com",
    messagingSenderId: "672265012045"
});

const base = Rebase.createClass(firebase.database());

export { firebaseApp };

export default base;