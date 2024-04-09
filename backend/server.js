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

const db_URI =
  "mongodb+srv://sameervohra943:vzoQ6EsuNLPRk207@cluster0.dpuumzd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// db_URI password:  vzoQ6EsuNLPRk207

app.use(bodyParser.json());

mongoose
  .connect(db_URI)
  .then(() => console.log("Conncection successful"))
  .catch((error) => console.log(`Error Connection to Database ${error}`));

app.post("/register", async (req, res) => {
  console.log("/register called");
  const { username, password, email, isAdmin } = req.body;
  res.send("<h1>hello world</h1>");
  try {
    const existingUser = await User.findOne({ username });
    const existingEmail = await User.findOne({ email });
    if (existingUser || existingEmail) {
      return res.status(400).json({ message: "Username/Email already exists" });
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
    });
    await queries.save();
    return res.json({ message: "Query Recieved" });
  } catch (error) {
    res.status(501).json({ message: "Internal Server Error" });
  }
});

app.post("/:username/displayQuery", async (req, res) => {
  const username = req.params;
  try {
    console.log(username);
  } catch (error) {
    res.status(501).json({ message: "" });
  }
});

app.listen(port, (req, res) => {
  console.log(`Listening to ${port}`);
});
