import Business from "../models/business.model.js";
import User from "../models/user.model.js"; // Make sure to import the User model
// import mongoose from "mongoose"

export const getBusinesses = async (req, res) => {
  try {
    const businesses = await Business.find();
    res.status(200).json(businesses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBusinessByOwner = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Owner id: ", id);
    const business = await Business.findOne({ owner: id });
    res.status(200).json({ businessData: business });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

export const createBusiness = async (req, res) => {
  const { owner, name, description } = req.body;
  const logo = "https://img.icons8.com/?size=50&id=63370&format=png";

  console.log(owner, name, logo, description);

  try {
    // Check if the user already has a business
    const user = await User.findById(owner);

    console.log("User information:", user);

    if (user.hasBusiness) {
      // User already has a business, return an appropriate response
      console.log("User already has a business.");
      return res.status(400).json({
        message: "User already has a business.",
        hasBusiness: user.hasBusiness, // Include hasBusiness field in the response
      });
    }

    // Create a new business
    const newBusiness = await Business.create({
      owner,
      name,
      logo,
      description,
    });

    // Update the user's hasBusiness to true
    await User.findByIdAndUpdate(owner, { $set: { hasBusiness: true } });

    // Include hasBusiness field in the response
    res.status(201).json({
      ...newBusiness.toJSON(),
      hasBusiness: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
