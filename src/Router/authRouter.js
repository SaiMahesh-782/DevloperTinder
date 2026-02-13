// 1:09:14

const express= require('express');

const authRouter=express.Router();

authRouter.post('/SignUp',async (req,res)=>{
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

authRouter.post('/login',async (req,res)=>{
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
