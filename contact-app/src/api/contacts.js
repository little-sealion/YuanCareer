import axios from 'axios';

export default axios.create(
    {
      baseURL: "http://localhost:3006/",
        // baseURL: "https://contactlist-45ed7-default-rtdb.asia-southeast1.firebasedatabase.app/",
        // withCredentials: false,
        // headers: {
        //   'Access-Control-Allow-Origin' : '*',
        //   'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',  
        //   'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8;application/json'
      }
)