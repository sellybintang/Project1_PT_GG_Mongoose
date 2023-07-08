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
  // const _id  = req.user._id;
  // const {
  //   firstName,
  //   lastName,
  //   username,
  //   phoneNumber,
  // } = req.body;

  // const updatedUser = await User.findByIdAndUpdate(
  //     {
  //       firstName,
  //       lastName,
  //       username,
  //       phoneNumber,
  //     },
  //     { where: { id }, returning: true }
  //   );
  //   res.status(200).json({ message: "Profile berhasil diupdate", updatedUser });
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


  // const updateUsersById = async (req, res) => {
  //   try {
  //     const salt = bcrypt.genSaltSync(10);
  //     const hash = bcrypt.hashSync(req.body.password, salt);
  //     const user = await Users.findByIdAndUpdate(
  //       req.params.id,
  //       { $set: {...req.body, password: hash,} },
  //       { new: true }
  //     );
  //     if(!user) {
  //       return res.status(404).send({ message: "users not found", })
  //     }
  //     res.status(200).json({status: "success", message: "success update users",});
  //   } catch (error) {
  //     return res.status(500).send({ message: error.message, })
  //   }
  // };

module.exports = {
  login,
  register,
  verify,
  getProfile,
  getAllProfile,
  updateProfile
};