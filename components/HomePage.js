// Import necessary components from React Native
import React from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
} from "react-native";
import "react-native-gesture-handler";
import Input from "./Input";


// Define the home page component
const HomePage = ({ navigation }) => {
  const goToProducerRegistration = () => {
    navigation.navigate("ProducerRegistration");
  };

  // Function to navigate to ConsumerRegistration screen
  const goToConsumerRegistration = () => {
    navigation.navigate("ConsumerRegistration");
  };

  return (
    <ImageBackground
      source={require("../assets/DryFood.webp")}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <View style={{ alignItems: "center", }}>
          <View style={{backgroundColor: 'white', padding: 10,borderRadius: 5}}>

          <Image
            source={require("../assets/DryFoodLogo.jpg")}
            style={styles.logo}
          />
          </View>
        </View>

        <View
          style={{
            backgroundColor: "white",
            flex: 1,
            margin: 20,
            borderRadius: 10,
            padding: 20,
          }}
        >
          <Text style={styles.appName}>DryHarvestHub</Text>
          <View>
            <Text style={{ fontSize: 19, fontWeight: "600", marginBottom: 10 }}>
              Log In
            </Text>

            <View
              style={{
                flexDirection: "row",
                backgroundColor: "#bdbdbd",
                borderRadius: 10,
                justifyContent: "space-between",
              }}
            >
              <View style={{ flex: 1 }}>
                <TouchableOpacity>
                  <Text
                    style={{
                      backgroundColor: "white",
                      margin: 4,
                      padding: 10,
                      borderRadius: 10,
                      fontWeight: "800",

                      textAlign: "center",
                    }}
                  >
                    Consumer
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={{ flex: 1 }}>
                <TouchableOpacity>
                  <Text
                    style={{
                      backgroundColor: "#bdbdbd",
                      margin: 5,
                      padding: 10,
                      borderRadius: 5,
                      fontWeight: "700",

                      textAlign: "center",
                    }}
                  >
                    Producer
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <Input icon="mail-outline" placeholder="Email" />
            <Input icon="lock-closed-outline" placeholder="Password" />
            <Text
              style={{ color: "blue", paddingVertical: 10, textAlign: "right" }}
            >
              Forgot Password?
            </Text>

           
           
            <TouchableOpacity>
              <Text
                style={{
                  textAlign: "center",
                  backgroundColor: "blue",
                  color: "white",
                  padding: 15,
                  fontWeight: "800",
                  marginTop: 10,
                  borderRadius: 5,
                }}
              >
                Log In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

// Stylesheet
const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    paddingTop: 50,
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 5,
  },
  appName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    padding: 5,
    textAlign: "center",
    color: "black",
    padding: 1,
    fontWeight: "700",
  },
});

export default HomePage;
