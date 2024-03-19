import React from "react";
import { View, FlatList, TextInput, Button } from "react-native";
import Message from "./Message";

const ChatRoom = ({ messages, sendMessage }) => {
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={messages}
        renderItem={({ item }) => <Message message={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TextInput
          placeholder="Type your message..."
          style={{ flex: 1, borderWidth: 1, padding: 10 }}
        />
        <Button title="Send" onPress={sendMessage} />
      </View>
    </View>
  );
};

export default ChatRoom;
