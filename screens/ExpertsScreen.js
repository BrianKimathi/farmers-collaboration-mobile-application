import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  TextInput,
  ScrollView,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import Expert from "../components/Expert";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

const ExpertsScreen = () => {
  const [experts, setExperts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    const getExperts = async () => {
      try {
        const response = await axios.get(
          "http://192.168.255.57:5000/api/users/experts"
        );
        console.log("Experts: ", response.data);
        setExperts(response.data);
      } catch (error) {
        console.log("Error fetching experts:", error.message);
      }
    };
    getExperts();
  }, []);

  const handleSearch = () => {
    // Implement search functionality here
    // Filter experts based on searchQuery
    // Update experts state
  };

  const goToChat = () => {
    navigation.navigate("AiChat");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search expert..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
        />
        <Ionicons
          style={styles.searchIcon}
          name="search"
          size={24}
          color="#008E97"
          onPress={handleSearch}
        />
      </View>
      <View
        style={{
          marginVertical: 10,
          width: "100%",
        }}>
        <Pressable
          onPress={goToChat}
          style={{
            backgroundColor: "#008E97",
            paddingVertical: 10,
            paddingHorizontal: 4,
            borderRadius: 6,
          }}>
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              textAlign: "center",
              fontSize: 18,
            }}>
            Ask AI Assistant
          </Text>
        </Pressable>
      </View>
      <Text style={styles.title}>Experts:</Text>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {experts.map((expert) => (
          <Expert key={expert._id} expert={expert} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? 10 : 0,
    paddingHorizontal: 10,
  },
  searchContainer: {
    flexDirection: "row",
    width: "100%",
    padding: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#008E97",
    borderRadius: 10,
  },
  searchInput: {
    flex: 1,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  searchIcon: {
    backgroundColor: "#fff",
  },
  scrollContainer: {
    marginTop: 6,
    flexDirection: "row",
  },
  title: {
    fontSize: 24,
    marginTop: 6,
    fontWeight: "bold",
    color: "#008E97",
  },
});

export default ExpertsScreen;
