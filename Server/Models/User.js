const mongoose=require('mongoose')

const userSchema12=new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            unique:true
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true
        },
        authCode:{
            type:String,
            required:true
        }
    }
)

const userModel=mongoose.model("UserDetails",userSchema12)

module.exports=userModel