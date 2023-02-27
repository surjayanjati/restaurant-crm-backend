/// Requiring The Collection From The Model -------------------------------------------------------------------------->
const foodCollections=require("../model/FoodModel");




/// Controller For The Super-Admin/Admin So They can Add Foods ------------------------------------------------------->
exports.addFoodItem=async(req,res)=>{
    try {
    // Object Destrcturing For Getting values from middleware_________________________/
    const {role,companyId,companyName,companyEmail}=req.details;
    if(role==="Super-Admin" || role==="Admin"){
    // Object Destrcuring Getting The Values From The Req Body________________________/
    const {foodName,foodId,foodPrice}=req.body;    
    if(foodName!=="" && foodId!=="" && foodPrice!==""){
     // Finding Whether The Same Company Already Exists or Not in the Food Group_______/
     const findFoodObject=await foodCollections.findOne({companyId:companyId});
     if(findFoodObject===null){
         const foodDocumentData=foodCollections({
             companyName:companyName,
             companyEmail:companyEmail,
             companyId:companyId,
             foodsArray:[{
                 foodName:foodName,
                 foodId:foodId,
                 foodPrice:foodPrice
             }]
         });
         const saveResult=await foodDocumentData.save();
         if(saveResult!==null){
            res.send({msg:"The New Food Has Been Added",success:true,status:200});
         }else res.send({msg:"Unable To The New Food",success:false,status:500});
     }else{
        const pushResult=await foodCollections.updateOne({companyId:companyId},{$push:{foodsArray:{foodName:foodName,foodId:foodId,foodPrice:foodPrice}}});
        if(pushResult.acknowledged===true){
          res.send({msg:"The New Food Has Been Added",success:true,status:200});
        }else res.send({msg:"Unable To The New Food",success:false,status:500});
     }
    }else res.send({msg:"Kindly Fill All The Details",success:false,status:400});
   
    }else res.send({msg:"You Don't Have The Access To This",success:false,status:401});    
    } catch (error) {
        
    }   
};

/// Controller For Super-Admin/Admin So They Can Delete The Food---------------------------------------------------------------->
