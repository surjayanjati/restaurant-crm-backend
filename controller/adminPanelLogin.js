// Requiring The Company Collection From Model ------------------------------------------------------------------------------>
const CompanyCollection = require("../model/CompanyModel");
// Requiring The Module/Pakeges --------------------------------------------------------------------------------------------->
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");







/// Controller When Super-Admin or Admin Trying to Login with Post Request--------------------------------------------------->
exports.adminPanelLogin=async(req,res)=>{
    try {
        // Object Destructuring For Collecting The Data From req body __________________/
        const {email,password}=req.body;
        if(email!=="" && password!==""){
        // In The Case When email and password has given by user________________________/
        const searchResultObject=await CompanyCollection.findOne({email:email});
        if(searchResultObject!==null){
        // Matching The Password by using Bcrypt _______________________________________/
        const passwordMatchCheck=await bcrypt.compare(password,searchResultObject.password);
        if(passwordMatchCheck===true){
        const token=await generateToken(searchResultObject);
        if(token){
            res.cookie("loginCookie",token,{expires:new Date(Date.now()+3000000)});
            res.send({msg:"Login Successfull",success:true,status:200,role:searchResultObject.role,token:token});
        }else res.send({msg:"Unable To Login",success:false,status:500});
        }else res.send({msg:"Kindly Check Your Password",success:false,status:403});
        }else res.send({msg:"No User Found,Kindly Signup Before Login",success:false,status:204});
        }else res.send({msg:"Kindly Fill All The Details",success:false,status:400})
    } catch (error) {
res.send({msg:"Unable To Login",success:false,status:500});
    }
}