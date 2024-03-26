import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { UserType } from "../UserContext";

const Connect = ({ farmer, handleFollowUser }) => {
  const navigation = useNavigation();

  const { userId } = useContext(UserType);

  const handleConnect = () => {
    navigation.navigate("Messages", {
      headerTitle: farmer?.username,
      chatUserId: farmer?._id,
      profilePic: farmer?.profilePic,
    });
  };

  console.log("User ID: ", userId);

  return (
    <View style={styles.cardContainer}>
      <Image style={styles.image} source={{ uri: farmer.profilePic }} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{farmer.username}</Text>
        <Text style={styles.title}>{farmer.isExpert ? "Expert" : "User"}</Text>
        {farmer.followers.includes(userId) ? (
          <Text
            style={{ width: "100%", textAlign: "center", color: "#008E97" }}>
            following
          </Text>
        ) : (
          <TouchableOpacity
            onPress={handleFollowUser}
            style={styles.followButton}>
            <Text style={styles.connectButtonText}>follow</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={handleConnect} style={styles.connectButton}>
          <Text style={styles.connectButtonText}>Connect</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Connect;

const styles = StyleSheet.create({
  cardContainer: {
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#008E97",
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
  image: {
    width: 125,
    height: 125,
    resizeMode: "contain",
    borderRadius: 10,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#008E97",
    marginBottom: 5,
    textAlign: "center",
    marginTop: 8,
  },
  title: {
    fontSize: 16,
    marginBottom: 5,
    textAlign: "center",
    color: "green",
  },
  connectButton: {
    backgroundColor: "#008E97",
    borderRadius: 5,
    width: 125,
    paddingVertical: 8,
    marginTop: 10,
  },
  followButton: {
    backgroundColor: "#008E97",
    borderRadius: 5,
    width: 125,
    paddingVertical: 4,
  },
  connectButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
  },
});
