import { View, Text } from "react-native";
import React, { useContext, useEffect } from "react";
import { useReducer } from "react";
import AuthContext from "../context/auth/authContext";
import Login from "../screens/Login";
import Register from "../screens/Register";
import TabNav from "./TabNav";
import ProductDetails from "../screens/ProductDetails";
import Cart from "../screens/Cart";
import CheckOut from "../screens/CheckOut";
import Profile from "../screens/Profile";
import EditProfile from "../screens/EditProfile";
import { NavigationContainer } from "@react-navigation/native";
import { auth } from "../firebase/config";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import Loading from "./Loading";
// Create a stack navigator
const Stack = createStackNavigator();

const MainNavigator = () => {
  const { setUser, setUserLoading, userLoading, user } =
    useContext(AuthContext);
  useEffect(() => {
    setUserLoading();
    auth.onAuthStateChanged((user) => setUser(user));
  }, []);

  if (userLoading) return <Loading />;

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        // initialRouteName="Register"
      >
        {user ? (
          <>
            <Stack.Screen name="Main" component={TabNav} />
            <Stack.Screen name="ProductDetails" component={ProductDetails} />
            <Stack.Screen name="Cart" component={Cart} />
            <Stack.Screen name="CheckOut" component={CheckOut} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="EditProfile" component={EditProfile} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </>
        )}
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
};

export default MainNavigator;
