import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import Home from "./src/screens/Home";
import Login from "./src/screens/Login";
import Register from "./src/screens/Register";
import ProductDetails from "./src/screens/ProductDetails";
import Cart from "./src/screens/Cart";
import CheckOut from "./src/screens/CheckOut";
import Profile from "./src/screens/Profile";
import EditProfile from "./src/screens/EditProfile";
import TabNav from "./src/components/TabNav";




// Create a stack navigator
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} 
       //initialRouteName="Profile"
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home" component={TabNav} />
        <Stack.Screen name="ProductDetails" component={ProductDetails} />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="CheckOut" component={CheckOut} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="EditProfile" component={EditProfile} />


      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
