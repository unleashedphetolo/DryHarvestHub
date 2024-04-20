import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import HomePage from './components/HomePage';
import ProducerRegistration from './components/ProducerRegistration';
import ConsumerRegistration from './components/ConsumerRegistration';

// Create a stack navigator
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        
        <Stack.Screen name="Home" component={HomePage} options={{ headerShown: false }} />
        <Stack.Screen name="ProducerRegistration" component={ProducerRegistration} />
        <Stack.Screen name="ConsumerRegistration" component={ConsumerRegistration} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
