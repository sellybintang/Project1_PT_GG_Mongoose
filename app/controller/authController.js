const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const User = require("../models/users");

// Auth Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    console.log(user)
    if (!user)
      return res.status(400).json({ message: "Email tidak terdaftar" });
    const validPassword = bcrypt.genSaltSync(password, user.password);
    console.log (!validPassword);
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
  const user = await User.findOne({ where: { email: email } });
  if (user) {
    return res.status(400).json({ message: "User already exists" });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
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

// Verify Token untuk Login User
const verify = async (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(400).json({ message: "Token tidak ada" });
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ where: { id: verified.id } });
    if (!user) return res.status(400).json({ message: "User tidak ada" });
    user.verified = true;
    await user.save();
    res.status(200).json({ message: "User berhasil diverifikasi" });
  } catch (error) {
    res.status(400).json({ message: "Token tidak valid" });
  }
};

// Auth Profile User
const getProfile = async (req, res) => {
  console.log(req.user)
  try {
    const profile = await User.findOne(
      {
        where: {
          id: req.user.id
        }
      });
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
    const profile = await User.findAll()
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
  const { id, } = req.user;
  const {
    firstName,
    lastName,
    username,
    phoneNumber,
  } = req.body;

  const updatedUser = await User.update(
      {
        firstName,
        lastName,
        username,
        phoneNumber,
      },
      { where: { id }, returning: true }
    );
    res.status(200).json({ message: "Profile berhasil diupdate", updatedUser });
  };

module.exports = {
  login,
  register,
  verify,
  getProfile,
  getAllProfile,
  updateProfile
};
