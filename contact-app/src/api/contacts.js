import axios from 'axios';
// import { initializeApp } from "firebase/app";
// import { getDatabase } from "firebase/database";


// const firebaseConfig = {
//     // ...
//     // The value of `databaseURL` depends on the location of the database
//     databaseURL: "https://contactlist-45ed7-default-rtdb.asia-southeast1.firebasedatabase.app/db.json",
//   };
  
//   // Initialize Firebase
//   const app = initializeApp(firebaseConfig);
  
  
//   // Initialize Realtime Database and get a reference to the service
//   const database = getDatabase(app);

export default axios.create(
    {
        baseURL: "https://contactlist-45ed7-default-rtdb.asia-southeast1.firebasedatabase.app/db.json",
        withCredentials: false,
        headers: {
          'Access-Control-Allow-Origin' : '*',
          'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',  
          'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8;application/json'
      }
    }
)