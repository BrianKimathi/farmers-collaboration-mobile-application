import React, { useState } from "react";
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
import { RadioButton } from "react-native-paper";
// Import RadioButton from react-native-paper
import axios from "axios";

const RegisterScreen = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [gender, setGender] = useState("male"); // Default to "male"

  const navigation = useNavigation();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleGenderChange = (value) => {
    setGender(value);
  };

  const handleRegister = () => {
    const user = {
      username,
      email,
      password,
      confirmPassword,
      gender,
    };

    axios
      .post("http://192.168.255.57:5000/api/auth/signup", user)
      .then((res) => {
        console.log(res);
        Alert.alert(
          "Registration Successful",
          "You have successfully registered"
        );
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        navigation.replace("Login");
      })
      .catch((err) => {
        console.log(err);
        Alert.alert("Registration Failed", "Please try again");
      });
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
        <Text style={{ fontSize: 18 }}>Username:</Text>
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="Enter your username"
            value={username}
            onChangeText={(text) => setUsername(text)} // Fix this line to update the email state
          />
        </View>
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
        <Text style={{ fontSize: 18 }}>Confirm Password:</Text>
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="Repeat your password"
            secureTextEntry={!showPassword}
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
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
        <Text style={{ fontSize: 18 }}>Gender:</Text>
        <View style={styles.genderContainer}>
          <View style={styles.radioButtonContainer}>
            <RadioButton
              value="male"
              status={gender === "male" ? "checked" : "unchecked"}
              onPress={() => handleGenderChange("male")}
            />
            <Text style={styles.radioButtonText}>Male</Text>
          </View>
          <View style={styles.radioButtonContainer}>
            <RadioButton
              value="female"
              status={gender === "female" ? "checked" : "unchecked"}
              onPress={() => handleGenderChange("female")}
            />
            <Text style={styles.radioButtonText}>Female</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity onPress={handleRegister} style={styles.button}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity
        onPress={() => navigation.navigate("Main")}
        style={styles.button}>
        <Text style={styles.buttonText}>Go Home</Text>
      </TouchableOpacity> */}
      <View
        style={{ flexDirection: "row", marginTop: 10, gap: 5, marginTop: 20 }}>
        <Text style={{ fontSize: 15 }}>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={{ fontSize: 14, textDecorationLine: "underline" }}>
            Login Now.
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterScreen;

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
    backgroundColor: "#3498db",
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
    color: "#fff",
  },
  genderContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  radioButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioButtonText: {
    marginLeft: 8,
    fontSize: 16,
  },
});
