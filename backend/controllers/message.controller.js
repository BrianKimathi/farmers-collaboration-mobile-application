import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    // await conversation.save();
    // await newMessage.save();

    // this will run in parallel
    await Promise.all([conversation.save(), newMessage.save()]);

    // SOCKET IO FUNCTIONALITY WILL GO HERE
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      // io.to(<socket_id>).emit() used to send events to specific client
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages"); // NOT REFERENCE BUT ACTUAL MESSAGES

    if (!conversation) return res.status(200).json([]);

    const messages = conversation.messages;

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getChats = async (req, res) => {
  try {
    const userId = req.user._id;

    // Find conversations where the user is a participant
    const conversations = await Conversation.find({
      participants: userId,
    });

    // Construct an array to hold each conversation's details
    const chats = [];

    // Iterate over each conversation
    for (const conversation of conversations) {
      // Find the other participant in the conversation
      const otherParticipant = conversation.participants.find(
        (participantId) => participantId.toString() !== userId.toString()
      );

      // Fetch user info of the other participant
      const otherUser = await User.findById(
        otherParticipant,
        "username profilePic"
      );

      // Find the last message in the conversation
      const lastMessage = await Message.findOne({
        _id: { $in: conversation.messages },
      }).sort({ createdAt: -1 });

      // Add conversation details, other user info, and last message to the chats array
      chats.push({
        conversationId: conversation._id,
        otherUser: otherUser,
        lastMessage: lastMessage,
      });
    }

    res.status(200).json(chats);
  } catch (error) {
    console.log("Error in getChats controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
