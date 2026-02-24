

import express, { json } from 'express';
const app = express();
import { connectDB } from './config/database';
import { find } from './Models/User';
app.use(json());

// const {Uservalidation}=require('./utils/validation');
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';
// const jwt=require('jsonwebtoken')
// const {UserAuth}=require('./middleware/auth');
import { authRouter } from './Router/authRouter';
import { ProfileRouter } from './Router/ProfileRouter';
import { RequestRouter } from './Router/RequestRouter';


app.use(cookieParser());


app.get("/user", async (req, res) =>{
const userEmail = req.body.emailId;

try {
const user =await find({ emailId : userEmail});
res.send(user);

 
} catch (err) {
res.status(408).send("Something went wrong ");

}

});



connectDB().then(()=>{
    console.log("Database connected successfully");
    app.listen(7777 ,()=>{
    console.log("Server is running on port 7777");
})

}).catch((err)=>{
    console.log("Database connection failed",err);
});


 
 