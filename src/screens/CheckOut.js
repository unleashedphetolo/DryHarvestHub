import { Text, TextInput, View, TouchableOpacity, Image } from "react-native";
import React, { Component } from "react";
import constants from "expo-constants";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const CheckOut = ({ navigation }) => {
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
          CheckOut
        </Text>

        <View />
      </View>
      <View
        style={{
          backgroundColor: "#f9f9fb",
          flex: 1,
          marginTop: 20,
          borderRadius: 10,
          padding: 20,
        }}
      >
        <Text
          style={{
            marginTop: 10,
            textAlign: "left",
            fontWeight: "700",
            fontSize: 20,
          }}
        >
          Payment Method
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{ flexDirection: "column", flex: 1, paddingVertical: 30 }}
          >
            <View style={{ alignItems: "center", flexDirection: "row" }}>
              <View
                style={{
                  backgroundColor: "white",
                  borderRadius: 5,
                }}
              >
                <Image
                  source={require("../../assets/Mastercard-logo.svg.png")}
                  style={{ height: 20, width: 27 }}
                />
              </View>

              <Text style={{ paddingVertical: 3, paddingHorizontal: 15 }}>
                Credit Card
              </Text>
            </View>
            <View>
              <Text
                style={{
                  marginTop: 15,
                  fontSize: 15,
                  fontWeight: "bold",
                  paddingVertical: 10,
                  paddingHorizontal: 1,
                }}
              >
                Name on Card
              </Text>
              <TextInput
                style={{
                  borderColor: "gray",
                  borderWidth: 1,
                  paddingHorizontal: 10,
                  borderRadius: 5,
                  padding: 10,
                  borderWidth: 2,
                  borderColor: "#bdbdbd",
                }}
                placeholder="Enter name"
                onChangeText={(text) => {}}
              />
              <Text
                style={{
                  marginTop: 15,
                  fontSize: 15,
                  fontWeight: "bold",
                  paddingVertical: 10,
                  paddingHorizontal: 1,
                }}
              >
                Card Number
              </Text>
              <TextInput
                style={{
                  borderColor: "gray",
                  borderWidth: 1,
                  paddingHorizontal: 10,
                  borderRadius: 5,
                  padding: 10,
                  borderWidth: 2,
                  borderColor: "#bdbdbd",
                }}
                placeholder="Enter card number"
                onChangeText={(text) => {}}
              />
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  // justifyContent: "",
                }}
              >
                <View style={{ flex: 1, marginRight: 15 }}>
                  <Text
                    style={{
                      marginTop: 15,
                      fontSize: 15,
                      fontWeight: "bold",
                      paddingVertical: 10,
                      paddingHorizontal: 1,
                    }}
                  >
                    Expiry Date
                  </Text>
                  <TextInput
                    style={{
                      borderColor: "gray",
                      borderWidth: 1,
                      paddingHorizontal: 10,
                      borderRadius: 5,
                      padding: 10,
                      borderWidth: 2,
                      borderColor: "#bdbdbd",
                    }}
                    placeholder="MM/YY"
                    onChangeText={(text) => {}}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      marginTop: 15,
                      fontSize: 15,
                      fontWeight: "bold",
                      paddingVertical: 10,
                      paddingHorizontal: 1,
                    }}
                  >
                    Security Code
                  </Text>
                  <TextInput
                    style={{
                      width: "100%",
                      borderColor: "gray",
                      borderWidth: 1,
                      paddingHorizontal: 10,
                      borderRadius: 5,
                      padding: 10,
                      borderWidth: 2,
                      borderColor: "#bdbdbd",
                    }}
                    placeholder="CVC"
                    onChangeText={(text) => {}}
                  />
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 30,
                }}
              >
                <MaterialCommunityIcons
                  name="checkbox-marked-circle"
                  size={24}
                  color="green"
                />
                <Text
                  style={{
                    alignItems: "center",
                    marginLeft: 10,
                    fontWeight: "bold",
                  }}
                >
                  My billing address is the same as my shipping address.
                </Text>
              </View>
              <TouchableOpacity>
                <Text
                  style={{
                    paddingVertical: 15,
                    paddingHorizontal: 60,
                    backgroundColor: "#108437",
                    color: "white",
                    fontSize: 18,
                    fontWeight: "800",
                    borderRadius: 5,
                    marginTop: 120,
                  }}
                >
                  Confirm and Continue
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CheckOut;
