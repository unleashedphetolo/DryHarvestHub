import { View, Text } from "react-native";
import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import Search from "../screens/Search";
import Cart from "../screens/Cart";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import AuthContext from "../context/auth/authContext";
import ProducerProducts from "../screens/ProducerProducts";

const Tab = createBottomTabNavigator();
const TabNav = () => {
  const { user } = useContext(AuthContext);
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "green",
      }}
      initialRouteName="ProducerProducts"
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" size={24} color={color} />
          ),
        }}
      />
      {user.type == "Producer" ? (
        <Tab.Screen
          name="ProducerProducts"
          component={ProducerProducts}
          options={{
            tabBarLabel: "Producer",
            tabBarIcon: ({ color, size }) => (
              <FontAwesome6 name="store" size={22} color={color} />
            ),
          }}
        />
      ) : null}
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarLabel: "Cart",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="shopping-cart" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNav;
