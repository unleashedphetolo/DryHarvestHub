import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import Constants from "expo-constants";
import AppContext from "../context/app/appContext";
import { Ionicons } from "@expo/vector-icons";

const ProductDetails = ({ route, navigation }) => {
  const { product } = route.params;

  const { addToCart, cart } = useContext(AppContext);

  return (
    <View
      style={{
        marginTop: Constants.statusBarHeight,
        padding: 20,
        flex: 1,
        backgroundColor: "white",
        justifyContent: "space-between",
      }}
    >
      <View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 20,
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View>
              <Ionicons name="arrow-back-outline" size={24} color="black" />
            </View>
          </TouchableOpacity>

          <Text style={{ color: "black", fontSize: 18, fontWeight: "700" }}>
            {product.title}
          </Text>

          <View />
        </View>
        <Image
          source={{ uri: product.image }}
          style={{
            width: "100%",
            height: 250,
            borderRadius: 10,
          }}
        />
        <Text
          style={{
            color: "black",
            fontWeight: "700",
            marginTop: 10,
            fontSize: 20,
          }}
        >
          {product.title}
        </Text>
        <Text style={{ color: "black", fontWeight: "500" }}>
          R {product.price}
        </Text>
        <Text style={{ color: "black", fontWeight: "500" }}>
          {product.description}
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => {
          if (cart.some((item) => item.id == product.id)) {
            navigation.navigate("Cart");
          } else {
            addToCart({ ...product, quantity: 1 });
            console.log(cart);
          }
        }}
      >
        <Text
          style={{
            textAlign: "center",
            backgroundColor: "#108437",
            color: "white",
            padding: 15,
            fontWeight: "800",
            marginTop: 10,
            borderRadius: 5,
          }}
        >
          {cart.some((item) => item.id == product.id)
            ? "Go to cart"
            : "Add to cart"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProductDetails;
