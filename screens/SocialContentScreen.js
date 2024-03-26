import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { Video, ResizeMode } from "expo-av";

const SocialContentScreen = () => {
  const [socialContent, setSocialContent] = useState([]);

  const getMyReels = async () => {
    try {
      const response = await axios.get(
        "http://192.168.255.57:5000/api/reels/current-user"
      );
      console.log(response.data);
      setSocialContent(response.data);
    } catch (error) {
      console.error("Error fetching reels:", error);
    }
  };

  useEffect(() => {
    getMyReels();
  }, []);

  const deleteReel = async (reelId) => {
    try {
      await axios.delete(`http://192.168.255.57:5000/api/reels/${reelId}`);
      getMyReels();
    } catch (error) {
      console.error("Error deleting reel:", error);
    }
  };

  return (
    <View style={{ flex: 1, paddingHorizontal: 4 }}>
      {socialContent.length > 0 ? (
        <ScrollView>
          {socialContent.map((reel) => (
            <View key={reel._id} style={styles.reelContainer}>
              <Video
                style={styles.video}
                source={{ uri: reel.video }}
                resizeMode={ResizeMode.CONTAIN}
                isLooping
                useNativeControls={false}
              />
              <View style={styles.overlay}>
                {/* Your overlay components */}
                <TouchableOpacity onPress={() => deleteReel(reel._id)}>
                  <View style={styles.deleteButton}>
                    <Text style={styles.deleteButtonText}>Delete</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      ) : (
        <View style={styles.noReelsContainer}>
          <Text style={styles.noReelsText}>No Reels</Text>
        </View>
      )}
    </View>
  );
};

export default SocialContentScreen;

const styles = StyleSheet.create({
  reelContainer: {
    marginBottom: 20,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    overflow: "hidden",
  },
  video: {
    width: "100%",
    height: 200, // Fixed height for the video
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 10,
  },
  deleteButton: {
    backgroundColor: "#ffcccc",
    paddingVertical: 8,
    alignItems: "center",
    borderRadius: 5,
  },
  deleteButtonText: {
    color: "#ff0000",
    fontWeight: "bold",
  },
  noReelsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noReelsText: {
    fontSize: 24,
    marginTop: 10,
    fontWeight: "bold",
    color: "#008E97",
  },
});
