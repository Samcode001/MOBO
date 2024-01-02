import express from "express";
import  { USER } from "../models/admin.js";
const router = express.Router();
import  jwt from "jsonwebtoken";
import  { z } from "zod";
import bcrypt from "bcrypt";

const adminInputProps = z.object({
  username: z.string().min(1),
  password: z.string().min(8),
  name: z.string().min(2),
});

router.post("/signup", async (req, res) => {
  try {
    console.log(req.body);
    const parsedData = adminInputProps.safeParse(req.body);
    if (!parsedData.success) {
      return res.status(401).send("Please Provide Valid Inputs");
    }

    const { username, password, name } = req.body;

    const salt = await bcrypt.genSalt(10);
    const securePassword = await bcrypt.hash(password, salt);

    const admin = await USER.findOne({ username: username });
    if (admin) {
      res.status(401).send("User Already Exist");
    } else {
      const newAdmin = new USER({
        name: name,
        username: username,
        password: securePassword,
      });

      await newAdmin.save();
      res.status(200).json({
        message: "Admin created",
        token: jwt.sign({ admin: newAdmin.username },  process.env.jwtSecret, {
          expiresIn: "4h",
        }),
      });
    }
  } catch (error) {
    res.status(500).send(`Error in Route: ${error}`);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const admin = await USER.findOne({ username });
    if (!admin) return res.status(404).send("User Not Found");

    const flag = await bcrypt.compare(password, admin.password);
    if (flag)
      res.status(200).json({
        message: "Logged in Succesfully",
        token: jwt.sign({ admin: admin.username },  process.env.jwtSecret, {
          expiresIn: "4h",
        }),
      });
    else {
      res.status(401).send("Invalid Credentials");
    }
  } catch (error) {
    res.status(500).send(`Error in Route : ${error}`);
  }
});

export default router;
