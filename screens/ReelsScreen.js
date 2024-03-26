import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  useCallback,
  useMemo,
} from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  FlatList,
  Pressable,
  ScrollView,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Video, ResizeMode } from "expo-av";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { AntDesign, FontAwesome, Feather } from "@expo/vector-icons";
import { Image } from "react-native";
import axios from "axios";
import { UserType } from "../UserContext";
import { BottomModal, ModalContent, SlideAnimation } from "react-native-modals";

const ReelsScreen = () => {
  const [reels, setReels] = useState([]);
  const navigation = useNavigation();
  const flatListRef = useRef(null);
  const [currentVisibleIndex, setCurrentVisibleIndex] = useState(0);
  const videoRefs = useRef({});
  const [status, setStatus] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [newComment, setNewComment] = useState(""); // State to hold the new comment text
  const [currentVideoIndex, setCurrentVideoIndex] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false); // Move isFollowing state here

  // Toggle modal visibility for the current video
  const toggleModalVisibility = (index) => {
    setCurrentVideoIndex(index === currentVideoIndex ? null : index);
  };

  // Function to handle adding a new comment
  const handleAddComment = async (reelId, index) => {
    try {
      if (!newComment.trim()) return; // Check if the comment is empty

      // Send the request to add the comment to the backend
      await axios.post(
        `http://192.168.255.57:5000/api/reels/comment/${reelId}`,
        {
          comment: newComment.trim(),
        }
      );

      // Optimistically update the UI by adding the new comment to the local state
      const updatedReels = [...reels];
      updatedReels[index].comments.push(newComment.trim());
      setReels(updatedReels);

      // Clear the input field after adding the comment
      setNewComment("");
    } catch (error) {
      console.error(error);
      // Handle error if necessary
    }
  };

  // Function to handle typing in the comment input field
  const handleChangeComment = (text) => {
    setNewComment(text);
  };

  const { userId } = useContext(UserType);

  useEffect(() => {
    axios
      .get("http://192.168.255.57:5000/api/reels")
      .then((response) => {
        setReels(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  function generateUniqueId() {
    return Math.random().toString(36).substr(2, 9);
  }

  useFocusEffect(
    React.useCallback(() => {
      const unsubscribe = navigation.addListener("focus", () => {
        axios
          .get("http://192.168.255.57:5000/api/reels")
          .then((response) => {
            setReels(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      });

      return unsubscribe;
    }, [navigation])
  );

  useEffect(() => {
    // Cleanup function to pause all videos when component unmounts
    return () => {
      Object.values(videoRefs.current).forEach(async (ref) => {
        if (ref) {
          await ref.pauseAsync();
        }
      });
    };
  }, []);

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentVisibleIndex(viewableItems[0].index);
    }
  }).current;

  const renderVideoItem = ({ item, index }) => {
    const isFollowing = item.user.followers.includes(userId);

    return (
      <Pressable onPress={() => handleVideoPress(index)}>
        <View style={styles.container}>
          <Video
            ref={(ref) => {
              videoRefs.current[index] = ref;
            }}
            style={styles.video}
            source={{ uri: item.video }}
            resizeMode={ResizeMode.CONTAIN}
            isLooping
            onPlaybackStatusUpdate={(status) => setStatus(() => status)}
            useNativeControls={false}
            shouldPlay={index === currentVisibleIndex} // Auto-play only if it's the currently visible video
          />
          <View style={styles.overlay}>
            {/* Your overlay components */}
            <Pressable onPress={goToUpload} style={styles.overlayButton}>
              <AntDesign name="pluscircleo" size={24} color="white" />
            </Pressable>

            <View style={{ alignItems: "center", gap: 5 }}>
              <Text style={{ color: "white" }}>{item.likes?.length || 0}</Text>
              <AntDesign
                name="like1"
                size={36}
                color={item.likes?.includes(userId) ? "blue" : "white"}
                onPress={() => handleLikePress(item._id, index)} // Pass index here
              />
            </View>

            <View style={{ alignItems: "center", gap: 5 }}>
              <Text style={{ color: "white" }}>
                {item.dislikes?.length || 0}
              </Text>
              <AntDesign
                name="dislike1"
                size={36}
                color={item.dislikes?.includes(userId) ? "blue" : "white"}
                onPress={() => handleDislikePress(item._id, index)} // Pass index here
              />
            </View>

            <View
              style={{
                alignItems: "center",
                gap: 5,
                justifyContent: "center",
              }}>
              <Text style={{ color: "white" }}>{item.comments.length}</Text>
              <FontAwesome
                name="comments"
                size={36}
                color="white"
                onPress={() => toggleModalVisibility(index)} // open modal for the current video
              />
            </View>
          </View>

          <View style={styles.userDetails}>
            {/* User details and follow button */}
            <Image
              source={{ uri: item.user.profilePic }}
              style={styles.profileImage}
            />
            <Text style={styles.username}>{item.user.username}</Text>
            {isFollowing ? (
              <Text style={styles.followingText}>Following</Text>
            ) : (
              <TouchableOpacity
                onPress={() => handleFollowClick(item.user._id, index)}
                style={styles.followButton}>
                <Text style={styles.followButtonText}>Follow</Text>
              </TouchableOpacity>
            )}
          </View>
          <BottomModal
            onBackdropPress={() => setModalOpen(!modalOpen)}
            swipeDirection={["up", "down"]}
            swipeThreshold={200}
            modalAnimation={
              new SlideAnimation({
                slideFrom: "bottom",
              })
            }
            onHardwareBackPress={() => setModalOpen(!modalOpen)}
            visible={index === currentVideoIndex}
            onTouchOutside={() => toggleModalVisibility(index)}>
            <ModalContent style={{ width: "100%", height: 400 }}>
              <View>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    color: "#008E97",
                  }}>
                  Comments
                </Text>
              </View>
              <ScrollView
                vertical
                showsVerticalScrollIndicator
                style={{ marginTop: 8 }}>
                {item.comments.map((comment) => (
                  <Text
                    style={{
                      fontSize: 14,
                      paddingVertical: 4,
                      paddingHorizontal: 6,
                      backgroundColor: "lightgray",
                      borderRadius: 10,
                      width: "auto", // Set width to 'auto'
                      alignSelf: "flex-start", // Align to the start of the container
                      marginVertical: 2,
                    }}>
                    {comment}
                  </Text>
                ))}
              </ScrollView>
              <View
                style={{
                  position: "absolute",
                  bottom: 4,
                  width: Dimensions.get("window").width,
                  margin: 4,
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  flex: 1,
                }}>
                <TextInput
                  placeholder="Comment..."
                  style={{
                    flex: 1,
                    borderWidth: 1,
                    paddingHorizontal: 6,
                    paddingVertical: 8,
                    borderRadius: 10,
                  }}
                  value={newComment}
                  onChangeText={handleChangeComment} // Update the new comment text state
                />
                <Pressable
                  onPress={() => handleAddComment(item._id, index)} // Pass the reelId and index to add the comment
                  style={{
                    marginLeft: 10,
                    marginRight: 10,
                    borderRadius: 50,
                    backgroundColor: "#008E97",
                    height: 50,
                    width: 50,
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                  <Feather name="send" size={24} color="white" />
                </Pressable>
              </View>
            </ModalContent>
          </BottomModal>
        </View>
      </Pressable>
    );
  };

  const handleLikePress = async (reelId, index) => {
    try {
      console.log("Pressed, index id is: ", index);
      // Check if reels exists before updating UI
      if (!reels || !reels[index]) return;

      const updatedReels = [...reels];
      const updatedReel = { ...updatedReels[index] };

      // Check if the user has already liked this reel
      if (!updatedReel.likes.includes(userId)) {
        // Optimistically update the UI
        updatedReel.likes = [...updatedReel.likes, userId];
        updatedReel.dislikes = updatedReel.dislikes.filter(
          (dislikeUserId) => dislikeUserId !== userId
        );
        updatedReels[index] = updatedReel;
        setReels(updatedReels);

        // Send the request to the backend
        await axios.post(`http://192.168.255.57:5000/api/reels/like/${reelId}`);
      }
    } catch (error) {
      console.error(error);
      // Handle error if necessary, such as reverting the UI changes
    }
  };

  const handleDislikePress = async (reelId, index) => {
    try {
      // Check if reels exists before updating UI
      if (!reels || !reels[index]) return;

      const updatedReels = [...reels];
      const updatedReel = { ...updatedReels[index] };

      // Check if the user has already disliked this reel
      if (!updatedReel.dislikes.includes(userId)) {
        // Optimistically update the UI
        updatedReel.dislikes = [...updatedReel.dislikes, userId];
        updatedReel.likes = updatedReel.likes.filter(
          (likeUserId) => likeUserId !== userId
        );
        updatedReels[index] = updatedReel;
        setReels(updatedReels);

        // Send the request to the backend
        await axios.post(
          `http://192.168.255.57:5000/api/reels/dislike/${reelId}`
        );
      }
    } catch (error) {
      console.error(error);
      // Handle error if necessary, such as reverting the UI changes
    }
  };

  const handleFollowClick = async (userId, reelIndex) => {
    try {
      // Update the follow status for reels belonging to the followed user
      const updatedReels = reels.map((reel, index) => {
        if (reel.user._id === userId) {
          return {
            ...reel,
            user: {
              ...reel.user,
              followers: [...reel.user.followers, userId],
            },
          };
        }
        return reel;
      });

      // Update the state with the modified reels data
      setReels(updatedReels);
      await axios.post(`http://192.168.255.57:5000/api/auth/follow/${userId}`);

      // Update the isFollowing state globally
      setIsFollowing(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleVideoPress = (index) => {
    const videoRef = videoRefs.current[index];
    if (videoRef) {
      videoRef.getStatusAsync().then((status) => {
        if (status.isPlaying) {
          videoRef.pauseAsync();
        } else {
          videoRef.playAsync();
        }
      });
    }
  };

  const goToUpload = () => {
    navigation.navigate("Upload");
  };

  useFocusEffect(
    React.useCallback(() => {
      // Pause all videos when navigating away from the screen
      return () => {
        Object.values(videoRefs.current).forEach(async (ref) => {
          if (ref) {
            await ref.pauseAsync();
          }
        });
      };
    }, [])
  );

  const handleConnectWithUsers = async () => {
    navigation.navigate("ViewUsers");
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        {reels.length > 0 ? (
          <FlatList
            ref={flatListRef}
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={{
              itemVisiblePercentThreshold: 50,
            }}
            vertical
            showsHorizontalScrollIndicator={false}
            snapToAlignment="start"
            decelerationRate="normal"
            snapToInterval={Dimensions.get("window").height}
            data={reels}
            keyExtractor={(item) => (item._id ? item._id.toString() : "")}
            renderItem={renderVideoItem}
          />
        ) : (
          <View style={styles.create}>
            <Pressable
              onPress={goToUpload}
              style={{
                paddingVertical: 10,
                paddingHorizontal: 14,
                backgroundColor: "#008E97",
                borderRadius: 4,
              }}>
              <Text style={{ color: "white" }}>Create Reel</Text>
            </Pressable>
          </View>
        )}
      </SafeAreaView>
    </>
  );
};

export default ReelsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ecf0f1",
  },
  create: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  video: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  overlay: {
    position: "absolute",
    bottom: 55,
    right: 10,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    gap: 10,
    zIndex: 10,
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
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  followingText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
