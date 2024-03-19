import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const Connect = () => {

  const handleConnect = () => {
    
  }

  return (
    <View style={styles.cardContainer}>
      <Image style={styles.image} source={require("../assets/logo.png")} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>Kelly Smith</Text>
        <Text style={styles.title}>Farmer</Text>
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
  },
  connectButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
  },
});
