const express = require("express");
const User = require("./models/userSchema");
const { mongoose } = require("mongoose");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Ques = require("./models/questions");
const userQuestion = require("./models/contributedQues");
const Query = require("./models/query");
const questions = require("./models/questions");
const port = 3000;
const app = express();
require("dotenv").config();
const db_URI = process.env.DB_URI;
const cors = require("cors");
app.use(cors());
app.use(bodyParser.json());

mongoose
  .connect(db_URI)
  .then(() => console.log("Connection successful"))
  .catch((error) => console.log(`Error Connecting to Database ${error}`));

function verifytoken(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(403).send("Authentication required for this action");
  }

  try {
    const tokenParts = token.split(" ");
    const decoded = jwt.verify(tokenParts[1], "SECRET_KEY");
    const currentTime = Math.floor(Date.now() / 1000);
    const lastActivity = decoded.lastActivity;
    const inactivePeriod = 5 * 60 * 60;

    if (currentTime - lastActivity > inactivePeriod) {
      return res.status(401).send("Token Expired due to inactivity");
    }
    decoded.lastActivity = currentTime;

    req.user = decoded;
    next();
  } catch (error) {
    res.status(500).send("Internal server error");
  }
}

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
      return res.status(201).json({ message: "User created successfully" });
    }
  } catch (error) {
    res.status(501).json({ message: "Internal Server Error" });
  }
});

app.post("/login", async (req, res) => {
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
        res.status(401).json({ message: "Invalid Username/Password/Email" });
      } else {
        const tokenPayload = {
          username: findUser.username,
          isAdmin: findUser.isAdmin,
        };
        console.log(tokenPayload);
        const token = jwt.sign(tokenPayload, "SECRET_KEY");
        res.status(201).json({ token, isAdmin: findUser.isAdmin });
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/:username/addQues", verifytoken, async (req, res) => {
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

app.post("/:username/contribute", verifytoken, async (req, res) => {
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
    return res.status(201).json({ message: "Thank you for your contribution" });
  } catch (error) {
    res.status(501).json({ message: "Internal Server Error" });
  }
});

app.post("/:username/query", verifytoken, async (req, res) => {
  const { username } = req.params;
  const { email, query } = req.body;

  try {
    const queries = new Query({
      username: username,
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

app.get("/:username/display-queries", verifytoken, async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username });
    console.log(user.isAdmin);
    if (user.isAdmin) {
      console.log("authourized");
      await Query.deleteMany({ isResolved: true });
      const queries = await Query.find();
      console.log(queries);
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

app.get("/display-ques", verifytoken, async (req, res) => {
  try {
    const ques = await questions.find({});
    res.status(201).json(ques);
  } catch (error) {
    res.status(501).send("Internal Server Error");
  }
});

app.get("/:queryId/show-query", verifytoken, async (req, res) => {
  const { qId } = req.params;
  try {
    const user = await Query.findOne(qId);
    console.log(user);
    res.status(201).send(user);
  } catch (error) {
    res.status(501).send("Internal Server Error");
  }
});

app.put("/:queryId/resolve", async (req, res) => {
  const { queryId } = req.params;
  try {
    const query = await Query.findOneAndUpdate(
      { _id: queryId },
      { isResolved: true },
      { new: true },
    );
    const query1 = await Query.findOneAndDelete({ isResolved: true });
    console.log(query);
    res.status(201).json({ query1 });
  } catch (error) {
    res.status(501).send("Internal Server Error");
  }
});

app.get("/:username/display-contributed", verifytoken, async (req, res) => {
  try {
    const ques = await userQuestion.find();
    res.status(200).send(ques);
  } catch (error) {
    res.status(501).send("Internal Server Error");
  }
});

app.post("/forgot-pass", verifytoken, async (req, res) => {
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

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
