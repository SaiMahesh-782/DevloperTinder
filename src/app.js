

const express = require('express');
const app = express();
 
app.get(
  '/user',
  (req, res, next) => {
    console.log("handling the user 1");
    next(); // pass control to next handler
    res.send("Response")
  },
  (req, res) => {
    console.log("handling the user 2");
    //res.send("Hello World");
    next()
  }
);


app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})