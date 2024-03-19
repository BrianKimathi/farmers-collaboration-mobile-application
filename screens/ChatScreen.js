import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ReelsScreen from "./ReelsScreen";
import MessageScreen from "./MessageScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import { Platform } from "react-native";
import { socket } from "../utils/utils";

const Tab = createMaterialTopTabNavigator();

const ChatScreen = () => {
  // useEffect(() => {
  //   socket.emit("findGroup", currentGroupID);
  //   socket.on("foundGroup", (allChats) => setAllChatMessages(allChats));
  // }, [socket]);

  return (
    <SafeAreaView
      style={{
        height: "100%",
      }}>
      <Tab.Navigator>
        <Tab.Screen name="Reels" component={ReelsScreen} />
        <Tab.Screen name="Chats" component={MessageScreen} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default ChatScreen;
