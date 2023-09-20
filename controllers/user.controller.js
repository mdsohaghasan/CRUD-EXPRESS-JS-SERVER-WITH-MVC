const { ObjectId } = require("mongodb");
const { v4: uuidv4 } = require("uuid");
const User = require("../models/user.model");

// GET ALL USER API  ==================
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// GET ONE USER API  ==================
const getOneUser = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const query = { _id: new ObjectId(id) };
    const result = await User.findOne(query);
    if (result) {
      res.status(200).send(result);
    } else {
      res.status(404).send({ message: "User Not Found" });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// GET REGISTER POST API  ==================
const createUser = async (req, res) => {
  try {
    const newUser = new User({
      id: uuidv4(),
      name: req.body.name,
      password: req.body.password,
    });
    await newUser.save();
    return res.status(201).json(newUser);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// GET LOGIN POST API  ==================
const loginUser = async (req, res) => {
  try {
    const newUser = new User({
      id: uuidv4(),
      name: req.body.name,
      password: req.body.password,
    });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// GET UPDATE API  ==================
const updateUser = async (req, res) => {
  try {
    const data = req.body;
    const id = req.params.id;
    const filter = { _id: new ObjectId(id) };
    const options = { upsert: true };
    const updateDoc = {
      $set: {
        name: data.name,
        password: data.password,
      },
    };
    const result = await User.updateOne(filter, updateDoc, options);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// const updateUser = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const query = { _id: new ObjectId(id) };
//     const user = await User.findOne(query);
//     user.name = req.body.name;
//     user.password = req.body.password;
//     await user.save();
//     res.status(200).json(user);
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// };

// GET DELETE API  ==================
const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    await User.deleteOne(query);
    res.status(200).json({ message: "user is deleted" });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  getAllUsers,
  getOneUser,
  createUser,
  loginUser,
  updateUser,
  deleteUser,
};
