const express = require("express");
const router = express.Router();

const { getAllUsers, createUser, loginUser, getOneUser, deleteUser, updateUser} = require("../controllers/user.controller");
// const verifyJWT = require("../middleware/auth");

router.get("/all", getAllUsers, );
router.get("/details/:id", getOneUser);
router.post("/register", createUser);
router.post("/login/", loginUser);
router.patch("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);

module.exports = router;


