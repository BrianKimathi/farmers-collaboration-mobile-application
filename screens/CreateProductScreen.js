import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  Platform,
  ScrollView,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { firebase } from "../config";
import * as FileSystem from "expo-file-system";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const CreateProductScreen = () => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [images, setImages] = useState([]);
  const [imagesUrls, setImagesUrls] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [businessId, setBusinessId] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    const fetchBusinessId = async () => {
      const businessId = await AsyncStorage.getItem("businessId");
      setBusinessId(businessId);
    };
    fetchBusinessId();
  }, []);

  const pickMultipleImages = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        aspect: [4, 3],
        quality: 1,
        allowsMultipleSelection: true,
      });

      if (!result.cancelled) {
        console.log("Images selected:", result.assets);
        const selectedImages = result.assets.map((asset) => asset.uri);
        setImages(selectedImages);
      }
    } catch (error) {
      console.error("Error picking images:", error);
    }
  };

  const renderImageItem = ({ item }) => (
    <Image source={{ uri: item }} style={styles.imageItem} />
  );

  const uploadMedia = async () => {
    setUploading(true);
    try {
      const urls = [];
      for (const image of images) {
        const { uri } = await FileSystem.getInfoAsync(image);
        const blob = await new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.onload = () => {
            resolve(xhr.response);
          };
          xhr.onerror = (e) => {
            reject(new TypeError("Network request failed"));
          };
          xhr.responseType = "blob";
          xhr.open("GET", uri, true);
          xhr.send(null);
        });

        const filename = image.substring(image.lastIndexOf("/") + 1);
        const ref = firebase.storage().ref().child("media").child(filename);
        const snapshot = await ref.put(blob, { contentType: "image/jpeg" });
        const url = await snapshot.ref.getDownloadURL();
        urls.push(url);
      }
      setUploading(false);
      return urls;
    } catch (error) {
      console.log(error);
      setUploading(false);
      // Handle error appropriately, such as displaying an alert to the user
      Alert.alert("Error", "Failed to upload images. Please try again later.");
      return [];
    }
  };

  const handleCreateProduct = async () => {
    // Handle product creation logic here
    if (
      productName === "" ||
      productPrice === "" ||
      productDescription === "" ||
      images.length === 0 || // Changed to check image names
      businessId === ""
    ) {
      Alert.alert("Please fill in all fields");
      return;
    }

    try {
      const productUrls = await uploadMedia();
      setImagesUrls(productUrls);

      const productData = {
        name: productName,
        price: productPrice,
        description: productDescription,
        business: businessId,
        images: productUrls, // Update to use productUrls instead of imagesUrls
      };

      console.log("Product Data:", productData);

      const response = await axios.post(
        "http://192.168.255.57:5000/api/products",
        productData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data);
      navigation.replace("ViewShop");
    } catch (error) {
      console.error("Error creating product:", error.response);
      // Log more details about the error
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Request error:", error.message);
      }
      console.error("Error config:", error.config);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.innerContainer}>
          {/* Selected Images */}
          <FlatList
            horizontal
            data={images}
            renderItem={renderImageItem}
            keyExtractor={(item, index) => index.toString()}
            style={styles.imageList}
          />

          {/* Product Name */}
          <TextInput
            style={styles.input}
            placeholder="Product Name"
            value={productName}
            onChangeText={setProductName}
          />

          {/* Product Price */}
          <TextInput
            style={styles.input}
            placeholder="Product Price"
            value={productPrice}
            onChangeText={setProductPrice}
            keyboardType="numeric"
          />

          {/* Product Description */}
          <TextInput
            style={styles.input}
            placeholder="Product Description"
            value={productDescription}
            onChangeText={setProductDescription}
            multiline
          />

          {/* Uploading indicator */}
          {uploading && (
            <View style={styles.uploadingIndicator}>
              <Text>Uploading...</Text>
            </View>
          )}

          {/* Product Images */}
          <TouchableOpacity
            style={styles.imagePickerButton}
            onPress={pickMultipleImages}>
            <Text>Pick Images</Text>
          </TouchableOpacity>

          {/* Create Product Button */}
          <TouchableOpacity
            style={styles.createProductButton}
            onPress={handleCreateProduct}>
            <Text style={styles.buttonText}>Create Product</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? 30 : 0,
    paddingHorizontal: 10,
  },
  innerContainer: {
    paddingVertical: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  imagePickerButton: {
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: "center",
  },
  createProductButton: {
    backgroundColor: "#27ae60",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  imageList: {
    marginVertical: 10,
  },
  imageItem: {
    width: 100,
    height: 100,
    marginRight: 10,
    resizeMode: "cover",
    borderRadius: 5,
  },
  uploadingIndicator: {
    alignItems: "center",
    marginTop: 10,
  },
});

export default CreateProductScreen;
