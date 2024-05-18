import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import Search from "../screens/Search";
import Cart from "../screens/Cart";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';


const Tab = createBottomTabNavigator();
const TabNav = () => {
  return (
    <Tab.Navigator
    screenOptions={{
        headerShown:false,
        tabBarActiveTintColor: 'green',
      }}
    >
      <Tab.Screen name="Home" 
      component={Home} 
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="home" color={color} size={size} />
        ),
      }}
      />
      <Tab.Screen name="Profile" component={Profile} 
      options={{
        tabBarLabel: 'Profile',
        tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" size={24} color={color} />
        ),
      }}
      />
      <Tab.Screen name="Search" 
      component={Search} 
      options={{
        tabBarLabel: 'Search',
        tabBarIcon: ({ color, size }) => (
            <Feather name="search" size={24} color={color} />
        ),
      }}
      />
      <Tab.Screen name="Cart" 
      component={Cart} 
      options={{
        tabBarLabel: 'Cart',
        tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="shopping-cart" size={24} color="black" />
        ),
      }}
      />
    </Tab.Navigator>
  )
}

export default TabNav