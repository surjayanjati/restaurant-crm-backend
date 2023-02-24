/// Requiring The Controller For adminPanel Login From The Controller------------------------------------------------->
const adminPanelController=require("../controller/adminPanelLogin");





/// Routes For Admin Panel Login Page -------------------------------------------------------------------------------->
module.exports=(app)=>{

 
    // Route For Admin Panel Page Post Request__________________________________/
    app.post("/crm/api/v1/companies/loginusers",adminPanelController.adminPanelLogin);

}