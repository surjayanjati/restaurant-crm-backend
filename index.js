// Requiring The Framework/Pakage/Modules ----------------------------------------------->
const express=require("express");
const cookie=require("cookie-parser");





// Using The Express -------------------------------------------------------------------->
const app=express();


// Middleware --------------------------------------------------------------------------->
app.use(express.json()); //: -> So The Application Can accept Json Data//
app.use(cookie());       //: -> So That The Applicaiton Can use Cookie //

// Requiring The Routes From The Route Folder ------------------------------------------->
require("./routes/AdminSignupRoutes")(app) // :-> Signup - Page Route  //
require("./routes/adminPanelLoginRoutes")(app)  // :-> Login -Admin Panel Route //
require("./routes/superAdminCurdRoutes")(app)// :-> Super -Admin Curd with Admin Route //

// Listening on The Port Number---------------------------------------------------------->
app.listen(4567,()=>{
    console.log("Listening To Port Number 4567");
})