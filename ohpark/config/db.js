  import firebase from 'firebase';

  let config = {
    apiKey: "AIzaSyC90GTq_An7tmovAUifbUk72fhAYf-R-RE",
    authDomain: "ohpark-c1978.firebaseapp.com",
    databaseURL: "https://ohpark-c1978.firebaseio.com",
    projectId: "ohpark-c1978",
    storageBucket: "ohpark-c1978.appspot.com",
    messagingSenderId: "584541565471"
  };
 let app =  firebase.initializeApp(config);
 export const db = app.database();