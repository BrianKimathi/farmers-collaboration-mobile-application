import React, { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import axios from "axios";
import Chat from "../components/Chat";
import { useNavigation } from "@react-navigation/native";

const ChatScreen = () => {
  const [conversations, setConversations] = useState([]);

  const navigation = useNavigation();

  const connectWithUsers = async () => {
    navigation.navigate("ViewUsers");
  };

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await axios.get(
          "http://192.168.255.57:5000/api/messages/chats"
        );
        setConversations(response.data);
      } catch (error) {
        console.log("Error fetching conversations: ", error);
      }
    };

    fetchConversations();
  }, []); // Added empty dependency array to useEffect to run only once on component mount

  return (
    <ScrollView>
      {conversations.length === 0 ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Text style={styles.noChatsText}>No chats yet</Text>
          <Pressable
            onPress={connectWithUsers}
            style={{
              marginTop: 20,
              paddingVertical: 10,
              paddingHorizontal: 20,
              backgroundColor: "#3498db",
              borderRadius: 10,
            }}>
            <Text style={{ color: "#fff" }}>Connect with Others</Text>
          </Pressable>
        </View>
      ) : (
        conversations.map((conversation) => (
          <Chat key={conversation._id} conversation={conversation} />
        ))
      )}
    </ScrollView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  noChatsText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    fontWeight: "bold",
  },
});
