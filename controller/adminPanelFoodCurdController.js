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
        res.send({msg:"Unable To The New Food",success:false,status:500});
    }   
};

/// Controller For Super-Admin/Admin So They Can Delete The Food---------------------------------------------------------------->
exports.deleteFoodItem=async(req,res)=>{
    try {
        // Object Destrcturing For Getting values from middleware_________________________/
        const {role,companyId,companyName,companyEmail}=req.details;
        if(role==="Super-Admin" || role==="Admin"){
        // Object Destrcuring Getting The Values From The Req Body________________________/
        const foodId=req.body.foodId;    
        if( foodId!==""){
        const deleteResult=await foodCollections.updateOne({companyId:companyId},{$pull:{foodsArray:{foodId:foodId}}});
        if(deleteResult.acknowledged===true){
        res.send({msg:"Food Item Has Been Deleted",success:true,status:200});
        }else res.send({msg:"Unable To Delete The Food",success:false,status:500}); 
        }else res.send({msg:"Unable To Delete The Food",success:false,status:500}); 
       
        }else res.send({msg:"You Don't Have The Access To This",success:false,status:401});    
        } catch (error) {
            res.send({msg:"Unable To The New Food",success:false,status:500});
        }   
};

/// Controller For Super-Admin/Admin so They Can Update The Food Price ---------------------------------------------------------------->
exports.updateFoodPrice=async(req,res)=>{
    try {
        // Object Destrcturing For Getting values from middleware_________________________/
        const {role,companyId,companyName,companyEmail}=req.details;
        if(role==="Super-Admin" || role==="Admin"){
        // Object Destrcuring Getting The Values From The Req Body________________________/
        const {foodId,foodPrice}=req.body;    
        if( foodId!==""  && foodPrice!==""){
        const deleteResult=await foodCollections.updateOne({companyId:companyId,"foodsArray.foodId":foodId},{$set:{"foodsArray.$.foodPrice":foodPrice}});
        if(deleteResult.acknowledged===true){
        res.send({msg:"Food Item Price Has Been Updated",success:true,status:200});
        }else res.send({msg:"Unable To Update The Food Price",success:false,status:500}); 
        }else res.send({msg:"Kindly Put All The Details",success:false,status:500}); 
       
        }else res.send({msg:"You Don't Have The Access To This",success:false,status:401});    
        } catch (error) {
            res.send({msg:"Unable To Update The Food Price",success:false,status:500});
        }   
};

/// Controller For Super-Admin/Admin When They want To Search The Name on Search Bar-------------------------------------------------->
exports.searchFoodItem=async(req,res)=>{
    try {
        // Object Destrcturing For Getting values from middleware_________________________/
        const {role,companyId,companyName,companyEmail}=req.details;
        if(role==="Super-Admin" || role==="Admin"){
        // Object Destrcuring Getting The Values From The Req Body________________________/
        const foodName=req.body.foodName;    
        if( foodName!==""){
        const searchResult=await foodCollections.findOne({companyId:companyId,"foodsArray.foodName":foodName});
        if(searchResult!==null){
        res.send({msg:"Food Item Price Has Been Updated",success:true,status:200,data:searchResult});
        }else res.send({msg:"No Food Item Found",success:false,status:400}); 
        }else res.send({msg:"Kindly Enter The Food Name",success:false,status:500}); 
       
        }else res.send({msg:"You Don't Have The Access To This",success:false,status:401});    
        } catch (error) {
            res.send({msg:"No Food Item Found",success:false,status:500});
        }   
};


/// Controller For Super-Admin/Admin When They want To Fetch All The Food Details ----------------------------------------------------->
exports.fetchFoodItem=async(req,res)=>{
    try {
        // Object Destrcturing For Getting values from middleware_________________________/
        const {role,companyId,companyName,companyEmail}=req.details;
        if(role==="Super-Admin" || role==="Admin"){
     
       
        const searchResult=await foodCollections.findOne({companyId:companyId});
        if(searchResult!==null){
        res.send({msg:"Food Items Fetching Successfull",success:true,status:200,data:searchResult});
        }else res.send({msg:"No Data Found",success:false,status:400}); 
      
       
        }else res.send({msg:"You Don't Have The Access To This",success:false,status:401});    
        } catch (error) {
            res.send({msg:"No Data Found",success:false,status:500});
        }   
}
