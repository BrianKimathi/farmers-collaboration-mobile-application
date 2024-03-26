import Reel from "../models/reel.model.js";

export const createReel = async (req, res) => {
  try {
    const newReel = new Reel({
      user: req.user._id,
      title: req.body.title,
      video: req.body.video,
    });
    const savedReel = await newReel.save();
    res.status(201).json(savedReel);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllReels = async (req, res) => {
  try {
    const reels = await Reel.find().populate({
      path: "user",
      select: "-password", // Exclude the password field
    });
    res.status(200).json(reels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const likeReel = async (req, res) => {
  try {
    console.log("Reel id is: ", req.params.id);
    const reel = await Reel.findById(req.params.id);

    // If the user has already liked the reel, toggle dislike
    if (reel.likes.includes(req.user._id)) {
      await reel.updateOne({
        $pull: { likes: req.user._id },
        $push: { dislikes: req.user._id },
      });
      res.status(200).json("The reel has been disliked");
    }
    // If the user has not liked the reel, toggle like
    else {
      await reel.updateOne({
        $pull: { dislikes: req.user._id },
        $push: { likes: req.user._id },
      });
      res.status(200).json("The reel has been liked");
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const dislikeReel = async (req, res) => {
  try {
    console.log("Req params: ", req.params.id);
    const reel = await Reel.findById(req.params.id);

    // If the user has already disliked the reel, toggle like
    if (reel.dislikes.includes(req.user._id)) {
      await reel.updateOne({
        $pull: { dislikes: req.user._id },
        $push: { likes: req.user._id },
      });
      res.status(200).json("The reel has been liked");
    }
    // If the user has not disliked the reel, toggle dislike
    else {
      await reel.updateOne({
        $pull: { likes: req.user._id },
        $push: { dislikes: req.user._id },
      });
      res.status(200).json("The reel has been disliked");
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const commentReel = async (req, res) => {
  try {
    const reel = await Reel.findById(req.params.id);
    const comment = req.body.comment;
    reel.comments.push(comment);
    await reel.save();
    res.status(200).json(reel);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getReelsForCurrentUser = async (req, res) => {
  try {
    // Extract user ID from the request object
    const userId = req.user._id;

    // Fetch reels associated with the current user
    const reels = await Reel.find({ user: userId });

    res.status(200).json(reels);
  } catch (error) {
    console.error("Error in getReelsForCurrentUser: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controller function to delete a reel by its ID
export const deleteReelById = async (req, res) => {
  try {
    const userId = req.user._id;
    const reelId = req.params.reelId;

    // Check if the reel exists and belongs to the current user
    const reel = await Reel.findOne({ _id: reelId, user: userId });

    if (!reel) {
      return res.status(404).json({ error: "Reel not found or unauthorized" });
    }

    // Delete the reel
    await Reel.findByIdAndDelete(reelId);

    res.status(200).json({ message: "Reel deleted successfully" });
  } catch (error) {
    console.error("Error in deleteReelById: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
