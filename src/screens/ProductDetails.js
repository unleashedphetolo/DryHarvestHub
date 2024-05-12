import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import Constants from "expo-constants";

const ProductDetails = ({ route }) => {
  const { product } = route.params;
  return (
    <View
      style={{
        marginTop: Constants.statusBarHeight,
        padding: 20,
        flex: 1,
        backgroundColor: "white",
        justifyContent: 'space-between'
      }}
    >
        <View>

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

        <TouchableOpacity >
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
              Add to cart
            </Text>
          </TouchableOpacity>


    </View>
  );
};

export default ProductDetails;
