const jwt=require('jsonwebtoken')
const UserModel=require('../Models/User');

const UserAuth =async (req,res,next)=>{
    try{
      const cookie=req.cookies;
      const {token}=cookie;

      if(!token){
        throw new Error("No token provided");
      }
      const message=await jwt.verify(token,"kdsjlajfdjo");
      const userdetails=await UserModel.findById(message._id);
 
      if(!userdetails){
        throw new Error("User not found");
      } 

req.user = userdetails;
//      res.send(userdetails);  
      next(); 
      }
      catch(err){
        res.status(500).send("Error fetching profile data "+err.message);
      }
}

module.exports = { UserAuth };
