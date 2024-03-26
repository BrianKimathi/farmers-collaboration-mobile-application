import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
// import { useSocketContext } from "../SocketContext";

const CallScreen = ({ route }) => {
  const { callId, userId } = route.params;

  console.log(`Call id is: ${callId} : User id is: ${userId}`);

  return (
    <SafeAreaView>
      <View>
        <Text>{`Call id is: ${callId}`}</Text>
        <Text>{`User id is: ${userId}`}</Text>
      </View>
    </SafeAreaView>
  );
};

export default CallScreen;

const styles = StyleSheet.create({});
