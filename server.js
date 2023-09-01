const express = require("express");
const app = express();
const mongoose = require("mongoose");
const router = require("./src/routes");
require("dotenv").config();
const cors = require("cors");

//Midellwares

app.use(express.json({ urlencoded: true }));
app.use(cors());

mongoose
  .connect("mongodb://localhost:27017/summerShop")
  .then(() => console.log("Connected to MongoDb"))
  .catch((err) => {
    console.log("Cant Connected To MongoDb");
  });

app.use("/api", router);

app.listen(5000, () => console.log("server is running on port 5000 ..."));
