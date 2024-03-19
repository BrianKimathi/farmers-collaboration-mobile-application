import React, { useRef, useState, useEffect } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Video, ResizeMode } from "expo-av";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { Image, Text, TouchableOpacity, Pressable } from "react-native";

const VideoItem = (reel) => {
  const video = useRef(null);
  const [status, setStatus] = useState({});
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      const startVideo = async () => {
        await video.current.setStatusAsync({ shouldPlay: true });
      };

      startVideo();

      return () => {
        const stopVideo = async () => {
          await video.current.setStatusAsync({ shouldPlay: false });
        };
        stopVideo();
      };
    }, [])
  );

  useEffect(() => {
    return () => {
      // Cleanup function to pause video when component unmounts
      const stopVideo = async () => {
        await video.current.setStatusAsync({ shouldPlay: false });
      };
      stopVideo();
    };
  }, []);

  useEffect(() => {
    console.log("Video URI:", reel.reel.video);
  }, []);

  const goToUpload = () => {
    navigation.navigate("Upload");
  };

  return (
    <View style={styles.container}>
      <Video
        ref={video}
        style={styles.video}
        source={{ uri: reel.reel.video }}
        resizeMode={ResizeMode.CONTAIN}
        isLooping
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        useNativeControls={false}
      />

      <View style={styles.overlay}>
        {/* Your overlay components */}
        <Pressable onPress={goToUpload} style={styles.overlayButton}>
          <AntDesign name="pluscircleo" size={24} color="black" />
        </Pressable>

        <View style={{ alignItems: "center", gap: 5 }}>
          <Text style={{ color: "white" }}>35</Text>
          <AntDesign name="like1" size={28} color="white" />
        </View>

        <View style={{ alignItems: "center", gap: 5 }}>
          <Text style={{ color: "white" }}>9</Text>
          <AntDesign name="dislike1" size={28} color="white" />
        </View>
        <View
          style={{ alignItems: "center", gap: 5, justifyContent: "center" }}>
          <FontAwesome name="comments" size={28} color="white" />
          <Text style={{ color: "white" }}>23</Text>
        </View>
      </View>

      <View style={styles.userDetails}>
        {/* Your user details components */}
        <Image
          source={require("../assets/profile.jpg")}
          style={styles.profileImage}
        />
        <Text style={styles.username}>John Doe</Text>
        <TouchableOpacity style={styles.followButton}>
          <Text style={styles.followButtonText}>Follow</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  video: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  container: {
    flex: 1,
    backgroundColor: "#ecf0f1",
  },
  overlay: {
    position: "absolute",
    bottom: 55,
    right: 10,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    gap: 10,
  },
  overlayButton: {
    alignItems: "center",
    gap: 5,
  },
  userDetails: {
    position: "absolute",
    bottom: 55,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    left: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
    resizeMode: "contain",
  },
  username: {
    color: "#fff",
    fontSize: 18,
  },
  followButton: {
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 5,
  },
  followButtonText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default VideoItem;
