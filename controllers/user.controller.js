const { ObjectId } = require("mongodb");
const { v4: uuidv4 } = require("uuid");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

 const saltRounds = 10;

 const createUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("User already exists");
    bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: hash,
      });
      await newUser
        .save()
        .then((user) => {
          const payload = {
            id: user._id,
            name: user.name,
            email: user.email,
          };
        
          const token = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: "2d",
          });

          res.send({
            success: true,
            message: "User is created Successfully",
            user: {
              id: user._id,
              name: user.name,
              email: user.email,
              token: "Bearer " + token
            },
          });
        })
        .catch((error) => {
          res.send({
            success: false,
            message: "User is not created",
            error: error,
          });
        });
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};


// // GET LOGIN POST API  ==================

const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(401).send({
      success: false,
      message: "User is not found",
    });
  }

  if (!bcrypt.compareSync(req.body.password, user.password)) {
    return res.status(401).send({
      success: false,
      message: "Incorrect password",
    });
  }

  const payload = {
    id: user._id,
    name: user.name,
    email: user.email,
  };

  const token = jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: "2d",
  });

  return res.status(200).send({
    success: true,
    message: "User is logged in successfully",
    token: "Bearer " + token,
  });
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
        email: data.email,
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
    const query = { _id: new ObjectId(id)};
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


