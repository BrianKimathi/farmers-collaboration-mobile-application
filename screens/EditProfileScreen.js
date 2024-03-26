import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { firebase } from "../config";
import { useNavigation } from "@react-navigation/native";

const EditProfileScreen = () => {
  const [formData, setFormData] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);

  const navigation = useNavigation();

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleImageSelect = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.cancelled) {
        const selectedUri = result.assets[0].uri;
        console.log("Image selected:", selectedUri);
        setSelectedImage(selectedUri);
      } else {
        console.log("Image selection cancelled.");
      }
    } catch (error) {
      console.error("Error selecting image:", error);
    }
  };

  useEffect(() => {
    const getMyInfo = async () => {
      try {
        const response = await axios.get(
          "http://192.168.255.57:5000/api/auth/me"
        );
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    getMyInfo();
  }, []);

  const handleSubmit = async () => {
    try {
      let updatedFormData = { ...formData }; // Create a copy of formData

      if (selectedImage) {
        console.log("Image selected!");
        const imageUrl = await uploadImageToFirebase(selectedImage);
        console.log("After upload: ", imageUrl);
        // Update the profile picture URL in the formData copy
        updatedFormData = { ...updatedFormData, profilePic: imageUrl };
      }

      // Send the updated user information to the backend
      const response = await axios.put(
        "http://192.168.255.57:5000/api/auth/update",
        updatedFormData
      );
      console.log("Profile updated successfully:", response.data);
      navigation.navigate("Account");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const uploadImageToFirebase = async (imageUri) => {
    console.log("Uploading...");
    try {
      const response = await fetch(imageUri);
      const blob = await response.blob();

      const filename = imageUri.substring(imageUri.lastIndexOf("/") + 1);
      const ref = firebase.storage().ref().child("images").child(filename);

      await ref.put(blob);

      const imageUrl = await ref.getDownloadURL();
      console.log("Image url is: ", imageUrl);
      return imageUrl;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
        {selectedImage && (
          <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
        )}
        <TouchableOpacity
          style={styles.imageButton}
          onPress={handleImageSelect}>
          <Text style={styles.imageButtonText}>Select Image</Text>
        </TouchableOpacity>
        <Text style={styles.heading}>Edit Profile</Text>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            value={formData.username}
            onChangeText={(text) => handleChange("username", text)}
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={formData.email}
            onChangeText={(text) => handleChange("email", text)}
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            value={formData.password}
            onChangeText={(text) => handleChange("password", text)}
            secureTextEntry
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Update Profile</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  selectedImage: {
    width: 200,
    height: 200,
    alignSelf: "center",
    borderRadius: 100,
    marginBottom: 20,
  },
  imageButton: {
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 5,
    alignSelf: "center",
    marginBottom: 20,
  },
  imageButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#3498db",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default EditProfileScreen;
