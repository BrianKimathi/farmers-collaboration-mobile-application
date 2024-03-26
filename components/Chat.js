import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import Toast from "react-native-toast-message";
import { formatDistanceToNow } from "date-fns";
import { useNavigation } from "@react-navigation/native";
import { useSocketContext } from "../SocketContext";

const Chat = ({ conversation }) => {
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(conversation.otherUser._id);

  const showToast = () => {
    Toast.show({
      type: "success",
      text1: `${conversation.otherUser.username} online,`,
    });
  };

  if (isOnline) {
    showToast();
  }

  const greenDotColor = isOnline ? "#7CFC00" : "gray";

  const createdAtFormatted = formatDistanceToNow(
    new Date(conversation.lastMessage.createdAt),
    { addSuffix: true }
  );

  const navigation = useNavigation();

  const handleNavigation = () => {
    // Navigate to the next screen with parameters
    navigation.navigate("Messages", {
      headerTitle: conversation.otherUser.username,
      chatUserId: conversation.otherUser._id,
      profilePic: conversation.otherUser.profilePic,
    });
  };

  return (
    <Pressable onPress={handleNavigation}>
      <View style={styles.container}>
        {/* Circular Image */}
        <Image
          style={styles.circularImage}
          source={{ uri: conversation.otherUser.profilePic }} // Replace with your image source
        />

        {/* User Info and Latest Message */}
        <View style={styles.userInfoContainer}>
          <Text style={styles.username}>{conversation.otherUser.username}</Text>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
            }}>
            <Text style={styles.latestMessage}>
              {conversation.lastMessage.message}
            </Text>
            <Text style={{ fontSize: 12, color: "gray" }}>
              {createdAtFormatted}
            </Text>
          </View>
        </View>

        {/* Green Dot */}
        <View
          style={{
            width: 10,
            height: 10,
            borderRadius: 5,
            backgroundColor: greenDotColor,
            marginBottom: 20,
          }}></View>
      </View>
    </Pressable>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  circularImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userInfoContainer: {
    flex: 1,
    marginRight: 10,
  },
  username: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  latestMessage: {
    fontSize: 14,
    color: "#808080",
  },
});
