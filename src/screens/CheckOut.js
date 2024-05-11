import { Text, View, TouchableOpacity } from "react-native";
import React, { Component } from "react";
import constants from "expo-constants";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

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
        <Text style={{ textAlign: "left", fontWeight: "700", fontSize: 20 }}>
          Payment Method
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", flex: 1, paddingVertical: 30 }}>
            <Entypo name="credit-card" size={24} color="black" />

            <Text style={{ paddingVertical: 3, paddingHorizontal: 15 }}>
              Credit Card
            </Text>
            <View>
              <Text style={{ paddingVertical: 3, paddingHorizontal: 15 }}>
                Name on Card
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CheckOut;
