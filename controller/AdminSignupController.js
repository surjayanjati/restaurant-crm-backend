// Requiring The Company Collection From Model ------------------------------------------------------------------------------>
const CompanyCollection = require("../model/CompanyModel");

// Controller For The Case When The Admin is Signin / Creating The Company -------------------------------------------------->
exports.adminSignupPostRequest = async (req, res) => {
  try {
    
    // Object Destrcuring For Getting The values From Req Body ________________________________/
    const {
      name,
      companyName,
      email,
      number,
      password,
      companyId,
    } = req.body;
    if (
      name !== "" &&
      companyName !== "" &&
      email !== ""  && number !== "" &&
      password !== "" &&
      companyId !== ""
    ) {
      // Storing The Values in The Collection with The Schema   ________________________________/
      const newCompanyDocument =  CompanyCollection({
        name: name,
        companyName: companyName,
        email: email,
        number: number,
        password: password,
        companyId: companyId,
      });
      const saveResult = await newCompanyDocument.save();
      if (saveResult !== null) {
        // In The Case When The Data Has Been Saved in The Collection______________________________/
        res.send({ msg: "Signup Successfull", success: true, status: 200 });
      } else
        res.send({ msg: "Singup Unsuccessfull", success: false, status: 500 });
    } else
      res.send({
        msg: "Kindly Give All The Details",
        success: false,
        status: 400,
      });
  } catch (err) {
    // In The Case When any Value is already there in The Database________________________________/
    if (err.code === 11000) {
      let valueArray = [
        "name",
        "companyName",
        "email",
        "number",
      ];
      valueArray.filter((elem) => {
        if (err.message.search(elem) !== -1) {
          res.send({
            msg: `${elem} Already Exists`,
            success: false,
            status: 400,
          });
        }
      });
      // In The Case When Email or Number is incorrect___________________________________________/
    } else if (err.name === "ValidationError") {
      console.log(err.message);
      let finalMsg = err.message.slice(41);
     
      res.send({ msg: finalMsg, success: false, status: 400 });
    } else {
      res.send({ msg: "Singup Unsuccessfull", success: false, status: 500 });
    }
  }
};
