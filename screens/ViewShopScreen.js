import {
  StyleSheet,
  Text,
  SafeAreaView,
  Platform,
  ScrollView,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { Ionicons } from "@expo/vector-icons";
import Product from "../components/Product";
import { useNavigation } from "@react-navigation/native";
import { UserType } from "../UserContext";
import axios from "axios";

const ViewShopScreen = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);

  const { businessId } = useContext(UserType);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `http://192.168.255.57:5000/api/products/${businessId}`
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

  const handleCreateProduct = () => {
    navigation.navigate("CreateProduct");
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
        paddingTop: Platform.OS === "android" ? 30 : 0,
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
          placeholder="Search products..."
          style={{ flex: 1, backgroundColor: "#fff", fontSize: 16 }}
        />
        <Ionicons
          style={{ backgroundColor: "#fff" }}
          name="search"
          size={24}
          color="#008E97"
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 10,
          width: "100%",
          alignItems: "center",
        }}>
        <TouchableOpacity
          onPress={handleCreateProduct}
          style={{
            padding: 10,
            backgroundColor: "#008E97",
            width: "100%",
            borderRadius: 10,
            flexDirection: "row",
            justifyContent: "space-between",
          }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ color: "white", fontSize: 16 }}>
              Create New Product
            </Text>
          </View>
          <Ionicons name="create" size={24} color="white" />
        </TouchableOpacity>
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
          Your Products:
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

export default ViewShopScreen;

const styles = StyleSheet.create({});
