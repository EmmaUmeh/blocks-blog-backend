const Users = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs"); // Import the bcrypt library

require('dotenv').config();

const register = async (req, res) => {
  const { email, username, password } = req.body;

  try {
    if (!email || !username || !password) {
      return res.status(400).json({ error: "Email, username, and password are required" });
    }

    const existingUser = await Users.findOne({ email });
    // const exist = await Users.filter({email}).exist()

    if (existingUser) {
      return res.status(400).json({ error: "User Already Exists" });
    }

    // Hash the password before saving it
    const saltRounds = 10; // You can adjust the number of salt rounds
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new Users({ email, username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ 
        msg: "User Registered Successfully",

        data: [{
            email, username, password
        }]
 });
  } catch (error) {
    console.error("Error while creating User", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await Users.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    // Compare the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: "1h" });

    res.status(200).json({ msg: "Login Successful", token });
  } catch (error) {
    console.error("Error while logging in", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { register, login };