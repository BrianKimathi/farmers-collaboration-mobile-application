import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import "core-js/stable/atob";
import { jwtDecode } from "jwt-decode";
import { UserType } from "../UserContext";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const CreateShopScreen = () => {
  const { userId, setUserId } = useContext(UserType);
  const [businessName, setBusinessName] = useState("");
  const [businessDescription, setBusinessDescription] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        const decodedToken = jwtDecode(token);
        const uderId = decodedToken.userId;
        setUserId(uderId);
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };

    fetchUserId();
  }, []);

  const handleCreateShop = async () => {
    try {
      if (businessName === "" || businessDescription === "") {
        Alert.alert("Please fill in all fields", "All fields required!");
        return;
      }

      const business = {
        owner: userId,
        name: businessName,
        description: businessDescription,
      };

      // Create business
      try {
        const response = await axios.post(
          "http://192.168.255.57:5000/api/business",
          business
        );

        console.log(response);

        if (response.status === 201) {
          // Business created successfully
          const { hasBusiness, ...newBusinessData } = response.data;
          console.log("New Business Information:", newBusinessData);

          // Log whether the user has a business or not
          console.log("User hasBusiness:", hasBusiness);

          Alert.alert(
            "Business created successfully!",
            "Shop successfully created"
          );
          setBusinessName("");
          setBusinessDescription("");
          navigation.replace("Main");
        } else {
          // Handle other response statuses
          console.log(response.data.message); // Log the specific error message
          Alert.alert("Creation Failed", response.data.message);
        }
      } catch (error) {
        // Handle errors with 400 status code separately
        if (error.response && error.response.status === 400) {
          console.log(error.response.data.message); // Log the specific error message
          Alert.alert("Creation Failed", error.response.data.message);
        } else {
          console.log(error);
          Alert.alert("Creation Failed", error.message);
        }
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Creation Failed", error.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* Business Logo */}
      <Image
        style={styles.logo}
        source={require("../assets/logo.png")} // Replace with your business logo image source
      />

      {/* Business Name Input */}
      <TextInput
        style={styles.input}
        placeholder="Business Name"
        placeholderTextColor="#808080"
        value={businessName} // Add this line
        onChangeText={(text) => setBusinessName(text)}
      />

      {/* Business Description Input */}
      <TextInput
        style={[styles.input, styles.descriptionInput]}
        placeholder="Business Description"
        placeholderTextColor="#808080"
        multiline
        numberOfLines={4}
        value={businessDescription} // Add this line
        onChangeText={(text) => setBusinessDescription(text)}
      />

      {/* Create Shop Button */}
      <TouchableOpacity
        onPress={handleCreateShop}
        style={styles.createShopButton}>
        <Text style={styles.buttonText}>Create Shop</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateShopScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: "contain",
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: "#808080",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingLeft: 10,
  },
  descriptionInput: {
    height: 80,
    textAlignVertical: "top", // Align text to the top of the input
    paddingTop: 4,
  },
  createShopButton: {
    backgroundColor: "#008E97",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: "100%",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
});
