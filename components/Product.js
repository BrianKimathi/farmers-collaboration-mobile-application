import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Product = ({ product }) => {
  const navigation = useNavigation();

  const handleViewProduct = (id) => {
    navigation.navigate("ProductDetail", { productId: product._id });
  };

  return (
    <View style={styles.cardContainer}>
      {/* Product Image */}
      <Image style={styles.image} source={{ uri: product.images[0] }} />
      {/* Product Details */}
      <View style={styles.textContainer}>
        {/* Product Title */}
        <Text style={styles.title}>{product.name}</Text>

        {/* Product Price */}
        <Text style={styles.price}>Ksh. {product.price}</Text>

        {/* View Product Button */}
        <TouchableOpacity
          onPress={handleViewProduct}
          style={styles.viewProductButton}>
          <Text style={styles.viewProductButtonText}>View Product</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Product;

const styles = StyleSheet.create({
  cardContainer: {
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#008E97",
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
  image: {
    width: 125,
    height: 125,
    resizeMode: "contain",
    borderRadius: 10,
  },
  textContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#008E97",
    marginBottom: 5,
    textAlign: "center",
  },
  price: {
    fontSize: 16,
    marginBottom: 5,
    color: "green",
  },
  viewProductButton: {
    backgroundColor: "#008E97",
    borderRadius: 5,
    width: 125,
    paddingVertical: 8,
    marginTop: 8,
  },
  viewProductButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
  },
});
