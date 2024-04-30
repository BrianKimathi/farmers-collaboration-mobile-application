import User from "../models/user.model.js";
import Expert from "../models/expert.model.js"; // Import the Expert model

export const getUsers = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controller function to get current user info
export const getCurrentUserInfo = async (req, res) => {
  try {
    // Extract user ID from the request object
    const userId = req.user._id;

    // Fetch the user information by userId
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error in getCurrentUserInfo: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controller function to get users who are experts
export const getUsersWhoAreExperts = async (req, res) => {
  try {
    // Fetch experts and populate the 'user' field to get user details
    let experts = await Expert.find().populate("user", "-password");

    // Remove the current user's ID from the list of experts
    experts = experts.filter(
      (expert) => expert.user._id.toString() !== req.user._id.toString()
    );

    res.status(200).json(experts);
  } catch (error) {
    console.error("Error in getExpertsWithUserDetails: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controller function to get users who are not experts
export const getUsersWhoAreNotExperts = async (req, res) => {
  try {
    // Fetch users with isExpert set to false
    const nonExperts = await User.find({ isExpert: false }).select("-password");

    res.status(200).json(nonExperts);
  } catch (error) {
    console.error("Error in getUsersWhoAreNotExperts: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const rateExpert = async (req, res) => {
  try {
    const { expertId } = req.params; // Extract expertId from request params
    console.log("Expert id is: ", expertId);
    const { rating } = req.body; // Extract rating from request body

    // Find the expert by ID
    const expert = await Expert.findById(expertId);

    if (!expert) {
      return res.status(404).json({ error: "Expert not found" });
    }

    // Update the expert's rating and increment the votes count
    expert.rating =
      (expert.rating * expert.votesCount + rating) / (expert.votesCount + 1);
    expert.votesCount += 1;

    // Save the updated expert data
    await expert.save();

    res.status(200).json({ message: "Expert rated successfully", expert });
  } catch (error) {
    console.error("Error rating expert:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getExpertById = async (req, res) => {
  try {
    const { id } = req.params; // Extract expert ID from request parameters
    console.log("Expert id is: ", id);
    // Find the expert by ID and populate the 'user' field to get user details
    const expert = await Expert.findById(id).populate({
      path: "user",
      select: "-password", // Exclude the password field
      populate: {
        path: "followers",
        select: "profilePic",
        options: { limit: 3 }, // Limit the number of followers to 3
      },
    });

    if (!expert) {
      return res.status(404).json({ error: "Expert not found" });
    }

    res.status(200).json(expert);
  } catch (error) {
    console.error("Error in getExpertById: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
