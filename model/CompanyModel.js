/// Requiring The Pakages and Modules ------------------------------------------------------------------>
const mongoose=require("mongoose");
const bcrypt=require("bcrypt");
const validator=require("validator");
const jwt=require("jsonwebtoken");
// Requiring The SecretKey From The Config Folder --------------------------------------------------------------------------->
const secretKey=require("../config/secretKey");
mongoose.set('strictQuery', true);

// Connecting With The Mongodb Using Mongoose ---------------------------------------------------------->
mongoose.connect("mongodb://localhost/crm",()=>{
    console.log("Connection With Mongodb Has Been Successfull");
});

// Defining The Schema For The Company Collection ------------------------------------------------------>
const companySchema=new mongoose.Schema({
    name:{
       type:String,
       required:true,
       index:true,
       unique:true
    },
    companyName:{
  
        type:String,
        required:true,
       
    },
    email:{
        type:String,
        required:true,
        index:true,
        unique:true,
        validate:(value)=>{
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email")
            }
        }
    },
    number:{
      type:Number,
        required:true,
        index:true,
        unique:true,
        validate:(value)=>{
            let stringValue=value.toString();
            if(!validator.isLength(stringValue,{min:10,max:10})){
              throw new Error("Invalid Number");
            }
        }
    },
    password:{

        type:String,
        required:true,
        
    },
    role:{
type:String,
default:"Super-Admin"
    },
    companyId:{
  type:Number,
    },
    superAdminId:{
      type:String,
    },
    createdAt:{
        type:Date,
        default:()=> Date.now(),
        immutable:true
    },
   
});
/// Genarating The Token Before Login ------------------------------------------------------------------>

companySchema.methods=generateToken=async function(obj){
     const token= jwt.sign({id:obj._id},secretKey,{expiresIn:"2h"});
     return token;
}
/// Hasing The Password Before Storing In The Database ------------------------------------------------->
companySchema.pre("save",async function(next){
    if(this.isModified("password")){
        this.password=await bcrypt.hash(this.password,8);
    };
    next();
})


// Exporting The CompanyCollection ---------------------------------------------------------------------->
module.exports=mongoose.model("companydetails",companySchema)