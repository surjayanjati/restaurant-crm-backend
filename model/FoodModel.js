/// Requiring The Module/Pakages ----------------------------------------------------------------------------------------->
const mongoose=require("mongoose");




/// Connecting To The Mongodb Database ----------------------------------------------------------------------------------->
mongoose.connect("mongodb://localhost/crm",()=>{
  console.log("Connection To The Database Has Been Successfull");
});


/// Defining The Schema For The Food Collection ------------------------------------------------------------------------->
const foodSchema=new mongoose.Schema({
    companyName:{
        type:String,
        required:true,
        index:true,
        unique:true
    },
    companyEmail:{
        type:String,
        required:true,
        index:true,
        unique:true
    },
    companyId:{
        type:Number
    },
    foodsArray:[{
        foodName:{
            type:String
        },
        foodId:{
            type:Number
        },
        foodPrice:{
            type:Number
        }
    }]
});

/// Exporting The FoodCollections -------------------------------------------------------------------------->
module.exports=mongoose.model("foodsCollections",foodSchema);