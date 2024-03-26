import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const ExpertDetailScreen = ({ route }) => {
  const navigation = useNavigation();
  const { expertId } = route.params;
  const [expert, setExpert] = useState(null);
  const [rating, setRating] = useState(null);

  useEffect(() => {
    const fetchExpertData = async () => {
      try {
        const response = await axios.get(
          `http://192.168.255.57/api/users/experts/${expertId}`
        );
        setExpert(response.data);
      } catch (error) {
        console.log("Error fetching expert data:", error.message);
      }
    };
    fetchExpertData();
  }, [expertId]);

  const handleRateExpert = async (newRating) => {
    try {
      await axios.post(
        `http://192.168.255.57:5000/api/users/experts/rate/${expertId}`,
        { rating: newRating }
      );
      // Update the local state with the new rating
      setRating(newRating);
    } catch (error) {
      console.log("Error rating expert:", error.message);
    }
  };

  const handleConnect = () => {
    navigation.navigate("Messages", {
      headerTitle: expert.user.username,
      chatUserId: expert.user._id,
      profilePic: expert.user.profilePic,
    });
  };

  if (!expert) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.image} source={{ uri: expert.user.profilePic }} />
      <Text style={styles.name}>{expert.user.username}</Text>
      <View style={styles.ratingContainer}>
        {[...Array(5)].map((_, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleRateExpert(index + 1)}>
            <Ionicons
              name="star"
              size={20}
              color={index < rating ? "#FFD700" : "#C0C0C0"}
            />
          </TouchableOpacity>
        ))}
        <Text style={styles.ratingText}>
          {expert.rating.toFixed(1)} from {expert.votesCount} people
        </Text>
      </View>
      <Text style={styles.description}>{expert.description}</Text>
      <View style={styles.followedByContainer}>
        <Text style={styles.followedByText}>Followed by</Text>
        <View style={styles.circularImagesContainer}>
          {expert.user.followers.slice(0, 3).map((follower, index) => (
            <Image
              key={index}
              style={styles.circularImage}
              source={{ uri: follower.profilePic }}
            />
          ))}
          {expert.user.followers.length > 3 && (
            <Text style={styles.ellipsis}> ... and others.</Text>
          )}
        </View>
      </View>
      <TouchableOpacity onPress={handleConnect} style={styles.connectButton}>
        <Text style={styles.connectButtonText}>Connect</Text>
      </TouchableOpacity>
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderRadius: 10,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#008E97",
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 16,
    color: "#008E97",
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: "justify",
  },
  connectButton: {
    backgroundColor: "#008E97",
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: "center",
    marginTop: 20,
  },
  connectButtonText: {
    color: "white",
    fontSize: 18,
  },
  followedByContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },
  followedByText: {
    fontSize: 16,
    marginRight: 8,
  },
  circularImagesContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  circularImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 5,
  },
  ellipsis: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 5,
  },
});

export default ExpertDetailScreen;
