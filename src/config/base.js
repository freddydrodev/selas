import Rebase from "re-base";
import firebase from "firebase";

const app = firebase.initializeApp({
  apiKey: "AIzaSyBM2CuHSA8K9hlDYDNBOopF2JLX3erh3Z8",
  authDomain: "selassie-70b8f.firebaseapp.com",
  databaseURL: "https://selassie-70b8f.firebaseio.com",
  projectId: "selassie-70b8f",
  storageBucket: "selassie-70b8f.appspot.com",
  messagingSenderId: "1066200350467"
});

const AUTH = app.auth();

const database = app.database();

const DB = Rebase.createClass(database);
//Storage
const STORAGE = app.storage();
export { STORAGE, DB, AUTH };
