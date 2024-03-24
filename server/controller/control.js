// open page response
const bcrypt = require("bcrypt");
const User = require("../model/dbs");
const userData = require("../model/userDetails");
const router = require("../routes/router");
// openPageResponse
module.exports.OpenPageRes = (req, res) => {
  res.status(200).json({ message: "from server" });
};
// user create
module.exports.register = async (req, res) => {
  let userRegisterDataObj = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  };
  try {
    const finduser = await User.findOne({ email: userRegisterDataObj.email });
    if (finduser) {
      return res.status(200).json({ message: "User already exists" });
    } else {
      const hashedPassword = await bcrypt.hash(
        userRegisterDataObj.password,
        10
      );
      userRegisterDataObj.password = hashedPassword;
      await User.create(userRegisterDataObj);
      return res.status(201).json({ message: "User created successfully" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
// finduser
module.exports.finduser = async (req, res) => {
  const email = req.body.email;
  try {
    const finduser = await User.findOne({ email: email });
    if (finduser) {
      return res.status(200).json({ available: true });
    } else {
      return res.status(200).json({ available: false });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
// finduser again
module.exports.usernotfound = async (req, res) => {
  const email = req.body.email;
  try {
    const finduser = await User.findOne({ email: email });
    if (finduser) {
      return res.status(200).json({ available: true });
    } else {
      return res.status(200).json({ available: false });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
// login user
module.exports.loginuser = async (req, res) => {
  let userlogindata = {
    email: req.body.email,
    password: req.body.password,
  };
  try {
    const finduser = await User.findOne({ email: userlogindata.email });
    if (finduser) {
      const isPasswordMatch = await bcrypt.compare(
        userlogindata.password,
        finduser.password
      );
      if (isPasswordMatch) {
        return res.status(200).json({ message: "Login successful" });
      } else {
        return res.status(200).json({ message: "Invalid email or password" });
      }
    } else {
      return res.status(200).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// const nodemailer = require("nodemailer");
// module.exports.otpverifiy = (req, res) => {
//   // mail transport validation
//   //  create transpost
//   const transpost = nodemailer.createTestAccount({
//     host: "smtp.ethereal.email",
//     port: 587,
//     secure: true,
//     auth: {
//       user: "test131@gmail.com",
//       pass: "testapi1122",
//     },
//   });
//   const email = req.body.email;
//   const otp = Math.floor(100000 + Math.random() * 900000);
//   // Temporary storage for OTPs
//   const otpStorage = {};
//   otpStorage[email] = otp;

//   const mailOptions = {
//     from: "test131@gmail.com",
//     to: email,
//     subject: "OTP Verification",
//     text: `Your OTP is: ${otp}`,
//   };
//   nodemailer.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.log(error);
//       res.status(500).send("Failed to send OTP");
//     } else {
//       console.log("Email sent: " + info.response);
//       res.status(200).send("OTP sent successfully");
//     }
//   });
// };

// update password
module.exports.updatepass = async (req, res) => {
  let obj = {
    email: req.body.email,
    password: req.body.password,
  };
  console.log("-------------------------------", obj);
  try {
    const finduser = await User.findOne({ email: obj.email });
    if (finduser) {
      const hashedPassword = await bcrypt.hash(obj.password, 10);
      obj.password = hashedPassword;
      await User.updateMany(
        { email: obj.email },
        { $set: { password: obj.password } }
      );
      return res.status(201).json({ message: "Password updated successfully" });
    } else {
      return res.status(201).json({ message: "some thing went wrong" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// show lists
module.exports.showData = async (req, res) => {
  try {
    const allData = await userData.find({});
    return res.status(200).send(allData);
  } catch (e) {
    console.error(e);
  }
};

// add list and update
module.exports.dataAdd = async (req, res) => {
  // let obj = {
  //   id: Math.floor(10022 + Math.random(2) * 5000),
  //   firstname: req.body.firstname,
  //   lastname: req.body.lastname,
  //   age: req.body.age,
  //   mobile: req.body.mobile,
  //   profession: req.body.profession,
  //   email: req.body.email,
  //   address: req.body.address,
  //   boo: false,
  // };
  try {
    const dattaaa = new userData(req.body);
    await dattaaa.save();
    return res.status(200).json({ message: "Data Add Successfully" });
  } catch (e) {
    console.error(e, "something went wrong --------- in error 1");
  }
};

// // delete user
// module.exports.deletUser = async (req, res) => {};
