const mongoose=require('mongoose');
const connectDB=async()=>{
    await mongoose.connect("mongodb+srv://saideveloper:YP4RJsZx7qlST1g5@tinder.jcih6ql.mongodb.net/devTinder")
};

module.exports={connectDB};    


 