import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Assuming you have Ionicons installed
import { useNavigation } from "@react-navigation/native";

const Expert = () => {
  const navigation = useNavigation();

  const handleConnect = () => {
    // Add your connect logic here
    navigation.navigate("ExpertDetail");
  };

  return (
    <View style={styles.cardContainer}>
      <Image style={styles.image} source={require("../assets/logo.png")} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>Kelly Smith</Text>
        <View style={styles.ratingContainer}>
          {/* Display stars based on rating (example: 4 stars) */}
          {[1, 2, 3, 4].map((star, index) => (
            <Ionicons key={index} name="star" size={20} color="#FFD700" />
          ))}
        </View>
        <TouchableOpacity onPress={handleConnect} style={styles.connectButton}>
          <Text style={styles.connectButtonText}>Connect</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Expert;

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
    height: 100,
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
  ratingContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  connectButton: {
    backgroundColor: "#008E97",
    borderRadius: 5,
    width: 125,
    paddingVertical: 8,
  },
  connectButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
  },
});
