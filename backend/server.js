const express = require("express");
const User = require("./models/userSchema");
const { mongoose } = require("mongoose");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const Ques = require("./models/questions");
const userQuestion = require("./models/contributedQues");
const Query = require("./models/query");
const port = 3000;
const app = express();
require("dotenv").config();
const db_URI = process.env.DB_URI;

app.use(bodyParser.json());

mongoose
  .connect(db_URI)
  .then(() => console.log("Conncection successful"))
  .catch((error) => console.log(`Error Connection to Database ${error}`));

app.post("/register", async (req, res) => {
  console.log("/register called");
  const { username, password, email, isAdmin } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    const existingEmail = await User.findOne({ email });
    if (existingUser || existingEmail) {
      return res.status(400).json({ message: "Username/Email already exists" });
    }
    if (password.length < 8) {
      return res.json({ message: "Password length should be atleast 8" });
    } else {
      const hashedPassword = bcrypt.hashSync(password, 8);
      const newUser = new User({
        username: username,
        password: hashedPassword,
        email: email,
        isAdmin: isAdmin || false,
      });
      await newUser.save();
      console.log(newUser);
      return res.json({ message: "User created successfully" });
    }
  } catch (error) {
    res.status(501).json({ message: "Internal Server Error" });
  }
});

app.get("/login", async (req, res) => {
  const { username, password, email } = req.body;
  try {
    const findUser = await User.findOne({ username });
    if (!findUser) {
      return res.status(404).json({ message: "User not found" });
    } else {
      console.log(`/login \n ${findUser}`);
      if (
        !bcrypt.compareSync(password, findUser.password) ||
        findUser.username !== username ||
        findUser.email !== email
      ) {
        res.status(501).json({ message: "Invalid Username/Password/Email" });
      } else {
        res.status(201).json({ message: findUser });
      }
    }
  } catch (error) {
    res.status(501).json({ message: "Internal Server Error" });
  }
});

app.post("/:username/addQues", async (req, res) => {
  const { quesName, difficulty, description, constraints } = req.body;
  const { username } = req.params;
  try {
    const user = await User.findOne({ username });
    if (user.isAdmin) {
      const ques = new Ques({
        quesName,
        difficulty,
        description,
        constraints,
      });
      await ques.save();
      return res.json({ message: "Question added successfully" });
    } else {
      res
        .status(401)
        .json({ message: "You are not authorized for this action" });
    }
  } catch (error) {
    res.status(501).json({ message: "Internal Server Error" });
  }
});

app.post("/:username/contribute", async (req, res) => {
  const { username } = req.params;
  const { quesName, description, isApproved } = req.body;
  try {
    const userQues = new userQuestion({
      contributedBy: username,
      quesName,
      description,
      isApproved: isApproved || false,
    });
    await userQues.save();
    return res.json({ message: "Thank you for your contribution" });
  } catch (error) {
    res.status(501).json({ message: "Internal Server Error" });
  }
});

app.post("/:username/query", async (req, res) => {
  const { username } = req.params;
  const { email, query } = req.body;

  try {
    const queries = new Query({
      username,
      email,
      query,
      isResolved: false,
      resolvedBy: "",
    });
    await queries.save();
    return res.json({ message: "Query Recieved" });
  } catch (error) {
    res.status(501).json({ message: "Internal Server Error" });
  }
});

app.get("/:username/displayQueries", async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username });
    console.log(user.isAdmin);
    if (user.isAdmin) {
      console.log("authourized");
      const queries = await Query.find();
      res.json({ queries });
    } else {
      res
        .status(401)
        .json({ message: "You are not authourized to perform this action" });
    }
  } catch (error) {
    res.status(501).json({ message: "Internal Server Error" });
  }
});

app.post("/forgot-pass", async (req, res) => {
  const { email } = req.body;
  const { newPass } = req.body;
  try {
    const user = await User.findOne({ email });
    if (newPass.length < 8) {
      return res.status(400).json({ message: "Minimum password length is 8" });
    }
    if (user && !user.isAdmin) {
      const updatedPass = bcrypt.hashSync(newPass, 8);
      if (bcrypt.compareSync(newPass, user.password)) {
        return res.json({ message: "New and old password can not be same" });
      } else {
        user.password = updatedPass;
        await user.save();
        return res
          .status(201)
          .json({ message: "Password updated successfully" });
      }
    }
    if (user && user.isAdmin) {
      res
        .status(401)
        .json({ message: "Contact Administration if forgot password" });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(501).json({ message: "Internal Server Error" });
  }
});

app.listen(port, (req, res) => {
  console.log(`Listening to port ${port}`);
});
