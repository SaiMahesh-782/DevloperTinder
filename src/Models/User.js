
const mongoose=require('mongoose');
const validator=require('validator');
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt');


const UserSchema=new mongoose.Schema({
    firstName :
    {type:String,
    required:true,
    minlength:4,
    maxlength:30
},
 lastName :
     {
        type:String 
},
 emailId :
    {type:String,
    required:true,
    unique:true,
    trim:true,
    lowercase:true,
    validate(value){
        if(!validator.isEmail(value)){
            throw new Error("Invalid email");
        }
    }
    },

    password :
    {type:String,
    required:true
    },
    age :
    {type:Number,
        min:18
    },
    gender :
    {
        type:String,
        enum: {
        values: ['male', 'female', 'other'],
        message: '{VALUE} is not a valid gender',
         }, 
        // validate(value){
        //     if(!["male","female","other"].includes(value.toLowerCase())){
        //         throw new Error("Invalid gender");
        //     }
        // }
    },
    about :
    {
        type:String,
    default:"This is a default about"
    },
    skills :
    {type:[String]
    },
    photo:{
        type:String,
        default:"https://www.pngall.com/wp-content/uploads/5/Profile-PNG-High-Quality-Image.png",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid URL for photo");
            }   }
    }},
    {
        timestamps:true
    }
);

UserSchema.methods.getJWTToken=function(){
  const user=this;
    const token= jwt.sign({_id:this._id},"kdsjlajfdjo",{expiresIn:"1d"        
    });
    return token;   
}   

UserSchema.methods.validatePassword=async function(password){
    const user=this;
    const PasswordValid = await bcrypt.compare(password,user.password);
    return PasswordValid;
}

const UserModel=mongoose.model("User",UserSchema);
module.exports=UserModel;
 