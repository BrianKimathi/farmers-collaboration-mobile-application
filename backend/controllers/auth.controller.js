import User from "../models/user.model.js";
import Expert from "../models/expert.model.js";
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
      generateTokenAndSetCookie(newUser._id, res);
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

// Route to get current user's info
export const getMyInfo = async (req, res) => {
  try {
    // Get current user's ID from request object
    const userId = req.user._id;

    // Find the user by ID and exclude the password field
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Return the user's information
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const userId = req.user._id; // Get current user's ID

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Extract new user data from request body
    const { username, email, newPassword, profilePic } = req.body;

    console.log(
      `Username is: ${username}, Email is: ${email}, Password is: ${newPassword}, ProfilePic is: ${profilePic}`
    );

    // Update user's username if provided
    if (username) {
      user.username = username;
    }

    // Update user's email if provided
    if (email) {
      user.email = email;
    }

    // Update user's password if provided
    if (newPassword) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      user.password = hashedPassword;
    }

    // Update user's profile picture if provided
    if (profilePic) {
      user.profilePic = profilePic;
    }

    // Save the updated user
    await user.save();

    // Return the updated user
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// create expert
export const createExpert = async (req, res) => {
  try {
    const currentUser = req.user._id;
    const description = req.body.description;

    console.log("Description is: ", description);

    // Check if the current user is already an expert
    const existingExpert = await Expert.findOne({ user: currentUser });

    if (existingExpert) {
      return res.status(400).json({ error: "User is already an expert" });
    }

    // Create a new expert instance
    const newExpert = new Expert({
      user: currentUser,
      description: description,
    });

    // Save the new expert to the database
    await newExpert.save();

    // Update the current user's isExpert field to true
    await User.findByIdAndUpdate(currentUser, { isExpert: true });

    // Respond with the newly created expert
    res.status(201).json(newExpert);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
