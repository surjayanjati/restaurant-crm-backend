// Requiring The Framework/Pakage/Modules ----------------------------------------------->
const express=require("express");






// Using The Express -------------------------------------------------------------------->
const app=express();


// Middleware --------------------------------------------------------------------------->
app.use(express.json()); //: -> So The Application Can accept Json Data//




// Listening on The Port Number---------------------------------------------------------->
app.listen(4567,()=>{
    console.log("Listening To Port Number 4567");
})