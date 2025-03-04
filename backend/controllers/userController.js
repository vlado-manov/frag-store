import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import zxcvbn from "zxcvbn";

/////////////////////////////////////////////////////////
// @desc    Auth user and get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const correctPassword = await user.matchPassword(password);
  if (user && correctPassword) {
    generateToken(res, user._id);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    return res.status(401).json({ message: "Invalid email or password" });
  }
});

/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
// @desc    Register user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const passwordStrength = zxcvbn(password).score;
  if (passwordStrength < 8) {
    res.status(400);
    throw new Error("Password is too weak");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400).json({ message: "User already exists" });
    throw new Error("User already exists!");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
// @desc    Logout user and clear cookie
// @route   POST /api/users/logout
// @access  Private
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully!!!" });
});

/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Public
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      image: user.image,
      addresses: user.addresses,
      phone: user.phone,
      lastLogin: user.lastLogin,
    });
  } else {
    res.status(404);
    throw new Error("User not Found!");
  }
});

/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    // user.image = req.body.image || user.image;
    user.phone = req.body.phone || user.phone;
    user.addresses = req.body.addresses || user.addresses;

    if (req.body.password) {
      user.password = req.body.password;
    }

    if (req.body.addresses) {
      req.body.addresses.forEach((newAddress) => {
        const existingAddress = user.addresses.find(
          (addr) =>
            addr.addressLine1 === newAddress.addressLine1 &&
            addr.city === newAddress.city &&
            addr.postalCode === newAddress.postalCode &&
            addr.country === newAddress.country
        );

        if (!existingAddress) {
          user.addresses.push(newAddress);
        }
      });
    }

    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      // image: updatedUser.image,
      phone: updatedUser.phone,
      addresses: updatedUser.addresses,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found!");
  }
});

/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
// @desc    Get users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
});

/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUserByAdmin = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = Boolean(req.body.isAdmin);
    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not Found!");
  }
});

/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user && !user.isAdmin) {
    await User.deleteOne({ _id: user._id });
    res.status(200).json({ message: "User deleted successfully" });
  } else {
    res.status(404);
    throw new Error("User not found or is Admin");
  }
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserById,
  getUserProfile,
  getUsers,
  deleteUser,
  updateUser,
  updateUserByAdmin,
};
