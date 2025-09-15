const express = require("express");
const Registration = require("../model/student_model");

const { contactMail } = require("../utils/Mail");

const student_data = async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;
    const Form = new Registration({
      name: name,
      email: email,
      phone: phone,
      address: address,
      course: req.body.course, 
    });
    await Form.save();
    res.status(200).json({
      Registration,
      message: "User data saved successfully",
    });
    try {
      await contactMail(Form);
      console.log("Emails sent successfully");
    } catch (err) {
      console.log("Error in sending emails", err);
    }
  } catch (err) {
    console.log("Error in posting the data", err);
  }
};
const student_dataGet = async (req, res) => {
  try { 
    const Student = await Registration.find();
    res.status(200).json({
      Student,
      message: "User data fetched successfully",
    });
  } catch (err) {
    console.log("Error in fetching the data", err); 
  }
};



module.exports = {
  student_data,
  student_dataGet,
  
};
