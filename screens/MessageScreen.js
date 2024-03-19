import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import Chat from "../components/Chat";
import { SafeAreaView } from "react-native-safe-area-context";

const MessageScreen = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 8].map((item) => (
          <Chat key={item} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default MessageScreen;

const styles = StyleSheet.create({});
