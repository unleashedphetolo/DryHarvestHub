import React, { useContext, useState } from "react";
import { View, Text, Image, ImageBackground, StyleSheet, TouchableOpacity } from "react-native";
import Constants from "expo-constants";
import Input from "../components/Input";
import AuthContext from "../context/auth/authContext";
import TypeSelector from "../components/TypeSelector";

const Login = ({ navigation }) => {
  const { login, loading } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("Consumer");

  const handleLogin = () => {
    const user = {
      email,
      password,
    };
    login(user, type);
  };

  return (
    <ImageBackground
      source={require("../../assets/DryFood.webp")}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/DryFoodLogo.jpg")}
            style={styles.logo}
          />
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.appName}>DryHarvestHub</Text>

          <TypeSelector type={type} setType={setType} />
          <View style={styles.inputContainer}>
            <Input
              icon="mail-outline"
              placeholder="Email"
              setValue={setEmail}
              value={email}
            />
            <Input
              icon="lock-closed-outline"
              placeholder="Password"
              setValue={setPassword}
              value={password}
              secureTextEntry={true}
            />
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleLogin}>
              <Text style={styles.loginButton}>
                {loading ? "Loading..." : "Log In"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text style={styles.registerText}>
                Don't have an account? Register.
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  container: {
    marginTop: Constants.statusBarHeight,
    padding: 20,
    flex: 1,
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 18,
    backgroundColor: "white",
    padding: 10,
  },
  formContainer: {
    backgroundColor: "transparent",
    flex: 1,
    marginTop: 10,
    borderRadius: 10,
    padding: 20,
  },
  appName: {
    textAlign: "center",
    fontWeight: "700",
    fontSize: 20,
    marginBottom: 20,
    color: "black",
    textShadowColor: "#FFFFFF",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  inputContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 5,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  forgotPassword: {
    color: "blue",
    paddingVertical: 10,
    textAlign: "right",
  },
  buttonContainer: {
    justifyContent: "center",
  },
  loginButton: {
    textAlign: "center",
    backgroundColor: "#108437",
    color: "white",
    padding: 15,
    fontWeight: "800",
    marginTop: 10,
    borderRadius: 4,
  },
  registerText: {
    textAlign: "center",
    marginTop: 10,
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    textShadowColor: "rgba(0, 0, 255, 0.3)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  }
  
});

export default Login;
