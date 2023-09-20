const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./config/database");
const userRouter = require("./routes/user.route");
const itemRouter = require("./routes/item.route");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// home route
app.get("/", (req, res) => {
  res.send("<h1> Hello, Welcome to Express Js Server 5000 Port! </h1>");
});

app.use("/user", userRouter);
app.use("/item", itemRouter);

//resource not found
app.use((req, res, next) => {
  res.status(404).json({
    message: "route not found",
  });
});

//server error
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`);
});
