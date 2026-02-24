

const express = require('express');
const app = express();
const {connectDB}=require('./config/database');
const UserModel=require('./Models/User');
app.use(express.json());

// const {Uservalidation}=require('./utils/validation');
const bcrypt=require('bcrypt');
const cookieParser=require('cookie-parser');
// const jwt=require('jsonwebtoken')
// const {UserAuth}=require('./middleware/auth');
const {authRouter}=require('./Router/authRouter');
const {ProfileRouter}=require('./Router/ProfileRouter');
const {RequestRouter}=require('./Router/RequestRouter');

app.use("/",authRouter);
app.use("/ ",ProfileRouter);
app.use("/ ",RequestRouter);


app.use(cookieParser());


app.get("/user", async (req, res) =>{
const userEmail = req.body.emailId;

try {
const user =await UserModel.find({ emailId : userEmail});
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


 
 