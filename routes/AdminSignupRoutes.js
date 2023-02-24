/// Requiring The AdminSignupController From Controller ---------------------------------------------->
const AdminSignupController=require("../controller/AdminSignupController");





/// Routes For Singup Page -------------------------------------------------------------------------->
module.exports=(app)=>{

   // Route For Singup Page Post Request______________________/
   app.post("/crm/api/v1/companies/signupusers",AdminSignupController.adminSignupPostRequest);

}