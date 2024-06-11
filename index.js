const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRouters = require("./routes/auth");
const postRouters = require("./routes/post");

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect("mongodb://localhost:27017/blog")
  .then(() => console.log("Database Established"))
  .catch((err) => console.log(err));

app.use("/auth/", authRouters);
app.use(postRouters);

app.listen(5000, () => console.log("Server is up and running"));
