/// Requiring The superAdminCurdController From Controller ------------------------------------------------------------>
const superAdminCurdController=require("../controller/superAdminCurdController");
/// Middleware For Checking The Authentication ------------------------------------------------------------------------>
const roleCheckAuth=require("../middleware/roleCheckAuth");




// Routes For SuperAdmin When he wants to create,fetch,delete,update employees----------------------------------------->
module.exports=(app)=>{

    // Route When Super -Admin wants to create new Admin/employee_____________________/
    app.post("/crm/api/v1/adminpanel/companies/createadmin",roleCheckAuth.tokenCheck,roleCheckAuth.roleCheck,superAdminCurdController.superAdminCreatingAdmin); 

}