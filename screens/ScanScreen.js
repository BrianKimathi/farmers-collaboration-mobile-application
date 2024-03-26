import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

const ScanScreen = () => {
  const [diseaseData, setDiseaseData] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSelectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      console.log("Image selected:", result.assets[0].uri);
      setSelectedImage(result.assets[0].uri);
    }
  };

  const handleSearchDisease = async () => {
    console.log("Search disease clicked!");
    try {
      if (!selectedImage) {
        console.error("No image selected.");
        return;
      }

      const base64Image = await imageToBase64(selectedImage);

      const response = await axios.post(
        "https://susya.onrender.com",
        { image: base64Image },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data);
      setDiseaseData(response.data);
    } catch (error) {
      console.error("Error fetching disease data:", error);
      setDiseaseData(null);
    }
  };

  const imageToBase64 = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result.split(",")[1]);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        {selectedImage && (
          <Image style={styles.image} source={{ uri: selectedImage }} />
        )}
      </View>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={handleSelectImage}>
          <Text style={styles.buttonText}>Select Image</Text>
        </Pressable>
        <Pressable
          style={[styles.button, { backgroundColor: "#3498db" }]}
          onPress={handleSearchDisease}
          disabled={!selectedImage}>
          <Text style={styles.buttonText}>Search Disease</Text>
        </Pressable>
      </View>
      {diseaseData && (
        <ScrollView style={styles.scrollView}>
          <Text style={styles.heading}>Disease Information</Text>
          <Text style={{ fontSize: 28, color: "#008E97" }}>Disease:</Text>
          <Text style={styles.info}>{diseaseData.disease}</Text>
          <Text style={{ fontSize: 28, color: "#008E97" }}>
            Affected Plant:
          </Text>
          <Text style={styles.info}>{diseaseData.plant}</Text>
          <Text style={{ fontSize: 28, color: "#008E97" }}>Remedy: </Text>
          <Text style={styles.info}>{diseaseData.remedy}</Text>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  imageContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 50,
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
  },
  button: {
    flex: 1,
    padding: 10,
    backgroundColor: "#008000",
    marginHorizontal: 5,
    alignItems: "center",
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  scrollView: {
    flex: 1,
    width: "100%",
    marginTop: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  info: {
    fontSize: 20,
    marginBottom: 8,
    paddingHorizontal: 10,
    color: "#008000",
  },
});

export default ScanScreen;
