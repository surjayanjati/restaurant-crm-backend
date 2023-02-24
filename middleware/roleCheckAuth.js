/// Requiring The Pakages and Modules ------------------------------------------------------------------------------->
const jwt=require("jsonwebtoken");
/// Requiring The Secret Key From The Config Folder ----------------------------------------------------------------->
const secretKey=require("../config/secretKey");
/// Requiring The Company Collection From The Model ----------------------------------------------------------------->
const CompanyCollection=require("../model/CompanyModel");


/// Function For Checking Whether The Token is exists and it has Some id in it or not--------------------------------->
function tokenCheck(req,res,next){
  try {
    const token=req.headers["access-token"];
    if(token!=="" && token!==undefined){
    jwt.verify(token,secretKey,(err,decode)=>{
     if(err){
        res.send({msg:"Kindly Authenticate Yourself",success:false,status:401});
     }else {
         req.userId=decode.id;
        
        next();
     }
    })
    }else res.send({msg:"Kindly Authenticate Yourself",success:false,status:401});
    
  } catch (error) {
    res.send({msg:"Kindly Authenticate Yourself",success:false,status:401});
  }
};

/// Middleware Function For Checking Whether The User is Super - Admin or Admin -------------------------------------->
async function roleCheck(req,res,next){
 try {
    
    // Getting The UserId From The Past Middleware________________________/
    const userId=req.userId;
    
    // Finding The Details of The User with userId________________________/
    const userDetailsObj=await CompanyCollection.findOne({_id:userId});
    
    if(userDetailsObj!==null){
     switch (userDetailsObj.role) {
       
        case "Super-Admin":
            console.log("hello");
            req.details=({id:userId,role:userDetailsObj.role,companyId:userDetailsObj.companyId,companyName:userDetailsObj.companyName});
            console.log("hi");
            next();
            break;
        case "Admin":
            req.details={id:userId,role:userDetailsObj.role};
            next();
             break
        default:res.send({msg:"Kindly Authenticate Yourself",success:false,status:401});
            break;
     }
    }else res.send({msg:"Kindly Authenticate Yourself",success:false,status:401});
 } catch (error) {
    res.send({msg:"Kindly Authenticate Yourself",success:false,status:401});
 }
}



module.exports={
    tokenCheck:tokenCheck,
    roleCheck:roleCheck
}