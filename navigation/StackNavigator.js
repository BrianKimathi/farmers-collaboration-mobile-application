import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import MarketScreen from "../screens/MarketScreen";
import ChatScreen from "../screens/ChatScreen";
import AccountScreen from "../screens/AccountScreen";
import ScanScreen from "../screens/ScanScreen";
import ExpertsScreen from "../screens/ExpertsScreen";
import ExpertDetailScreen from "../screens/ExpertDetailScreen";
import CreateShopScreen from "../screens/CreateShopScreen";
import UploadVideoScreen from "../screens/UploadVideoScreen";
import ViewShopScreen from "../screens/ViewShopScreen";
import CreateProductScreen from "../screens/CreateProductScreen";
import ReelsScreen from "../screens/ReelsScreen";
import MessageScreen from "../screens/MessageScreen";
import CallScreen from "../screens/CallScreen";
import ProductDetailScreen from "../screens/ProductDetailScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import SocialScreen from "../screens/SocialScreen";
import RegisterExpertScreen from "../screens/RegisterExpertScreen";
import SocialContentScreen from "../screens/SocialContentScreen";
import ViewUsersScreen from "../screens/ViewUsersScreen";

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  function BottomTabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: "Home",
            tabBarLabelStyle: { color: "#008E97" },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons name="home" size={24} color="#008E97" />
              ) : (
                <Ionicons name="home-outline" size={24} color="black" />
              ),
          }}
        />

        <Tab.Screen
          name="Market"
          component={MarketScreen}
          options={{
            tabBarLabel: "Market",
            tabBarLabelStyle: { color: "#008E97" },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons name="basket" size={24} color="#008E97" />
              ) : (
                <Ionicons name="basket-outline" size={24} color="black" />
              ),
          }}
        />

        <Tab.Screen
          name="Social"
          component={ReelsScreen}
          options={{
            tabBarLabel: "Reels",
            tabBarLabelStyle: { color: "#008E97" },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Entypo name="folder-video" size={24} color="#008E97" />
              ) : (
                <Entypo name="video" size={24} color="black" />
              ),
          }}
        />

        <Tab.Screen
          name="Chats"
          component={ChatScreen}
          options={{
            tabBarLabel: "Your chats",

            tabBarLabelStyle: { color: "#008E97" },
            headerShown: true,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons name="chatbox" size={24} color="#008E97" />
              ) : (
                <Ionicons name="chatbox-outline" size={24} color="black" />
              ),
          }}
        />

        <Tab.Screen
          name="Account"
          component={AccountScreen}
          options={{
            tabBarLabel: "Account",
            tabBarLabelStyle: { color: "#008E97" },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons name="person" size={24} color="#008E97" />
              ) : (
                <Ionicons name="person-outline" size={24} color="black" />
              ),
          }}
        />
      </Tab.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SocialContent"
          component={SocialContentScreen}
          options={{
            headerTitle: "Your Reels", // Set your desired header title
            headerStyle: {
              backgroundColor: "#008E97", // Set your desired background color
            },
            headerTintColor: "#fff", // Set the text color of the header title
          }}
        />
        <Stack.Screen
          name="ViewUsers"
          component={ViewUsersScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Call"
          component={CallScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Scan"
          component={ScanScreen}
          options={{
            headerTitle: "Scan Image", // Set your desired header title
            headerStyle: {
              backgroundColor: "#008E97", // Set your desired background color
            },
            headerTintColor: "#fff", // Set the text color of the header title
          }}
        />

        <Stack.Screen
          name="Upload"
          component={UploadVideoScreen}
          options={{
            headerTitle: "Upload Reel", // Set your desired header title
            headerStyle: {
              backgroundColor: "#008E97", // Set your desired background color
            },
            headerTintColor: "#fff", // Set the text color of the header title
          }}
        />
        <Stack.Screen
          name="CreateShop"
          component={CreateShopScreen}
          options={{
            headerTitle: "Create Shop", // Set your desired header title
            headerStyle: {
              backgroundColor: "#008E97", // Set your desired background color
            },
            headerTintColor: "#fff", // Set the text color of the header title
          }}
        />
        <Stack.Screen
          name="ExpertDetail"
          component={ExpertDetailScreen}
          options={{
            headerTitle: "Expert Details", // Set your desired header title
            headerStyle: {
              backgroundColor: "#008E97", // Set your desired background color
            },
            headerTintColor: "#fff", // Set the text color of the header title
          }}
        />



        <Stack.Screen
          name="Messages"
          component={MessageScreen}
          options={({ navigation, route }) => ({
            headerShown: false, // Hide the default header
          })}
        />
        <Stack.Screen
          name="ViewShop"
          component={ViewShopScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ProductDetail"
          component={ProductDetailScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="CreateProduct"
          component={CreateProductScreen}
          options={{
            headerTitle: "Create a New Product", // Set your desired header title
            headerStyle: {
              backgroundColor: "#008E97", // Set your desired background color
            },
            headerTintColor: "#fff", // Set the text color of the header title
          }}
        />
        <Stack.Screen
          name="Expert"
          component={ExpertsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfileScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SocialAccount"
          component={SocialScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RegisterExpert"
          component={RegisterExpertScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={BottomTabs}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
