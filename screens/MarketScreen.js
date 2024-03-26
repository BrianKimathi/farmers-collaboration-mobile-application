import {
  Platform,
  StyleSheet,
  TextInput,
  View,
  ScrollView,
  Text,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Product from "../components/Product";
import { useNavigation } from "@react-navigation/native";
import { UserType } from "../UserContext";
import axios from "axios";

const MarketScreen = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);

  const { businessId } = useContext(UserType);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `http://192.168.255.57:5000/api/products`
      );
      console.log(response.data);
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
        paddingTop: Platform.OS === "android" ? 10 : 0,
        paddingHorizontal: 10,
      }}>
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          padding: 8,
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
          Products:
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}>
          {products &&
            products.map((product) => (
              <Product key={product._id} product={product} />
            ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MarketScreen;

const styles = StyleSheet.create({});
