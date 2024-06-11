import { View, Text, TouchableOpacity, FlatList, Image } from "react-native";
import React, { useContext, useEffect } from "react";
import constants from "expo-constants";
import AppContext from "../context/app/appContext";
import AuthContext from "../context/auth/authContext";

const products = [
  {
    id: 1,
    title: "Mango Chunks - Great Value 400g",
    price: 129.9,
    description:
      " Mango Chunks are a sweet delicious mixture of mango pieces, strips and chunks. They are partly dried to sweet-tart perfection. ",
    image:
      "https://www.thespruceeats.com/thmb/jMn1JBmk4h0xR_0hgche6xnjZ3I=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/what-is-freeze-dried-fruit-5193827-still-life-3d85d69de7d0457da8a85e1a98879929.jpg",
  },
  {
    id: 5,
    title: "Prunes Pitted - Choice Grade 450g",
    price: 129.9,
    description:
      "Prunes are sweet and juicy, making them ideal for snacking and cooking. Your grandmother’s favourites are the best natural laxative on the market and has been proven to promote gut health.",
    image:
      "https://www.thespruceeats.com/thmb/jMn1JBmk4h0xR_0hgche6xnjZ3I=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/what-is-freeze-dried-fruit-5193827-still-life-3d85d69de7d0457da8a85e1a98879929.jpg",
  },
];

const ProducerProducts = ({ navigation }) => {
  const {
    getProducerProducts,
    producerProducts: products,
    productsLoading: loading,
  } = useContext(AppContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    getProducerProducts(user.id);
  }, []);

  return (
    <View
      style={{
        marginTop: constants.statusBarHeight,
        padding: 20,
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ fontWeight: "600", fontSize: 25 }}>
          Producer Products
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("AddProduct")}>
          <Text
            style={{
              padding: 10,
              backgroundColor: "green",
              color: "white",
              borderRadius: 5,
            }}
          >
            Add Product
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1 }}>
        <FlatList
          data={products}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("ProductDetails", { product: item })
              }
            >
              <View style={{ flexDirection: "row", marginTop: 10 }}>
                <Image
                  source={{ uri: item.image }}
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 10,
                  }}
                />

                <View style={{ marginLeft: 10 }}>
                  <Text>{item.title}</Text>
                  <Text>R {item.price}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          refreshing={loading}
          onRefresh={() => getProducerProducts(user.id)}
        />
      </View>
    </View>
  );
};

export default ProducerProducts;
