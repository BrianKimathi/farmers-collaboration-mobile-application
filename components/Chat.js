import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

const Chat = () => {
  return (
    <View style={styles.container}>
      {/* Circular Image */}
      <Image
        style={styles.circularImage}
        source={require("../assets/profile.jpg")} // Replace with your image source
      />

      {/* User Info and Latest Message */}
      <View style={styles.userInfoContainer}>
        <Text style={styles.username}>John Doe</Text>
        <Text style={styles.latestMessage}>Hey, how's it going?</Text>
      </View>

      {/* Green Dot */}
      <View style={styles.greenDot}></View>
    </View>
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
  greenDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "green",
  },
});
