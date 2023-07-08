const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const User = require("../models/users");

// Auth Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Email tidak terdaftar" });
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword)
      return res.status(400).json({ message: "Password salah" });
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    res.status(200).json({ message: "Login berhasil", token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Auth Register
const register = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    username,
    phoneNumber,
    role
  } = req.body;
  const user = await User.findOne({ email } );
  if (user) {
    return res.status(400).json({ message: "User already exists" });
  }
  const salt = await bcrypt.genSaltSync(10);
  const hashedPassword = await bcrypt.hashSync(password, salt);
  const newUser = await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    username,
    phoneNumber,
    role
  });
  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
  res.status(201).json({ message: "User created successfully", token });
};

// Auth Profile User
const getProfile = async (req, res) => {
  console.log(req.user)
  try {
    const id = req.user;
    const profile = await User.findById(id.id);
    res.status(200).json({
      profile,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message,
    });
  }
};

// Auth All Profile User
const getAllProfile = async (req, res) => {
  console.log(req.user)
  try {
    const profile = await User.find()
    res.status(200).json({
      profile,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message,
    });
  }
};

// Update Profile User
const updateProfile = async (req, res) => {
  console.log(req.user)
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: {...req.body, password: hash,} },
      { new: true }
    );
    if(!user) {
      return res.status(404).send({ message: "users not found", })
    }
    res.status(200).json({status: "success", message: "success update users",});
  } catch (error) {
    return res.status(500).send({ message: error.message, })
  }
  };

module.exports = {
  login,
  register,
  getProfile,
  getAllProfile,
  updateProfile
};