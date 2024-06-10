import { View, Text, TouchableOpacity, FlatList, Image } from "react-native";
import React, { useContext, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import { MaterialIcons } from "@expo/vector-icons";
import AppContext from "../context/app/appContext";

const Cart = ({ navigation }) => {
  const { cart, removeCartItem, incrementQuantity, decrementQuantity } =
    useContext(AppContext);

  console.log(cart);

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
          data={cart}
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
                  <TouchableOpacity onPress={() => removeCartItem(item.id)}>
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
                        item.quantity === 1 ? null : decrementQuantity(item.id);
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
                    <Text style={{ padding: 10 }}>{item.quantity}</Text>
                    <TouchableOpacity
                      onPress={() => incrementQuantity(item.id)}
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
            {cart
              .reduce(
                (total, { price, quantity }) => (total += price * quantity),
                0
              )
              .toFixed(2)}
          </Text>
        </View>

        <View>
          <TouchableOpacity onPress={() => navigation.navigate("CheckOut")}>
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
