import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  Image,
  Pressable,
} from "react-native";

const ScanScreen = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
        paddingTop: Platform.OS === "android" ? 30 : 0,
        alignItems: "center",
        paddingHorizontal: 10,
      }}>

      <Image
        style={{
          width: 300,
          height: 300,
          resizeMode: "contain",
          marginTop: 50,
        }}
        source={require("../assets/leaf.png")}
      />
      <Pressable
        style={{
          marginTop: 40,
          padding: 10,
          backgroundColor: "#3498db",
          width: "100%",
        }}>
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 18,
          }}>
          Search Disease
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default ScanScreen;

const styles = StyleSheet.create({});
