import React, { useContext, useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AppContext from "../context/app/appContext";
import AuthContext from "../context/auth/authContext";

const CheckOut = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const { cart } = useContext(AppContext);
  const [isDelivery, setIsDelivery] = useState(false); // State to track delivery option
  const deliveryCharge = 150; // Charge for delivery
  const [isCollect, setIsCollect] = useState(false); // State to track delivery option


  const handleDeliveryOption = () => {
    setIsCollect(false)
    setIsDelivery(!isDelivery);
  };

  const handleCollectOption = () => {
    setIsDelivery(false)
    setIsCollect(!isCollect);
  };
  // Function to calculate total amount based on delivery option
  const getTotalAmount = () => {
    let total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    if (isDelivery) {
      total += deliveryCharge;
    }
    return total;
  };

  return (
    <View
      style={{
        marginTop: 20,
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
          <Ionicons name="arrow-back-outline" size={24} color="black" />
        </TouchableOpacity>

        <Text style={{ color: "black", fontSize: 18, fontWeight: "700" }}>
          Delivery Method 
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
          Delivery Options
        </Text>
        <View
          style={{
            flexDirection: "row",
            marginTop: 30,
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={handleDeliveryOption}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginRight: 10,
            }}
          >
            <MaterialCommunityIcons
              name={
                isDelivery
                  ? "checkbox-marked-circle"
                  : "checkbox-blank-circle-outline"
              }
              size={24}
              color={isDelivery ? "green" : "#bdbdbd"}
            />
            <Text style={{ marginLeft: 10, fontWeight: "bold" }}>
              Delivery (+R{deliveryCharge})
            </Text>
          </TouchableOpacity>
       
        </View>

        <View
          style={{
            flexDirection: "row",
            marginTop: 30,
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={handleCollectOption}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginRight: 10,
            }}
          >
            <MaterialCommunityIcons
              name={
                isCollect
                  ? "checkbox-marked-circle"
                  : "checkbox-blank-circle-outline"
              }
              size={24}
              color={isCollect ? "green" : "#bdbdbd"}
            />
            <Text style={{ marginLeft: 10, fontWeight: "bold" }}>
              Collect ( Free )
            </Text>
          </TouchableOpacity>
          
        
        </View>
      </View>

      <View>

        <Text style={{  textAlign: "left", fontWeight:"bold" }}>
            Total: R {getTotalAmount()}
          </Text>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Payment", {
            isDelivery,
          })
        }
      >
        <Text
          style={{
            paddingVertical: 15,
            paddingHorizontal: 60,
            backgroundColor: "#108437",
            color: "white",
            fontSize: 18,
            fontWeight: "800",
            borderRadius: 5,
            marginTop: 20,
            textAlign: "center",
          }}
        >
          Confirm and Continue
        </Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};

export default CheckOut;
