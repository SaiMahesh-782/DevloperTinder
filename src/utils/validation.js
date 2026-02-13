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
module.exports={Uservalidation 
}