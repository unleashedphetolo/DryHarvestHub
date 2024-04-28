import { View, Text, TouchableOpacity, FlatList, Image } from "react-native";
import React from "react";
import Constants from "expo-constants";
import { Ionicons } from "@expo/vector-icons";
const categories = [
  { id: 1, name: "Fruits" },
  { id: 2, name: "Vegetables" },
  
];

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
    id: 2,
    title: "Prunes Pitted - Choice Grade 450g",
    price: 129.9,
    description:
      "Prunes are sweet and juicy, making them ideal for snacking and cooking. Your grandmother’s favourites are the best natural laxative on the market and has been proven to promote gut health.",
    image:
      "https://www.thespruceeats.com/thmb/jMn1JBmk4h0xR_0hgche6xnjZ3I=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/what-is-freeze-dried-fruit-5193827-still-life-3d85d69de7d0457da8a85e1a98879929.jpg",
  },
  {
    id: 3,
    title: "Apricots Royal 80g",
    price: 129.9,
    description:
      "Royal apricots have a sweet-tangy flavor and moist texture with a dark reddish-orange color.",
    image:
      "https://www.thespruceeats.com/thmb/jMn1JBmk4h0xR_0hgche6xnjZ3I=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/what-is-freeze-dried-fruit-5193827-still-life-3d85d69de7d0457da8a85e1a98879929.jpg",
  },
  {
    id: 4,
    title: "Mebos Lollies Sugar Coated 80g",
    price: 129.9,
    description:
      " Get ready for a burst of sweetness with our Mebos lollies. With a light sugar coating, they offer a sweet tangy taste with every bite. ",
    image:
      "https://www.thespruceeats.com/thmb/jMn1JBmk4h0xR_0hgche6xnjZ3I=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/what-is-freeze-dried-fruit-5193827-still-life-3d85d69de7d0457da8a85e1a98879929.jpg",
  },
];
const Home = ({ navigation }) => {
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
        <Text style={{ color: "black", fontSize: 20, fontWeight: "500" }}>
          DryHarvestHub
        </Text>

        <TouchableOpacity onPress={()=>navigation.navigate("Cart")}>
          <View>
            <Ionicons name="cart" size={24} color="black" />
          </View>
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1 }}>
        <Text style={{ paddingVertical: 10, color: "gray" }}>
          Get the best dried fruits from the best producers across south africa
        </Text>
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
          {products.map((product) => (
            <View
              style={{
                width: "45%",
                margin: 7,
              }}
              key={product.id}
            >
              <TouchableOpacity
                onPress={() => navigation.navigate("ProductDetails", {product})}
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
                    style={{ color: "black", fontWeight: "700", marginTop: 5 }}
                  >
                    {product.title}
                  </Text>
                  <Text style={{ color: "black" }}>R {product.price}</Text>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default Home;
