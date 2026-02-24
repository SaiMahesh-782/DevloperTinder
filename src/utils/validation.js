const validator=require('validator');

const Uservalidation=(req)=>{
    const {firstName,lastName,emailId,password}=req.body;
    if(!firstName || !lastName || !emailId || !password){
        throw new Error("Missing required fields");
    }

    else if(!validator.isEmail(emailId)){
        throw new Error("Invalid email");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("password is not strong enough");
    }
    }

const ValidateEditProfile=(req)=>{
const allowedFields=["firstName","lastName","password","skills","gender","about","photo"]; 
const updates=Object.keys(req.body).every((field)=>{
    allowedFields.includes(field);
});
return updates;

}
module.exports={Uservalidation,ValidateEditProfile
}