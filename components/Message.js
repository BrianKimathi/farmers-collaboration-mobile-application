import React from "react";
import { View, Text } from "react-native";

const Message = ({ message }) => {
  return (
    <View style={{ flexDirection: "row", padding: 10 }}>
      <View style={{ flex: 1 }}>
        <Text>{message.sender}</Text>
        <Text>{message.text}</Text>
      </View>
      <Text>{message.timestamp}</Text>
    </View>
  );
};

export default Message;
