const express = require("express");
const router = express.Router();

const { getAllItem, getOneItem, createItem,  updateItem, deleteItem } = require("../controllers/item.controller");
// const verifyJWT = require("../middleware/auth");

router.get("/allItem", getAllItem, );
router.get("/:id", getOneItem);
router.post("/add", createItem);
router.patch("/update/:id", updateItem);
router.delete("/:id", deleteItem);

module.exports = router;

