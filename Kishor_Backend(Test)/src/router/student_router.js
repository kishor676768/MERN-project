const express=require("express")

const { student_data, student_dataGet } = require("../controller/student_controller");

const formsRouter=express.Router();

formsRouter.post("/studentpost", student_data);
formsRouter.get("/studentget", student_dataGet);



module.exports = formsRouter;
