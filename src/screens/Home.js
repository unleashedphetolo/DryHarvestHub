import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import React, { useContext, useEffect } from "react";
import Constants from "expo-constants";
import { Ionicons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import AppContext from "../context/app/appContext";
import Loading from "../components/Loading";

const categories = [
  { id: 1, name: "All" },
  { id: 2, name: "Fruits" },
  { id: 3, name: "Vegetables" },
];

// const products = [
//   {
//     id: 1,
//     title: "Mango Chunks - Great Value 400g",
//     price: 129.9,
//     description:
//       " Mango Chunks are a sweet delicious mixture of mango pieces, strips and chunks. They are partly dried to sweet-tart perfection. ",
//     image:
//       "https://www.thespruceeats.com/thmb/jMn1JBmk4h0xR_0hgche6xnjZ3I=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/what-is-freeze-dried-fruit-5193827-still-life-3d85d69de7d0457da8a85e1a98879929.jpg",
//   },
//   {
//     id: 5,
//     title: "Prunes Pitted - Choice Grade 450g",
//     price: 129.9,
//     description:
//       "Prunes are sweet and juicy, making them ideal for snacking and cooking. Your grandmother’s favourites are the best natural laxative on the market and has been proven to promote gut health.",
//     image:
//       "https://www.thespruceeats.com/thmb/jMn1JBmk4h0xR_0hgche6xnjZ3I=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/what-is-freeze-dried-fruit-5193827-still-life-3d85d69de7d0457da8a85e1a98879929.jpg",
//   },
//   {
//     id: 3,
//     title: "Apricots Royal 80g",
//     price: 129.9,
//     description:
//       "Royal apricots have a sweet-tangy flavor and moist texture with a dark reddish-orange color.",
//     image:
//       "https://www.thespruceeats.com/thmb/jMn1JBmk4h0xR_0hgche6xnjZ3I=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/what-is-freeze-dried-fruit-5193827-still-life-3d85d69de7d0457da8a85e1a98879929.jpg",
//   },
//   {
//     id: 4,
//     title: "Mebos Lollies Sugar Coated 80g",
//     price: 129.9,
//     description:
//       " Get ready for a burst of sweetness with our Mebos lollies. With a light sugar coating, they offer a sweet tangy taste with every bite. ",
//     image:
//       "https://www.thespruceeats.com/thmb/jMn1JBmk4h0xR_0hgche6xnjZ3I=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/what-is-freeze-dried-fruit-5193827-still-life-3d85d69de7d0457da8a85e1a98879929.jpg",
//   },
// ];

const Home = ({ navigation }) => {
  const { getProducts, productsLoading, products } = useContext(AppContext);

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <View
      style={{
        marginTop: Constants.statusBarHeight,
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
        <Text style={{ color: "green", fontSize: 20, fontWeight: "500" }}>
          DryHarvestHub
        </Text>

        <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
          <View>
            <Ionicons name="cart" size={24} color="black" />
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View
          style={{
            paddingHorizontal: 20,
            paddingVertical: 7,
            borderRadius: 14,
            padding: 10,
            borderWidth: 2,
            borderColor: "#ECECEC",
            marginTop: 15,
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#F5F5F5",
          }}
        >
          <Octicons name="search" size={22} color="grey" />
          <TextInput
            style={{
              fontSize: 15,
              fontWeight: "bold",
              marginTop: 2,
              marginRight: 160,
              marginLeft: 10,
            }}
            placeholderTextColor="grey"
            placeholder="Search"
            onChangeText={(text) => {}}
          />
        </View>
        <Ionicons name="filter" size={24} color="black" />
      </View>
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text
            style={{
              paddingVertical: 10,
              color: "black",
              fontWeight: "500",
              fontSize: 15,
            }}
          >
            Recommedations
          </Text>
          <Text
            style={{
              paddingVertical: 10,
              color: "green",
              fontWeight: "500",
              fontSize: 15,
            }}
          >
            See all
          </Text>
        </View>
        <View>
          <FlatList
            data={categories}
            renderItem={({ item }) => (
              <TouchableOpacity>
                <View
                  style={{
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                    backgroundColor: "#ddd",
                    borderRadius: 5,
                  }}
                >
                  <Text>{item.name}</Text>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
            horizontal
            ItemSeparatorComponent={<View style={{ padding: 5 }} />}
            showsHorizontalScrollIndicator={false}
          />
        </View>

        <View
          style={{
            flex: 1,
            backgroundColor: "white",
            marginTop: 20,
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "flex-start",
          }}
        >
          {productsLoading ? (
            <Loading />
          ) : (
            products.map((product) => (
              <View
                style={{
                  width: "45%",
                  margin: 7,
                }}
                key={product.id}
              >
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("ProductDetails", { product })
                  }
                >
                  <Image
                    source={{ uri: product.image }}
                    style={{
                      width: "100%",
                      height: 150,
                      borderRadius: 10,
                    }}
                  />
                  <View>
                    <Text
                      style={{
                        color: "black",
                        fontWeight: "700",
                        marginTop: 5,
                      }}
                    >
                      {product.title}
                    </Text>
                    <Text style={{ color: "black" }}>R {product.price}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>
      </View>
    </View>
  );
};

export default Home;
