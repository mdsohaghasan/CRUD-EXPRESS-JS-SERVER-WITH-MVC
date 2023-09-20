const { ObjectId } = require("mongodb");
const { v4: uuidv4 } = require("uuid");
const Item = require("../models/item.model");

// GET ALL USER API  ==================
const getAllItem = async (req, res) => {
  try {
    const item = await Item.find();
    res.status(200).json(item);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// GET ONE USER API  ==================
const getOneItem = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const query = { _id: new ObjectId(id) };
    const result = await Item.findOne(query);
    if (result) {
      res.status(200).send(result);
    } else {
      res.status(404).send({ message: "Item Not Found" });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// GET REGISTER POST API  ==================
const createItem = async (req, res) => {
  try {
    const newItem = new Item({
      id: uuidv4(),
      name: req.body.name,
      category: req.body.category,
    });
    await newItem.save();
    return res.status(201).json(newItem);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// GET UPDATE API  ==================
const updateItem = async (req, res) => {
  try {
    const data = req.body;
    const id = req.params.id;
    const filter = { _id: new ObjectId(id) };
    const options = { upsert: true };
    const updateDoc = {
      $set: {
        name: data.name,
        category: data.category,
      },
    };
    const result = await Item.updateOne(filter, updateDoc, options);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// const updateItem = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const query = { _id: new ObjectId(id) };
//     const item = await Item.findOne(query);
//     item.name = req.body.name;
//     item.category = req.body.category;
//     await Item.save();
//     res.status(200).json(item);
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// };

// GET DELETE API  ==================
const deleteItem = async (req, res) => {
  try {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    await Item.deleteOne(query);
    res.status(200).json({ message: "Item is Deleted" });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { getAllItem, getOneItem, createItem, updateItem, deleteItem };
