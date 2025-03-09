import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../db.js";
import prisma from "../prismaClient.js";

const router = express.Router();

// Register a new user endpoint /auth/register
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  // encrypt the password
  const hashedPassword = bcrypt.hashSync(password, 8);

  // save the new user and hashed password to the db
  try {
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    // now we have a user, add default first todo for the user
    const defaultTodo = `Hello, add your first todo!`;

    await prisma.todo.create({
      data: {
        task: defaultTodo,
        userId: user.id,
      },
    });

    // create a token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.json({ token });
  } catch (e) {
    console.log(e.message);
    res.sendStatus(503);
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    // if cannot find a user associated with that username, return out from the func
    if (!user) {
      return res.status(404).send({
        message: "User not found",
      });
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({
        message: "Invalid password",
      });
    }

    console.log(user);

    // then we have a succesfully authentication
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.json({
      token,
    });
  } catch (e) {
    console.log(e.message);
    res.sendStatus(503);
  }
});

export default router;
