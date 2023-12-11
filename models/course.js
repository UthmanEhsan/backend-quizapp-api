import { Schema,model } from "mongoose";

const courseSchema = Schema({
    name:{
        type:String,
        required:true,
    },

},{timestamps: true})

const Course = model("course",courseSchema);

export default Course