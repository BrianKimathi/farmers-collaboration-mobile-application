import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Message = ({ message, alignRight }) => {
  return (
    <View
      style={[
        styles.messageContainer,
        alignRight ? styles.alignRight : styles.alignLeft,
      ]}>
      <Text>{message.message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    padding: 10,
    marginVertical: 5,
    maxWidth: "70%",
    borderRadius: 8,
    margin: 6,
    marginBottom: 4,
  },
  alignRight: {
    alignSelf: "flex-end",
    backgroundColor: "#DCF8C5", // Example background color for messages aligned to the right
  },
  alignLeft: {
    alignSelf: "flex-start",
    backgroundColor: "#E5E5EA", // Example background color for messages aligned to the left
  },
});

export default Message;
``;
