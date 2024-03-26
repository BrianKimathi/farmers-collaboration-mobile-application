import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Video } from "expo-av";
import * as ImagePicker from "expo-image-picker";
import { firebase } from "../config";
import * as FileSystem from "expo-file-system";
import axios from "axios";

const UploadVideoScreen = () => {
  const [videoSource, setVideoSource] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [reelUrl, setReelUrl] = useState("");

  const videoPlayerRef = React.useRef(null);

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    })();
  }, []);

  const selectVideo = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        aspect: [16, 9], // Aspect ratio for video preview
        quality: 1,
      });

      if (!result.cancelled) {
        console.log("Video selected:", result);
        const selectedVideo = result.assets[0].uri;
        setVideoSource(selectedVideo);
      }
    } catch (error) {
      console.error("Error picking video:", error);
    }
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleVideoPress = () => {
    // Toggle play/pause when tapping on the video
    setIsPlaying(!isPlaying);
  };

  // upload media files
  const uploadMedia = async () => {
    setUploading(true);
    try {
      const { uri } = await FileSystem.getInfoAsync(videoSource);
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

      const filename = videoSource.substring(videoSource.lastIndexOf("/") + 1);
      const ref = firebase.storage().ref().child("media").child(filename);
      const snapshot = await ref.put(blob, { contentType: "image/jpeg" });
      const url = await snapshot.ref.getDownloadURL();
      setReelUrl(url);
      setUploading(false);
    } catch (error) {
      console.log(error);
      setUploading(false);
    }
  };

  const handleUpload = async () => {
    try {
      // Check if videoSource is not null
      if (!videoSource) {
        Alert.alert("Please select a video");
        return;
      }
      await uploadMedia();

      console.log("Video URL:", reelUrl);

      if (reelUrl) {
        console.log("Video URL:", reelUrl);
        // Send the video URL to the backend
        const response = await axios.post(
          "http://192.168.255.57:5000/api/reels",
          { video: reelUrl },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log(response.data);
        // Handle navigation or any other action after successful upload
      }

      setUploading(false); // Set uploading state to false after upload is complete
    } catch (error) {
      console.error("Error uploading video:", error);
      // Handle error appropriately
      setUploading(false); // Set uploading state to false if an error occurs
    }
  };

  return (
    <View style={styles.container}>
      {videoSource && (
        <View style={styles.videoContainer}>
          <Video
            ref={videoPlayerRef}
            source={{ uri: videoSource }}
            style={styles.video}
            isLooping
            resizeMode="contain"
            shouldPlay={isPlaying}
            useNativeControls={false}
            onTouchStart={handleVideoPress}
          />
        </View>
      )}
      {videoSource && (
        <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
          <Text>Upload Video</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity style={styles.button} onPress={selectVideo}>
        <Text>Select Video</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UploadVideoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  videoContainer: {
    width: "100%",
    height: "100%",
    aspectRatio: 16 / 9, // 16:9 aspect ratio
    margin: 10,
    position: "relative",
  },
  video: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
  },
  button: {
    position: "absolute",
    bottom: 10,
    margin: "auto",
    padding: 10,
    backgroundColor: "lightblue",
    borderRadius: 5,
    zIndex: 1,
  },
  uploadButton: {
    position: "absolute",
    bottom: 70,
    margin: "auto",
    padding: 10,
    backgroundColor: "lightblue",
    borderRadius: 5,
    zIndex: 1,
  },
});
