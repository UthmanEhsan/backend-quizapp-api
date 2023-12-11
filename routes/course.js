import { Router } from "express";
import Course from "../models/course.js";

const router = Router();

router.post("/course", async (req, res) => {
  try {
    const { name } = req.body;
    const course = await Course.create({
      name,
    });
    res.status(200).send({ msg: "success", course });
  } catch (err) {
    res.status(400).send({err})
  }
});
router.get("/course", async (req, res) => {
    try {
      const allcourse = await Course.find();
      res.status(200).send({ msg: "success", allcourse });
    } catch (err) {
      res.status(400).send({ err });
    }
  });
export default router;
