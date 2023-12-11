import { Router } from "express";
import Admin from "../models/admin.js";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import Joi from "joi";
const router = Router();

const adminSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const adminLoginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});
router.post("/admin", async (req, res) => {
  const pass = req.body.password;

  try {
    await adminSchema.validateAsync(req.body);
    const password = await bcrypt.hash(pass, 10);
    const { name, email } = req.body;
    const adminData = await Admin.create({
      name,
      email,
      password,
    });
    res.status(201).json(adminData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/admin/login", async (req, res) => {
  try {
    await adminLoginSchema.validateAsync(req.body);
    const user = await Admin.findOne({ email: req.body.email }).then((res) =>
      res.toObject()
    );
    if (!user) {
      return res.status(403).send({ err: "not match" });
    }
    const compare = await bcrypt.compare(req.body.password, user.password);
    if (!compare) {
      return res.status(403).send({ err: "not match" });
    }
    delete user.password;
    const token = Jwt.sign({ user }, `usmanbey`);
    const success = res.status(200).send({ msg: "success", user, token });
    return success;
  } catch (err) {
    res.status(401).json(err);
  }
});

router.get("/admin/login/dashboard", async (req, res) => {
  try {
    const user = await Admin.find();

    res.status(201).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
});

export default router;
