import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Assuming you have Ionicons installed
import { useNavigation } from "@react-navigation/native";

const ExpertDetailScreen = () => {
  const navigation = useNavigation();

  const handleConnect = () => {
    // Add your connect logic here
    navigation.navigate("ExpertDetail");
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
        paddingTop: Platform.OS === "android" ? 30 : 0,
        paddingHorizontal: 10,
      }}>
      {/* Image at the top */}
      <Image style={styles.image} source={require("../assets/profile.jpg")} />

      {/* Name */}
      <Text style={styles.name}>John Doe</Text>

      {/* Rating (example: 4 stars) */}
      <View style={styles.ratingContainer}>
        {[1, 2, 3, 4].map((star, index) => (
          <Ionicons key={index} name="star" size={20} color="#FFD700" />
        ))}

        {/* Add text next to the rating stars */}
        <Text style={styles.ratingText}>4.2 from 200 people</Text>
      </View>

      {/* Description */}
      <Text style={styles.description}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget
        felis ut velit gravida ullamcorper.
      </Text>

      {/* Followed by section */}
      <View style={styles.followedByContainer}>
        <Text style={styles.followedByText}>Followed by</Text>
        <View style={styles.circularImagesContainer}>
          {/* Display three circular images */}
          <Image
            style={styles.circularImage}
            source={require("../assets/logo.png")}
          />
          <Image
            style={styles.circularImage}
            source={require("../assets/logo.png")}
          />
          <Image
            style={styles.circularImage}
            source={require("../assets/logo.png")}
          />
          {/* Display ... for additional images */}
          <Text style={styles.ellipsis}>... and others.</Text>
        </View>
      </View>

      {/* Connect button at the bottom */}
      <TouchableOpacity onPress={handleConnect} style={styles.connectButton}>
        <Text style={styles.connectButtonText}>Connect</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ExpertDetailScreen;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
    borderRadius: 10,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#008E97",
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 20,
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 16,
    color: "#008E97",
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  connectButton: {
    backgroundColor: "#008E97",
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: "center",
    marginTop: 20,
  },
  connectButtonText: {
    color: "white",
    fontSize: 18,
  },
  followedByContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },
  followedByText: {
    fontSize: 16,
    marginRight: 8,
  },
  circularImagesContainer: {
    flexDirection: "row",
    alignItems: "center", // Center the text vertically
  },
  circularImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 5,
  },
  ellipsis: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 5,
  },
});
