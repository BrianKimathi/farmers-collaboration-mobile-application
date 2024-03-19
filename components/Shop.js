import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const Shop = () => {
  return (
    <View style={styles.cardContainer}>
      <Image style={styles.image} source={require("../assets/logo.png")} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>Smith's Shop</Text>
        <TouchableOpacity style={styles.connectButton}>
          <Text style={styles.connectButtonText}>View Shop</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Shop;

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
