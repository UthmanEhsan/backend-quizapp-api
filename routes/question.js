import { Router } from "express";
import Question from "../models/question.js";
const router = Router();

router.post("/question", async (req, res) => {
  try {
    const { coursename, questionlist } = req.body;
    const createQuestion = await Question.create({
      coursename,
      questionlist,
    });
    res.status(200).send({ msg: "success", createQuestion });
  } catch (err) {
    res.status(400).send({ err });
  }
});

router.get("/question", async (req, res) => {
  try {
    const allquestion = await Question.find();
    res.status(200).send({ msg: "success", allquestion });
  } catch (err) {
    res.status(400).send({ err });
  }
});
export default router;
