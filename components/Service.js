import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const Service = ({
  iconName,
  title,
  iconSize,
  viewWidth,
  textFontSize,
  handlePress,
}) => {
  return (
    <Pressable
      onPress={handlePress}
      style={{
        width: viewWidth, // Remove curly braces around viewWidth
        alignItems: "center",
        justifyContent: "space-between",
        borderWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 5,
        borderColor: "#008E97",
        borderRadius: 10,
        marginVertical: 10,
      }}>
      <Ionicons name={iconName} size={iconSize} color="#008E97" />
      <Text style={{ color: "#008E97", fontSize: textFontSize }}>{title}</Text>
    </Pressable>
  );
};

export default Service;

const styles = StyleSheet.create({});
