import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Alert,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const RegisterExpertScreen = () => {
  const [description, setDescription] = useState("");
  const navigation = useNavigation();

  const createExpert = async () => {
    try {
      const response = await axios.post(
        "http://192.168.255.57:5000/api/auth/create-expert",
        {
          description: description,
        }
      );
      Alert.alert("Congratulations. You are now an expert.");
      navigation.navigate("Account");
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.heading}>Register as an Expert</Text>
        <Text style={styles.subheading}>
          You are about to register as an expert!
        </Text>
        <Text style={styles.subheading}>Tap below to continue.</Text>
        <TextInput
          multiline={true}
          onChangeText={(text) => setDescription(text)}
          value={description}
          style={{
            width: 300,
            fontSize: 16,
            marginTop: 20,
            borderColor: "#008E97",
            borderWidth: 1,
            borderRadius: 5,
            paddingHorizontal: 10,
            paddingVertical: 8,
          }}
          placeholder="Enter your description"
        />
      </View>
      <Pressable onPress={createExpert} style={styles.button}>
        <Text style={styles.buttonText}>Register</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default RegisterExpertScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  textContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#008E97",
  },
  subheading: {
    fontSize: 18,
    textAlign: "center",
    color: "#555",
  },
  button: {
    backgroundColor: "#008E97",
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 40,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
