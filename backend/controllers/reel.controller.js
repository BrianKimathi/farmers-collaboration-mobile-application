import Reel from "../models/reel.model.js";

export const createReel = async (req, res) => {
  try {
    const newReel = new Reel({
      user: req.user._id,
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
