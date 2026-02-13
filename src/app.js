//1:20:45

const express = require('express');
const app = express();
const {connectDB}=require('./config/database');
const UserModel=require('./Models/User');
app.use(express.json());

const {Uservalidation}=require('./utils/validation');
const bcrypt=require('bcrypt');
const cookieParser=require('cookie-parser');
const jwt=require('jsonwebtoken')
const {UserAuth}=require('./middleware/auth');

app.use(cookieParser());
app.post('/SignUp',async (req,res)=>{
 try{ 
  Uservalidation(req);
    
    const { firstName, lastName, emailId, password } = req.body;
    const passwordHash=await bcrypt.hash(req.body.password,10);
const newUser=new UserModel({
  firstName ,
  lastName , 
  emailId , 
  password : passwordHash,
   
})
   
    await newUser.save()
     res.send("User signed up successfully");
    }catch(err){
        res.status(500).send("Error signing up user "+err.message);}    
    });

app.get("/user", async (req, res) =>{
const userEmail = req.body.emailId;

try {
const user =await UserModel.find({ emailId : userEmail});
res.send(user);

 
} catch (err) {
res.status(408).send("Something went wrong ");

}

});


app.post('/login',async (req,res)=>{
    try{
    const {emailId,password}=req.body;  

    const user=await UserModel.findOne({emailId:emailId});
    if(!user){
        throw new Error("Invalid credentials");
    }
    const isMatch= await user.validatePassword(password);
    if(isMatch){
        const token=user.getJWTToken();
    res.cookie("token",token,{ maxAge: 1000 * 60 * 60 * 24 });
    res.send("User logged in successfully");   
   }
   else{
    throw new Error("Invalid credentials");
   }

    }catch(err){
        res.status(500).send("Error logging in user "+err.message);
    }})

app.get('/profile', UserAuth, async (req, res) => {
  try {
    res.send(req.user);   // ✅ correct property
  } catch (err) {
    res.status(500).send("Error fetching profile data " + err.message);
  }
});

app.post('/SendConnectionRequest', UserAuth, async (req, res) => {
  
  const user=req.user;
  console.log("connection request sent");

  res.send(user.firstName+" Connection request sent successfully"); 
})
   
connectDB().then(()=>{
    console.log("Database connected successfully");
    app.listen(7777 ,()=>{
    console.log("Server is running on port 7777");
})

}).catch((err)=>{
    console.log("Database connection failed",err);
});


 
 