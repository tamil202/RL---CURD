// import requirements
const express = require("express");
const cors = require("cors");
const OTP = require("./model/OTP");
const mongoose = require("mongoose");
const User = require("./model/dbs");
const bodyPaser = require("body-parser");
const userData = require("./model/userDetails");
// swapping
const app = express();
const port = 3000;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: { origin: "*" } }));
app.use(bodyPaser.json());

// routes
app.use(require("./routes/router"));
// --------
const nodemailer = require("nodemailer");
// Generate OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000);
}

// Configure nodemailer
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "test131.api@gmail.com",
    pass: "fcpv dfhh svbq xkur",
  },
});

// Express route to send OTP
app.post("/optverifiy", async (req, res) => {
  const email = req.body.email;
  console.log(email);
  const finduser = await User.findOne({ email: email });
  if (finduser) {
    const otp = generateOTP();
    const mailOptions = {
      from: "test131.api@gmail.com",
      to: email,
      subject: "OTP Verification",
      text: `Your OTP is: ${otp}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error, "error 1");
        return res.status(200).json({ message: "failed to send otp" });
      } else {
        console.log("Email sent: " + info.response);
        let obj = {
          messageId: info.response,
          email: email,
          otp,
        };
        OTP.insertMany([obj]);
        return res.status(200).json({ message: "OTP sent successfully" });
      }
    });
  } else {
    return res.status(200).json({ message: "user not found", optbox: true });
  }
});

// verifiy otp
app.post("/verifyotp", async (req, res) => {
  let otp = req.body.otp;
  let email = req.body.email;
  try {
    const finduser = await OTP.findOne({ otp });
    if (finduser) {
      if (finduser.email === email && finduser.otp === otp) {
        setTimeout(async () => {
          await OTP.deleteMany({ otp });
        }, 180000);
        return res
          .status(200)
          .json({ boo: true, message: "OTP verified successfully" });
      }
    } else {
      return res.status(200).json({ boo: false, message: "Invaild OTP" });
    }
  } catch (error) {
    console.error(error);
  }
});

// delete user
app.post("/deleteuser", async (req, res) => {
  let obj = {
    id: req.body.id,
  };
  console.log("id---------------------------------------", obj.id);
  try {
    finduser = await userData.findOne({ id: obj.id });
    if (finduser) {
      await userData.deleteOne(finduser);
    }
  } catch (e) {
    console.error(e.message + " ererwwwwwwwwerrrrrrrrrrrrrrrrrrrrrrrrrrrr");
  }
});

// -----------------
// db connect
let uri = "mongodb+srv://fury:mnm@cluster0.6lai5xn.mongodb.net/RL-CURD";
// listen
app.listen(port, () => {
  mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log(
        ".................................................database connected......................................."
      );
    })
    .catch((e) => console.error(e));
  console.log(`server start from localhost:${port}`);
});
