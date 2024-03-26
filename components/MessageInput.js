import React, { useState } from "react";
import { View, TextInput, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";

const MessageInput = ({ onSend }) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message !== "") {
      onSend(message);
      setMessage("");
    }
  };

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 10,
        gap: 6,
      }}>
      <TextInput
        value={message}
        onChangeText={setMessage}
        placeholder="Type your message..."
        style={{
          flex: 1,
          borderWidth: 1,
          padding: 6,
          borderColor: "#008E97",
          borderRadius: 10,
        }}
      />
      <Pressable
        onPress={handleSend}
        style={{ backgroundColor: "#008E97", borderRadius: 50, padding: 2 }}>
        <Feather
          name="send"
          size={28}
          color="#fff"
          style={{
            padding: 6,
          }}
        />
      </Pressable>
    </View>
  );
};

export default MessageInput;
