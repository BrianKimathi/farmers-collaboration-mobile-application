import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import React from "react";
import Connect from "../components/Connect";
import Expert from "../components/Expert";

const ExpertsScreen = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
        paddingTop: Platform.OS === "android" ? 30 : 0,
        paddingHorizontal: 10,
      }}>
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          padding: 10,
          alignItems: "center",
          borderWidth: 1,
          borderColor: "#008E97",
          borderRadius: 10,
        }}>
        <TextInput
          placeholder="Search expert..."
          style={{ flex: 1, backgroundColor: "#fff", fontSize: 16 }}
        />
        <Ionicons
          style={{ backgroundColor: "#fff" }}
          name="search"
          size={24}
          color="#008E97"
        />
      </View>
      <ScrollView
        vertical
        showVerticalScrollIndicator={false}
        style={{ marginTop: 6 }}>
        <Text
          style={{
            fontSize: 24,
            marginTop: 10,
            fontWeight: "bold",
            color: "#008E97",
          }}>
          Experts:
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}>
          <Expert />
          <Expert />
          <Expert />
          <Expert />
          <Expert />
          <Expert />
          <Expert />
          <Expert />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ExpertsScreen;

const styles = StyleSheet.create({});
