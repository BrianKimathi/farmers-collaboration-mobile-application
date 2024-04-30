import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
// import Chat from "../components/Chat";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import ChatRoom from "../components/ChatRoom";
import { useSocketContext } from "../SocketContext";
import { UserType } from "../UserContext";

const MessageScreen = ({ route }) => {
  const [messages, setMessages] = useState([]);

  const { onlineUsers, socket } = useSocketContext();

  const { userId } = useContext(UserType);

  const navigation = useNavigation();
  const { headerTitle, chatUserId, profilePic } = route.params;

  const isOnline = onlineUsers.includes(chatUserId);

  const generateRandomString = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let randomString = "";
    const length = 10; // Length of the random string

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters.charAt(randomIndex);
    }

    return randomString;
  };

  const handleVideoPress = () => {
    const callId = generateRandomString();
    socket.emit("call", { callId, receiverId: chatUserId });
    navigation.navigate("Call", { callId: callId.toString(), userId: userId });
  };

  useEffect(() => {
    const getMessages = async () => {
      try {
        const response = await axios.get(
          `http://192.168.255.57:5000/api/messages/${chatUserId}`
        );
        setMessages(response.data);
      } catch (error) {
        console.log("Error in getMessages controller: ", error.message);
      }
    };

    getMessages();
  });

  // console.log(socket);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.header}>
        <View style={{ flexDirection: "row" }}>
          <Ionicons
            name="arrow-back"
            size={24}
            color="#008E97"
            onPress={() => navigation.goBack()}
            style={{ marginLeft: 10 }}
          />
          <Image source={{ uri: profilePic }} style={styles.profileImage} />
          <View>
            <Text style={styles.headerTitle}>{headerTitle}</Text>
            {isOnline ? (
              <Text style={{ color: "lightgreen", marginHorizontal: 9 }}>
                online
              </Text>
            ) : (
              <Text style={{ color: "#7CFC00", marginHorizontal: 9 }}>
                offline
              </Text>
            )}
          </View>
        </View>

        <Pressable onPress={handleVideoPress}>
          <Ionicons name="videocam" size={30} color="#008E97" />
        </Pressable>
      </View>
      <ChatRoom
        messages={messages}
        receiverId={chatUserId}
        setMessages={setMessages}
      />
    </SafeAreaView>
  );
};

export default MessageScreen;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 10,
    paddingHorizontal: 10,
    gap: 10,
    justifyContent: "space-between",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 15,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#008E97",
    marginLeft: 10,
  },
});
