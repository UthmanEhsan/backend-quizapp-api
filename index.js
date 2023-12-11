import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import router from "./routes/course.js";
import question from "./routes/question.js";
import admin from "./routes/admin.js";
const app = express();
app.use(express.json())
app.use(cors())

mongoose.connect(process.env.URL).then(() => {
    console.log("connected successfully");
  
    app.listen(process.env.PORT || 8000, (err) => {
      if (err) console.log(err);
      console.log("runing successfully at", process.env.PORT);
    });
  });



app.use(router);
app.use(question);
app.use(admin);


