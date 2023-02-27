/// Reuiring The Controller For adminPanelFoodCurd From The Controller------------------------------------------------------------>
const adminPanelfoodCurdController=require("../controller/adminPanelFoodCurdController");
/// Requiring The roleCheckAuth From The Middleware ------------------------------------------------------------------------------>
const roleCheckAuth=require("../middleware/roleCheckAuth");


/// Routes For The Admin Panel Food Curd ------------------------------------------------------------------------------------------>
module.exports=(app)=>{


    /// Route For Adding The Food__________________________________/
    app.post("/crm/api/v1/adminpanel/companies/addfood",roleCheckAuth.tokenCheck,roleCheckAuth.roleCheck,adminPanelfoodCurdController.addFoodItem);

}