import {
  Platform,
  StyleSheet,
  Image,
  Text,
  View,
  Pressable,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { UserType } from "../UserContext";

const AccountScreen = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null); // State to hold user data

  // const handleEditProfile = () => {
  //   navigation.navigate("EditProfile");
  // };

  const { setUserId, setHasBusiness, setBusinessId, setUserName, setIsExpert } =
    useContext(UserType);

  const handleViewShop = () => {
    navigation.navigate("ViewShop");
  };

  const editProfile = () => {
    navigation.navigate("EditProfile");
  };

  const socialAccount = () => {
    navigation.navigate("SocialContent");
  };

  const registerAsExpert = () => {
    navigation.navigate("RegisterExpert");
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "http://192.168.255.57:5000/api/users/current-user"
        );
        setUserData(response.data); // Set user data in state
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  });

  const handleLogout = () => {
    try {
      AsyncStorage.removeItem("authToken");
      AsyncStorage.removeItem("username");
      AsyncStorage.removeItem("authToken");
      AsyncStorage.removeItem("businessId");

      setUserId(null);
      setHasBusiness(false);
      setBusinessId(null);
      setUserName(null);
      setIsExpert(false);

      axios
        .post("http://192.168.255.57:5000/api/auth/logout")
        .then((response) => {
          navigation.replace("Login");
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS === "android" ? 10 : 0,
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
      }}>
      {/* Render user data if available */}
      {userData && (
        <>
          <Image
            style={{
              height: 150,
              width: 150,
              borderRadius: 75,
              resizeMode: "cover",
            }}
            source={{ uri: userData.profilePic }} // Use userData to render profile picture
          />

          <Text style={{ marginTop: 20, fontSize: 22, color: "#008E97" }}>
            {userData.username} | {userData.isExpert ? "Expert" : "User"}
          </Text>

          <Text style={{ marginTop: 6, fontSize: 14, color: "#008E97" }}>
            {userData.followers.length} followers
          </Text>
          <Text style={{ marginTop: 6, fontSize: 12, color: "#008E97" }}>
            {userData.following.length} following
          </Text>
        </>
      )}

      <View style={{ width: "100%", paddingHorizontal: 10, marginTop: 20 }}>
        <Pressable
          onPress={socialAccount}
          style={{
            paddingVertical: 6,
            borderWidth: 1,
            borderColor: "#008E97",
            borderRadius: 10,
            paddingHorizontal: 10,
            flexDirection: "row",
            justifyContent: "space-between",
          }}>
          <Text style={{ fontSize: 18, color: "#008E97" }}>Social Account</Text>
          <Ionicons
            name="arrow-forward-circle-sharp"
            size={24}
            color="#008E97"
          />
        </Pressable>

        <Pressable
          onPress={handleViewShop}
          style={{
            display: userData && userData.hasBusiness ? "flex" : "none", // Show button only if user has a business
            paddingVertical: 6,
            borderWidth: 1,
            borderColor: "#008E97",
            borderRadius: 10,
            paddingHorizontal: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 14,
          }}>
          <Text style={{ fontSize: 18, color: "#008E97" }}>Manage Shop</Text>
          <Ionicons
            name="arrow-forward-circle-sharp"
            size={24}
            color="#008E97"
          />
        </Pressable>
      </View>
      <View style={{ width: "100%", paddingHorizontal: 10, marginTop: 40 }}>
        <Pressable
          onPress={editProfile}
          style={{
            paddingVertical: 6,
            borderWidth: 1,
            borderColor: "#008E97",
            borderRadius: 10,
            paddingHorizontal: 10,
            flexDirection: "row",
            justifyContent: "space-between",
          }}>
          <Text style={{ fontSize: 18, color: "#008E97" }}>Edit your Info</Text>
          <Ionicons
            name="arrow-forward-circle-sharp"
            size={24}
            color="#008E97"
          />
        </Pressable>
        <Pressable
          onPress={registerAsExpert}
          style={{
            paddingVertical: 6,
            borderWidth: 1,
            borderColor: "#008E97",
            borderRadius: 10,
            paddingHorizontal: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 14,
          }}>
          <Text style={{ fontSize: 18, color: "#008E97" }}>
            Register as Expert
          </Text>
          <Ionicons
            name="arrow-forward-circle-sharp"
            size={24}
            color="#008E97"
          />
        </Pressable>
        <Pressable
          onPress={handleLogout}
          style={{
            paddingVertical: 6,
            borderWidth: 1,
            borderColor: "#008E97",
            borderRadius: 10,
            paddingHorizontal: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 14,
          }}>
          <Text
            style={{
              fontSize: 18,
              color: "#008E97",
              textAlign: "center",
              width: "100%",
            }}>
            Logout
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({});
