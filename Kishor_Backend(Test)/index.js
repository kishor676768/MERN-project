const mongoose =  require("mongoose");
 const express = require("express");
 const http = require("http");
 require("dotenv").config();
 const app = require("./app");
 


const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("Error connecting to database:", error);
   }
 };

 connect()
 .then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
})
.catch((error) => {
   console.error("Error starting server:", error);
 });
