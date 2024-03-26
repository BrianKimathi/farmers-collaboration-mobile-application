import { StyleSheet, Text, View, ScrollView, TextInput } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Connect from "../components/Connect";
import axios from "axios";
import { UserType } from "../UserContext";

const ViewUsersScreen = () => {
  const [users, setUsers] = useState([]);

  const { userId } = useContext(UserType);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://192.168.255.57:5000/api/users"
        );
        console.log(response.data);
        setUsers(response.data);
      } catch (error) {
        console.log("Error: ", error);
      }
    };

    fetchUsers();
  }, []);

  const handleFollowClick = async (userId, index) => {
    console.log("Follow clicked!");
    try {
      // Perform the follow action on the backend
      await axios.post(`http://192.168.255.57:5000/api/auth/follow/${userId}`);

      // Update the follow status for the followed user
      setUsers((prevUsers) => {
        return prevUsers.map((user, idx) => {
          if (idx === index) {
            return {
              ...user,
              followers: [...user.followers, userId],
            };
          }
          return user;
        });
      });

      // Optionally, update any global state related to following
      // setIsFollowing(true);
    } catch (error) {
      console.error(error);
      // Optionally, handle error state or display error message
    }
  };

  console.log("Users: ", users);

  return (
    <SafeAreaView
      style={{
        paddingHorizontal: 10,
      }}>
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          padding: 10,
          alignItems: "center",
          borderWidth: 1,
          borderColor: "#008E97",
          borderRadius: 10,
        }}>
        <TextInput
          placeholder="Search expert..."
          style={{ flex: 1, backgroundColor: "#fff", fontSize: 16 }}
        />
        <Ionicons
          style={{ backgroundColor: "#fff" }}
          name="search"
          size={24}
          color="#008E97"
        />
      </View>
      <ScrollView
        vertical
        showVerticalScrollIndicator={false}
        style={{ marginTop: 6 }}>
        <Text
          style={{
            fontSize: 24,
            marginTop: 10,
            fontWeight: "bold",
            color: "#008E97",
          }}>
          Users:
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}>
          {users.map((user, index) => (
            <Connect
              farmer={user}
              key={index}
              handleFollowUser={() => handleFollowClick(user._id, index)}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ViewUsersScreen;

const styles = StyleSheet.create({});
