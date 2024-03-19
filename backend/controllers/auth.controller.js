import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    const { username, email, password, confirmPassword, gender } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    const user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const boyProflePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProflePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyProflePic : girlProflePic,
    });

    if (newUser) {
      await generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();
    }

    res.status(201).json({
      _id: newUser._id,
      fullname: newUser.fullname,
      username: newUser.username,
      profilePic: newUser.profilePic,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const followUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    console.log(id, userId);
    // if (id === userId) {
    //   return res.status(400).json({ error: "You cannot follow yourself" });
    // }

    const user = await User.findById(id);
    const currentUser = await User.findById(userId);

    if (!user || !currentUser) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.followers.includes(userId)) {
      return res
        .status(400)
        .json({ error: "You are already following this user" });
    }

    await user.updateOne({ $push: { followers: userId } });
    await currentUser.updateOne({ $push: { following: id } });
    res.status(200).json("User has been followed");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
