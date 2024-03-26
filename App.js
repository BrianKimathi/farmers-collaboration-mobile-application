import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import StackNavigator from "./navigation/StackNavigator";
import { UserContext } from "./UserContext";
import { ModalPortal } from "react-native-modals";
import { SocketContextProvider } from "./SocketContext";

export default function App() {
  return (
    <UserContext>
      <SocketContextProvider>
        <StackNavigator />
      </SocketContextProvider>
      <ModalPortal />
    </UserContext>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
