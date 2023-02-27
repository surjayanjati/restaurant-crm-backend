/// Requiring The superAdminCurdController From Controller ------------------------------------------------------------>
const superAdminCurdController=require("../controller/superAdminCurdController");
/// Middleware For Checking The Authentication ------------------------------------------------------------------------>
const roleCheckAuth=require("../middleware/roleCheckAuth");




// Routes For SuperAdmin When he wants to create,fetch,delete,update employees----------------------------------------->
module.exports=(app)=>{

    // Route When Super -Admin wants to create new Admin/employee_____________________/
    app.post("/crm/api/v1/adminpanel/companies/createadmin",roleCheckAuth.tokenCheck,roleCheckAuth.roleCheck,superAdminCurdController.superAdminCreatingAdmin); 
    
    //Route When Super - Admin wants to Delete an employee/Admin______________________/
    app.delete("/crm/api/v1/adminpanel/companies/deleteadmins",roleCheckAuth.tokenCheck,roleCheckAuth.roleCheck,superAdminCurdController.superAdminDeletingAdmin);

    // Route When Super - Admin wants to Update an Employee/Admin_____________________/
    app.put("/crm/api/v1/adminpanel/companies/updateadmins",roleCheckAuth.tokenCheck,roleCheckAuth.roleCheck,superAdminCurdController.superAdminUpdatingAdmin);

    // Route When Super/Admin wants to Fetch User Details____________________/
    app.get("/crm/api/v1/adminpanel/companies/fetchadmins",roleCheckAuth.tokenCheck,roleCheckAuth.roleCheck,superAdminCurdController.FetchingUserDetails);
}