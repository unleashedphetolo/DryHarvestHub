import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useContext, useState } from "react";
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
    <View
      style={{ marginTop: Constants.statusBarHeight, padding: 20, flex: 1 }}
    >
      <View style={{ alignItems: "center", marginTop: 20 }}>
        <View
          style={{ backgroundColor: "white", padding: 10, borderRadius: 5 }}
        >
          <Image
            source={require("../../assets/DryFoodLogo.jpg")}
            style={{
              width: 150,
              height: 150,
              borderRadius: 5,
            }}
          />
        </View>
      </View>

      <View
        style={{
          backgroundColor: "white",
          flex: 1,
          marginTop: 20,
          borderRadius: 10,
          padding: 20,
        }}
      >
        <Text style={{ textAlign: "center", fontWeight: "700", fontSize: 20 }}>
          DryHarvestHub
        </Text>

        <TypeSelector type={type} setType={setType} />
        <View style={{ flex: 1, justifyContent: "space-between" }}>
          <View>
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
            />
            <Text
              style={{ color: "blue", paddingVertical: 10, textAlign: "right" }}
            >
              Forgot Password?
            </Text>
          </View>
          <View>
            <TouchableOpacity onPress={handleLogin}>
              <Text
                style={{
                  textAlign: "center",
                  backgroundColor: "#108437",
                  color: "white",
                  padding: 15,
                  fontWeight: "800",
                  marginTop: 10,
                  borderRadius: 5,
                }}
              >
                {loading ? "Loading..." : "Log In"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text style={{ textAlign: "center", marginTop: 10 }}>
                Don't have an account? Register.
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Login;
