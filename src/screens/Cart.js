import { View, Text, TouchableOpacity, FlatList, Image } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import { MaterialIcons } from "@expo/vector-icons";

const Cart = ({ navigation }) => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: "Mango Chunks - Great Value 400g",
      price: 129.99,
      description:
        " Mango Chunks are a sweet delicious mixture of mango pieces, strips and chunks. They are partly dried to sweet-tart perfection. ",
      image:
        "https://www.thespruceeats.com/thmb/jMn1JBmk4h0xR_0hgche6xnjZ3I=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/what-is-freeze-dried-fruit-5193827-still-life-3d85d69de7d0457da8a85e1a98879929.jpg",
      quatity: 1,
    },
    {
      id: 2,
      title: "Prunes Pitted - Choice Grade 450g",
      price: 500.39,
      description:
        "Prunes are sweet and juicy, making them ideal for snacking and cooking. Your grandmother’s favourites are the best natural laxative on the market and has been proven to promote gut health.",
      image:
        "https://www.thespruceeats.com/thmb/jMn1JBmk4h0xR_0hgche6xnjZ3I=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/what-is-freeze-dried-fruit-5193827-still-life-3d85d69de7d0457da8a85e1a98879929.jpg",
      quatity: 1,
    },
    {
      id: 3,
      title: "Apricots Royal 80g",
      price: 200.99,
      description:
        "Royal apricots have a sweet-tangy flavor and moist texture with a dark reddish-orange color.",
      image:
        "https://www.thespruceeats.com/thmb/jMn1JBmk4h0xR_0hgche6xnjZ3I=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/what-is-freeze-dried-fruit-5193827-still-life-3d85d69de7d0457da8a85e1a98879929.jpg",
      quatity: 1,
    },
  ]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        marginTop: Constants.statusBarHeight,
        padding: 20,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View>
            <Ionicons name="arrow-back-outline" size={24} color="black" />
          </View>
        </TouchableOpacity>

        <Text style={{ color: "black", fontSize: 18, fontWeight: "700" }}>
          Cart
        </Text>

        <View />
      </View>

      <View style={{ flex: 1, marginTop: 50 }}>
        <FlatList
          data={cartItems}
          renderItem={({ item }) => (
            <View style={{ flexDirection: "row", margin: 10 }}>
              {/* the image */}
              <Image
                source={{ uri: item.image }}
                style={{ width: 80, height: 80, borderRadius: 5 }}
              />
              {/* end f image */}

              <View style={{ paddingLeft: 10, flex: 1 }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      color: "black",
                      fontWeight: "700",
                      flex: 1,
                    }}
                  >
                    {item.title}
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      setCartItems(
                        cartItems.filter((cartItem) => cartItem.id !== item.id)
                      )
                    }
                  >
                    <MaterialIcons
                      name="delete-forever"
                      size={24}
                      color="black"
                      style={{ marginLeft: 10 }}
                    />
                  </TouchableOpacity>
                </View>

                <Text style={{ color: "gray" }}>Fruits</Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{ fontSize: 14, color: "black", fontWeight: "700" }}
                  >
                    R {item.price}
                  </Text>

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        item.quatity === 1
                          ? null
                          : setCartItems(
                              cartItems.map((cartItem) =>
                                cartItem.id === item.id
                                  ? {
                                      ...cartItem,
                                      quatity: cartItem.quatity - 1,
                                    }
                                  : cartItem
                              )
                            );
                      }}
                    >
                      <View
                        style={{
                          padding: 5,
                          borderWidth: 1,
                          borderColor: "gray",
                          borderRadius: 5,
                        }}
                      >
                        <Ionicons
                          name="remove-outline"
                          size={18}
                          color="black"
                        />
                      </View>
                    </TouchableOpacity>
                    <Text style={{ padding: 10 }}>{item.quatity}</Text>
                    <TouchableOpacity
                      onPress={() =>
                        setCartItems(
                          cartItems.map((cartItem) =>
                            cartItem.id === item.id
                              ? { ...cartItem, quatity: cartItem.quatity + 1 }
                              : cartItem
                          )
                        )
                      }
                    >
                      <View
                        style={{
                          padding: 5,
                          borderWidth: 1,
                          borderColor: "green",
                          backgroundColor: "green",
                          borderRadius: 5,
                        }}
                      >
                        <Ionicons name="add-sharp" size={18} color="white" />
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          )}
        />
      </View>

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View>
          <Text style={{ color: "gray" }}>Total Price</Text>
          <Text style={{ fontSize: 20, color: "black", fontWeight: "800" }}>
            R{" "}
            {cartItems
              .reduce(
                (total, { price, quatity }) => (total += price * quatity),
                0
              )
              .toFixed(2)}
          </Text>
        </View>

        <View>
          <TouchableOpacity onPress={()=>navigation.navigate("CheckOut")}>
            <Text
              style={{
                paddingVertical: 15,
                paddingHorizontal: 30,
                backgroundColor: "#108437",
                color: "white",
                fontSize: 18,
                fontWeight: "800",
                borderRadius: 5,
              }}
            >
              Check Out
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Cart;
