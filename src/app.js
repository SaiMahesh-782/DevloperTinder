

const express = require('express');
const app = express();
const {connectDB}=require('./config/database');

const UserModel=require('./Models/User');
//app.use('/admin')
app.use(express.json()); // IMPORTANT


app.post('/SignUp',async (req,res)=>{

     const newUser=new UserModel({
        firstName:"akshay",
        LastName:"saini",
        emailId:"askshaymahesh645@gmail.com",
        Password:"akshayhesh123@#"
     }
);
    try{ 
    await newUser.save()
     res.send("User signed up successfully");
    }catch(err){
        res.status(500).send("Error signing up user");}   
    });


connectDB().then(()=>{
    console.log("Database connected successfully");
    app.listen(7777 ,()=>{
    console.log("Server is running on port 7777");
})

}).catch((err)=>{
    console.log("Database connection failed",err);
});


 
 