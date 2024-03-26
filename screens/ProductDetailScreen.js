import React, { useState, useEffect, useContext } from "react";
import {
  SafeAreaView,
  View,
  Image,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  Pressable,
} from "react-native";
import axios from "axios";
import { UserType } from "../UserContext";
import { useNavigation } from "@react-navigation/native";

const ProductDetailScreen = ({ route }) => {
  const { productId } = route.params;
  const [product, setProduct] = useState(null);

  const navigation = useNavigation();

  const { userId } = useContext(UserType);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://192.168.255.57:5000/api/products/get-product/${productId}`
        );
        setProduct(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
  }, []);

  const handleMessageSeller = () => {
    navigation.navigate("Messages", {
      headerTitle: product?.business.owner.username,
      chatUserId: product?.business.owner.id,
      profilePic: product?.business.owner.profilePic,
    });
  };

  const renderItem = ({ item }) => (
    <Image style={styles.image} source={{ uri: item }} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.businessInfo}>
          <Image
            style={styles.profilePic}
            source={{ uri: product?.business.owner.profilePic }}
          />
          <View>
            <Text style={styles.businessName}>{product?.business.name}</Text>
            <Text style={styles.username}>
              {product?.business.owner.username}
            </Text>
          </View>
        </View>

        <FlatList
          style={{ marginTop: 14 }}
          data={product?.images}
          renderItem={renderItem}
          horizontal
          snapToInterval={Dimensions.get("window").width} // Width of the screen
          snapToAlignment={"start"}
          decelerationRate={"fast"}
          showsHorizontalScrollIndicator={false} // Remove the scroll bar
        />
      </View>

      <View style={{ marginTop: 16 }}>
        <View style={{ flexDirection: "row", gap: 5 }}>
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>Name:</Text>
          <Text style={{ fontSize: 18, color: "#008E97" }}>
            {" "}
            {product?.name}
          </Text>
        </View>
        <View style={{ flexDirection: "row", gap: 14, marginTop: 10 }}>
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>Price:</Text>
          <Text style={{ fontSize: 18, color: "#008E97" }}>
            Ksh {product?.price}
          </Text>
        </View>
        <View style={{ gap: 5 }}>
          <Text style={{ fontWeight: "bold", fontSize: 20, marginTop: 10 }}>
            Description:
          </Text>
          <Text style={{ fontSize: 14, color: "#008E97" }}>
            {" "}
            {product?.description}
          </Text>
        </View>
      </View>
      {product?.business.owner.id === userId ? (
        <Pressable
          style={{
            width: "100%",
            marginTop: 20,
            justifyContent: "center",
            alignItems: "center",
            paddingVertical: 10,
            paddingHorizontal: 14,
            backgroundColor: "#008E97",
            borderRadius: 6,
          }}>
          <Text style={{ color: "#fff", fontSize: 18 }}>Edit Product</Text>
        </Pressable>
      ) : (
        <Pressable
          onPress={handleMessageSeller}
          style={{
            width: "100%",
            marginTop: 20,
            justifyContent: "center",
            alignItems: "center",
            paddingVertical: 10,
            paddingHorizontal: 14,
            backgroundColor: "#008E97",
            borderRadius: 6,
          }}>
          <Text style={{ color: "#fff", fontSize: 18 }}>Message Seller</Text>
        </Pressable>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 6,
    paddingTop: 30,
  },
  businessInfo: {
    alignItems: "center",
    gap: 14,
    flexDirection: "row",
  },
  profilePic: {
    width: 50,
    height: 50,
    resizeMode: "contain",
    borderRadius: 25,
  },
  businessName: {
    fontWeight: "bold",
    fontSize: 22,
    color: "#008E97",
  },
  username: {
    fontSize: 14,
    color: "#008E97",
  },
  image: {
    width: Dimensions.get("window").width, // Width of the screen
    height: 250, // Fixed height,
    resizeMode: "cover",
  },
});

export default ProductDetailScreen;
