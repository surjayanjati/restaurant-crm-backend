/// Requiring The company Collection From The MODEL ------------------------------------------------------------>
const CompanyCollection = require("../model/CompanyModel");

/// Controller When SuperAdmin Wants to create New Admin/Employee ----------------------------------------------->
exports.superAdminCreatingAdmin = async (req, res) => {
  try {
    // Objec Destructuring For Getting Values From req Body and middleware__________________/
    const { id, role, companyId, companyName } = req.details;
    if (role === "Super-Admin") {
      // Getting Values From The req Body ____________________________________________________/
      const {
        employeeName,
        employeeEmail,
        employeeNumber,
        employeePassword,
        employeeId,
      } = req.body;

      /// Saving The Data inside The Collection ______________________________________________/
      const newEmployeeData = CompanyCollection({
        name: employeeName,
        companyName: companyName,
        email: employeeEmail,
        number: employeeNumber,
        password: employeePassword,
        role: "Admin",
        companyId: companyId,
        superAdminId: id,
        employeeId: employeeId,
      });

      const saveResult = await newEmployeeData.save();
      if (saveResult !== null) {
        res.send({
          msg: "New Admin Has Created",
          success: true,
          status: 200,
          role: "Admin",
        });
      } else
        res.send({
          msg: "Unable To Create New Employee",
          success: false,
          status: 500,
        });
    } else
      res.send({
        msg: "Only SuperAdmin Have The Access",
        success: false,
        status: 406,
      });
  } catch (err) {
    // In The Case When same value is getting inserted____________________________________/
    if (err.code === 11000) {
      const duplicateKey = ["name", "email", "number"];
      let msgVariable = duplicateKey.filter((elem) => {
        if (err.message.search(elem) !== -1) return elem;
      });
      res.send({
        msg: `${msgVariable} Already Exists`,
        success: false,
        status: 400,
      });
    } else if (err.name === "ValidationError") {
      let msgVariable = err.message.slice(41);
      res.send({ msg: `${msgVariable}`, success: false, status: 400 });
    } else
      res.send({
        msg: "Unabel To Create New Employee",
        success: false,
        status: 500,
      });
  }
};

/// Controller For Super-Admin so he can delete The Admin he wants to -------------------------------------------------------->
exports.superAdminDeletingAdmin = async (req, res) => {
  try {
    // Object Destructuring For Geeting Values From middleware____________________________/
    const { id, role } = req.details;
    if (role === "Super-Admin") {
      const adminId = req.body.employeeId;
      if (adminId !== "") {
        // Deleting The Admin with superAdmin Id and it's own Id_______________________________/
        const deleteResult = await CompanyCollection.deleteOne({
          superAdminId: id,
          employeeId: adminId,
        });
        if (deleteResult.acknowledged === true) {
          res.send({
            msg: "Employee Has Been Deleted",
            status: 201,
            success: true,
          });
        } else
          res.send({
            msg: "Unable To Delete The Employee",
            success: false,
            status: 500,
          });
      } else
        res.send({
          msg: "Unable To Delete The Employee",
          success: false,
          status: 500,
        });
    } else
      res.send({
        msg: "Only Super-Admin Has The Access",
        success: false,
        status: 406,
      });
  } catch (error) {
    res.send({
      msg: "Unable To Delete The Employee",
      success: false,
      status: 500,
    });
  }
};

/// Controller For Super Admin When he wants to Update The Employee/Admin ------------------------------------------------------>
exports.superAdminUpdatingAdmin = async (req, res) => {
  try {
    // Object Destructuring For Getting The Values From The Middleware_________________________________/
    const { id, role, companyId } = req.details;
    switch (role) {
      case "Super-Admin":
        // Getting The Values which will be Updated________________________________________________________/
        const {
          employeeName,
          employeeEmail,
          employeeNumber,
          employeePassword,
          employeeId,
        } = req.body;

        if (
          employeeName !== "" &&
          employeeEmail !== "" &&
          employeeNumber !== "" &&
          employeePassword !== "" &&
          employeeId !== ""
        ) {
          // Function For Hashing The Password Before Saving_________________________________________________/
          const hashPassword = await updatePasswordHashing(employeePassword);
          // Updating The Data in The Collection_____________________________________________________________/
          const updateResult = await CompanyCollection.updateOne(
            { adminId: id, employeeId: employeeId },
            {
              $set: {
                name: employeeName,
                email: employeeEmail,
                number: employeeNumber,
                password: hashPassword,
              },
            }
          );
          switch (updateResult.acknowledged) {
            case true:
              res.send({
                msg: "Employee Data Has Been Updated",
                status: 201,
                success: true,
              });
              break;

            case false:
              res.send({
                msg: "Unable To Update",
                status: 500,
                success: false,
              });

              break;
          }
        } else
          res.send({
            msg: "Kindly Fill All The Details",
            success: false,
            status: 400,
          });
        break;
      // In The Case If The User is Admin___________________________________________________________________/
      case "Admin":
        res.send({
          msg: "Only Super-Admin Has The Access",
          success: false,
          status: 406,
        });
        break;

      default:
        res.send({
          msg: "Only Super-Admin Has The Access",
          success: false,
          status: 406,
        });
    }
  } catch (err) {
    if ((err.name = "ValidationError")) {
      let msgVariable = err.message.slice(41);
      res.send({ msg: `${msgVariable}`, success: false, status: 400 });
    } else {
      res.send({ msg: "Unable To Update", status: 500, success: false });
    }
  }
};
/// Controller When Super Admin Needs To Fetch All its Users--------------------------------------------------------->
exports.FetchingUserDetails=async(req,res)=>{
     try {
      // Object Destructuring For Getting The Values From The middleware_________________________/
      const{id,role,companyName,companyId}=req.details;
      switch (role) {
        case "Super-Admin":
      // Fetching The Details From The Company Collection using The Id of The Admin_______________/
      const fetchResultForSuperAdmin=await CompanyCollection.find({adminId:id,role:"Admin"});
      if(fetchResultForSuperAdmin.length!==0){
       res.send({msg:"Data Fetching Successfull",success:true,status:200,role:role,dataArray:fetchResultForSuperAdmin});
      }else res.send({msg:"No User is There Yet",success:false,status:204});
          break;
      // In The Case When Requested User is Admin ________________________________________________/    
        case "Admin":
      const fetchResultForAdmin=await CompanyCollection.find({_id:id});
      if(fetchResultForAdmin.length!==0){
        res.send({msg:"Data Fetching Successfull",success:true,status:200,role:role,dataArray:fetchResultForAdmin});
      }else res.send({msg:"No User is There Yet",success:false,status:204});
        break;
        }
     } catch (error) {
      res.send({msg:"Unable To Show The Details",success:false,status:500});
     }
}