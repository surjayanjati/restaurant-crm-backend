/// Reuiring The Controller For adminPanelFoodCurd From The Controller------------------------------------------------------------>
const adminPanelfoodCurdController=require("../controller/adminPanelFoodCurdController");
/// Requiring The roleCheckAuth From The Middleware ------------------------------------------------------------------------------>
const roleCheckAuth=require("../middleware/roleCheckAuth");


/// Routes For The Admin Panel Food Curd ------------------------------------------------------------------------------------------>
module.exports=(app)=>{


    /// Route For Adding The Food_____________________________________________/
    app.post("/crm/api/v1/adminpanel/companies/addfoods",roleCheckAuth.tokenCheck,roleCheckAuth.roleCheck,adminPanelfoodCurdController.addFoodItem);
    
    /// Route For Deleting The Food__________________________________________/
    app.delete("/crm/api/v1/adminpanel/companies/deletefoods",roleCheckAuth.tokenCheck,roleCheckAuth.roleCheck,adminPanelfoodCurdController.deleteFoodItem);

    /// Route For Updating The Food Price__________________________________/
    app.put("/crm/api/v1/adminpanel/companies/updatefoodprices",roleCheckAuth.tokenCheck,roleCheckAuth.roleCheck,adminPanelfoodCurdController.updateFoodPrice);

    /// Route For Searching The Food Item_______________________________/
    app.get("/crm/api/v1/adminpanel/companies/searchfooditems",roleCheckAuth.tokenCheck,roleCheckAuth.roleCheck,adminPanelfoodCurdController.searchFoodItem);

    
    /// Route For Fetching The  Food Item_______________________________/
    app.get("/crm/api/v1/adminpanel/companies/fetchfooditems",roleCheckAuth.tokenCheck,roleCheckAuth.roleCheck,adminPanelfoodCurdController.fetchFoodItem);
}