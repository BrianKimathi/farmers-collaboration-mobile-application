import React, { useState } from "react";
import { View, TextInput, Button } from "react-native";

const MessageInput = ({ onSend }) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim() !== "") {
      onSend(message);
      setMessage("");
    }
  };

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <TextInput
        value={message}
        onChangeText={setMessage}
        placeholder="Type your message..."
        style={{ flex: 1, borderWidth: 1, padding: 10 }}
      />
      <Button title="Send" onPress={handleSend} />
    </View>
  );
};

export default MessageInput;
