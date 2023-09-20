const express = require("express");
const router = express.Router();

const { getAllUsers, createUser, loginUser, getOneUser, deleteUser, updateUser} = require("../controllers/user.controller");
// const verifyJWT = require("../middleware/auth");

router.get("/alluser", getAllUsers, );
router.get("/:id", getOneUser);
router.post("/register", createUser);
router.post("/login/", loginUser);
router.patch("/update/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;


