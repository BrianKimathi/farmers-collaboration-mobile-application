import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Pressable,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Service from "../components/Service";
import Connect from "../components/Connect";
import Shop from "../components/Shop";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserType } from "../UserContext";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { FontAwesome5 } from "@expo/vector-icons";

const HomeScreen = () => {
  const [username, setUsername] = useState("");
  const [profilePic, setProfilePic] = useState("");

  const { setUserId, hasBusiness, setHasBusiness, setBusinessId, userId } =
    useContext(UserType);

  const navigation = useNavigation();

  const handleCreateShop = () => {
    navigation.navigate("CreateShop");
  };

  const handleViewShop = () => {
    navigation.navigate("ViewShop");
  };

  const handleScanPress = () => {
    navigation.navigate("Scan");
  };
  const handleExpertPress = () => {
    navigation.navigate("Expert");
  };

  const handleConnect = () => {
    navigation.navigate("SocialContent");
  };

  const viewUsers = () => {
    navigation.navigate("ViewUsers");
  };

  const getUserData = async () => {
    try {
      const username = await AsyncStorage.getItem("username");
      const profilePic = await AsyncStorage.getItem("profilePic");
      // console.log("Console log: ", username, profilePic);

      if (username && profilePic) {
        setUsername(username);
        setProfilePic(profilePic);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch the user ID from AsyncStorage
        const token = await AsyncStorage.getItem("authToken");
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.userId;
        setUserId(userId);
        // Fetch business data
        const businessResponse = await axios.get(
          `http://192.168.255.57:5000/api/business/${userId}`
        );

        // Check if the response data contains business information
        const businessData = businessResponse.data.businessData;
        if (businessData) {
          setBusinessId(businessData._id);
          AsyncStorage.setItem("businessId", businessData._id);
          setHasBusiness(true);
        } else {
          setHasBusiness(false);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [setHasBusiness]);

  // Use another useEffect to handle logic depending on updated hasBusiness
  useEffect(() => {
    // Any logic that depends on the updated hasBusiness value
    console.log("Has business: ", hasBusiness);
  }, [hasBusiness]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
      }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          padding: 8,
        }}>
        <Image
          style={{ width: 50, height: 50, borderRadius: 50 }}
          source={
            profilePic ? { uri: profilePic } : require("../assets/profile.jpg")
          }
        />
        <View>
          <View style={{ flexDirection: "row" }}>
            <Text>Hello, </Text>
            <Text
              style={{ color: "#008E97", fontSize: 15, fontWeight: "bold" }}>
              {username}
            </Text>
          </View>
          <Text>Welcome back!</Text>
        </View>
      </View>
      <View style={{ width: "100%", height: 1, backgroundColor: "#008E97" }} />
      <ScrollView vertical showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Service
            iconName="scan"
            title="Scan Image"
            handlePress={handleScanPress}
            textFontSize={18}
            iconSize={100}
            viewWidth={150}
          />
          <Service
            iconName="search"
            title="Find Expert"
            handlePress={handleExpertPress}
            textFontSize={18}
            iconSize={100}
            viewWidth={150}
          />
        </View>
        <View style={{ padding: 10 }}>
          <Text style={{ color: "#008E97", fontSize: 22, fontWeight: "bold" }}>
            Open your Business Today.
          </Text>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-evenly",
              borderWidth: 1,
              borderColor: "#008E97",
              borderRadius: 10,
              height: 150,
              marginTop: 10,
            }}>
            <Image
              style={{ width: 150, height: 150, resizeMode: "contain" }}
              source={require("../assets/shop.png")}
            />
            <View style={{ height: "100%", justifyContent: "space-evenly" }}>
              {hasBusiness ? (
                <Text
                  style={{
                    color: "#008E97",
                    fontSize: 18,
                    fontWeight: "bold",
                  }}>
                  Manage your Shop Now
                </Text>
              ) : (
                <Text
                  style={{
                    color: "#008E97",
                    fontSize: 18,
                    fontWeight: "bold",
                  }}>
                  Open your Shop Now
                </Text>
              )}
              {hasBusiness ? (
                <TouchableOpacity
                  onPress={handleViewShop}
                  style={{
                    backgroundColor: "#008E97",
                    paddingVertical: 10,
                    borderRadius: 10,
                    textAlign: "center",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                  }}>
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 18,
                      textAlign: "center",
                    }}>
                    View Shop
                  </Text>
                  <Ionicons
                    name="arrow-forward-circle-outline"
                    size={24}
                    color="white"
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={handleCreateShop}
                  style={{
                    backgroundColor: "#008E97",
                    paddingVertical: 10,
                    borderRadius: 10,
                    textAlign: "center",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                  }}>
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 18,
                      textAlign: "center",
                    }}>
                    Get Started
                  </Text>
                  <Ionicons
                    name="arrow-forward-circle-outline"
                    size={24}
                    color="white"
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
          <Text
            style={{
              color: "#008E97",
              fontSize: 22,
              marginTop: 14,
              fontWeight: "bold",
            }}>
            Manage Social Content
          </Text>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 10,
              borderWidth: 1,
              paddingVertical: 10,
              borderRadius: 10,
              marginTop: 10,
              borderColor: "#008E97",
            }}>
            <Image
              style={{
                width: 120,
                height: 120,
                resizeMode: "contain",
                borderRadius: 50,
              }}
              source={require("../assets/social.png")}
            />
            <View
              style={{
                height: 100,
                justifyContent: "space-between",
                padding: 10,
              }}>
              <Text style={{ color: "#008E97", fontSize: 18 }}>
                Manage Social Content
              </Text>
              <Pressable
                onPress={handleConnect}
                style={{
                  backgroundColor: "#008E97",
                  paddingVertical: 10,
                  borderRadius: 10,
                  textAlign: "center",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                }}>
                <Text style={{ color: "#fff", fontSize: 18 }}>Connect</Text>
              </Pressable>
            </View>
          </View>

          <Text
            style={{
              color: "#008E97",
              fontSize: 22,
              marginTop: 14,
              fontWeight: "bold",
            }}>
            Discover Users
          </Text>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 20,
              borderWidth: 1,
              paddingVertical: 10,
              borderRadius: 10,
              marginTop: 10,
              borderColor: "#008E97",
            }}>
            <Image
              style={{
                width: 120,
                height: 120,
                resizeMode: "contain",
                borderRadius: 50,
              }}
              source={require("../assets/users.png")}
            />
            <View style={{ height: 100, justifyContent: "space-evenly" }}>
              <Text style={{ color: "#008E97", fontSize: 18 }}>
                Discover other users
              </Text>
              <Pressable
                onPress={viewUsers}
                style={{
                  backgroundColor: "#008E97",
                  paddingVertical: 10,
                  borderRadius: 10,
                  textAlign: "center",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                }}>
                <Text style={{ color: "#fff", fontSize: 18 }}>Connect</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },
});
