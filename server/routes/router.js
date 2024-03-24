const router = require("express").Router();
const controller = require("../controller/control");
const path = require("path");
const userData = require("../model/userDetails");

router.get("/", controller.OpenPageRes);
router.post("/register", controller.register);
router.post("/valid", controller.finduser);
router.post("/notfound", controller.usernotfound);
router.post("/loginuser", controller.loginuser);
router.put("/updatePassword", controller.updatepass);
router.get("/allUserList", controller.showData);
router.post("/dataAdd", controller.dataAdd);

module.exports = router;
