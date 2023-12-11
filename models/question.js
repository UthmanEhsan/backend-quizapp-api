import { Schema, model } from "mongoose";

const questionSchema = Schema(
  {
    coursename: {
      type: String,
      required: true,
    },
    questionlist: [
      {
        questionnumber: Number,
        question: String,
        options: {},
        answer: [],
      },
    ],
  },
  { timestamps: true }
);

const Question = model("question", questionSchema);

export default Question;
