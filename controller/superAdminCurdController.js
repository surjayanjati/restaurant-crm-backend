/// Requiring The company Collection From The MODEL ------------------------------------------------------------>
const CompanyCollection=require("../model/CompanyModel");




/// Controller When SuperAdmin Wants to create New Admin/Employee ----------------------------------------------->
exports.superAdminCreatingAdmin=async(req,res)=>{
    try {
        // Objec Destructuring For Getting Values From req Body and middleware__________________/
        const {id,role,companyId,companyName}=req.details;
        if(role==="Super-Admin"){
        // Getting Values From The req Body ____________________________________________________/
        const{employeeName,employeeEmail,employeeNumber,employeePassword}=req.body;
        console.log(req.body);
        /// Saving The Data inside The Collection ______________________________________________/
        const newEmployeeData=CompanyCollection({
            name:employeeName,
            companyName:companyName,
            email:employeeEmail,
            number:employeeNumber,
            password:employeePassword,
            role:"Admin",
            companyId:companyId,
            superAdminId:id
        });
    
        const saveResult=await newEmployeeData.save();
        console.log(saveResult);
        }else res.send({msg:"Only SuperAdmin Have The Access",success:false,status:406});
    } catch (error) {
        res.send({msg:"Unable To Create New Employee",success:false,status:500,err:error});
    }
}