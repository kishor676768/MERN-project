const express = require("express");
const cors = require("cors");
const formRouter = require("./src/router/student_router.js");
const bodyParser = require("body-parser");
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/studentform", formRouter);
module.exports = app;
