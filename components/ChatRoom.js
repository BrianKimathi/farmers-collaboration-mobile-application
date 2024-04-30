import React, { useState, useContext, useRef, useEffect } from "react";
import { View, FlatList } from "react-native";
import Message from "./Message";
import MessageInput from "./MessageInput";
import { UserType } from "../UserContext";
import axios from "axios";

const ChatRoom = ({ messages, receiverId, setMessages }) => {
  const { userId } = useContext(UserType);
  const flatListRef = useRef();

  useEffect(() => {
    // Scroll to the bottom when messages change
    flatListRef.current.scrollToEnd({ animated: true });
  }, [messages]);

  const sendMessage = async (message) => {
    try {
      const res = await axios.post(
        `http://192.168.255.57:5000/api/messages/send/${receiverId}`,
        { message }
      );
      setMessages([...messages, res.data]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={({ item }) => (
          <Message message={item} alignRight={item.senderId === userId} />
        )}
        keyExtractor={(item) => item._id.toString()}
        onContentSizeChange={() =>
          flatListRef.current.scrollToEnd({ animated: true })
        }
      />
      <MessageInput onSend={sendMessage} />
    </View>
  );
};

export default ChatRoom;
