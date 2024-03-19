import {
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const LoginScreen = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    console.log("Checking login state...");
    const checkLoginState = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        if (token) {
          console.log("Token found. Redirecting to Main...");
          navigation.replace("Main");
        }
      } catch (err) {
        console.error("Error checking login state:", err);
      }
    };

    checkLoginState();
  }, []);

  const handleLogin = () => {
    const user = {
      email: email,
      password: password,
    };

    axios
      .post("http://192.168.0.107:5000/api/auth/login", user)
      .then((response) => {
        const token = response.headers["set-cookie"][0]
          .split("=")[1]
          .split(";")[0];
        console.log(response.data);
        const username = response.data.username;
        const profilePic = response.data.profilePic;
        AsyncStorage.setItem("authToken", token);
        AsyncStorage.setItem("username", username);
        AsyncStorage.setItem("profilePic", profilePic);
        navigation.replace("Main");
      })
      .catch((err) => {
        Alert.alert("Login Errror", "Invalid credentials!");
        console.log(err);
      });
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}>
      <Image
        style={{
          width: 100,
          height: 100,
          resizeMode: "contain",
          borderRadius: 50,
        }}
        source={require("../assets/logo.png")}
      />
      <Text style={{ fontSize: 24, marginTop: 10 }}>FarmHub-Nexus</Text>
      <View style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 18 }}>Email:</Text>
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <Text style={{ fontSize: 18 }}>Password:</Text>
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <TouchableOpacity
            style={styles.toggleButton}
            onPress={toggleShowPassword}>
            {showPassword ? (
              <Ionicons
                style={styles.toggleIcon}
                name="eye"
                size={24}
                color="black"
              />
            ) : (
              <Ionicons
                style={styles.toggleIcon}
                name="eye-off-sharp"
                size={24}
                color="black"
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <View
        style={{ flexDirection: "row", marginTop: 10, gap: 5, marginTop: 20 }}>
        <Text style={{ fontSize: 15 }}>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text
            style={{
              fontSize: 14,
              textDecorationLine: "underline",
            }}>
            Register Now.
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 10,
    width: "100%",
  },
  input: {
    flex: 1,
    height: 40,
    width: "100%",
  },
  toggleButton: {
    padding: 10,
  },
  toggleIcon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  button: {
    width: "100%",
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    borderRadius: 10,
    backgroundColor: "#3498db", // Set your desired background color
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    textAlign: "center",
    color: "#fff", // Set your desired text color
  },
});
