import {
  View,
  Text,
  FlatList,
  Image,
  Touchable,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect } from "react";
import Header from "../components/Header";
import Constants from "expo-constants";
import AuthContext from "../context/auth/authContext";
import AppContext from "../context/app/appContext";

const Orders = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const { getOrders, orders, ordersLoading: loading } = useContext(AppContext);

  useEffect(() => {
    getOrders(user.id);
  }, []);

  console.log("orders: ",orders);

  return (
    <View
      style={{
        padding: 20,
        marginTop: Constants.statusBarHeight,
        flex: 1,
        backgroundColor: "#f8f9f3",
      }}
    >
      <Header onPress={() => navigation.navigate("Profile")} title="Orders" />

      <View
        style={{
          borderRadius: 10,
          marginTop: 10,
          flex: 1,
        }}
      >
        <FlatList
          data={orders}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("OrderDetails", { id: item.id })
              }
            >
              <View
                style={{
                  backgroundColor: "white",
                  padding: 10,
                  borderWidth: 1,
                  borderColor: "#f1f1f1",
                  borderRadius: 10,
                  marginTop: 5,
                }}
              >
                <Text style={{ fontWeight: "500" }}>Order #{item.id}</Text>

                <View>
                  <FlatList
                    data={item.items}
                    renderItem={({ item }) => (
                      <Image
                        style={{
                          height: 70,
                          width: 70,
                          borderRadius: 5,
                          marginRight: 10,
                          marginTop: 10,
                        }}
                        source={{
                          uri: item.image,
                        }}
                      />
                    )}
                    keyExtractor={(item) => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                  />
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: 10,
                  }}
                >
                  <Text>Total</Text>
                  <Text style={{ fontWeight: "700" }}>R {item.total}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
          onRefresh={() => getOrders(user.id)}
          refreshing={loading}
        />
      </View>
    </View>
  );
};

export default Orders;