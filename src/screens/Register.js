import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useContext, useState } from "react";
import Constants from "expo-constants";
import Input from "../components/Input";
import AuthContext from "../context/auth/authContext";
import TypeSelector from "../components/TypeSelector";

const Register = ({ navigation }) => {
  const { register, loading } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("Consumer");

  const handleRegister = () => {
    const user = {
      name,
      email,
      password,
    };
    register(user, type);
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
        <Text
          style={{
            textAlign: "center",
            fontWeight: "700",
            fontSize: 20,
            marginBottom: 20,
          }}
        >
          DryHarvestHub
        </Text>

        <TypeSelector type={type} setType={setType} />

        <View style={{ flex: 1, justifyContent: "space-between" }}>
          <View>
            <Input
              icon="person-outline"
              placeholder="Name"
              setValue={setName}
              value={name}
            />
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
          </View>

          <View>
            <TouchableOpacity onPress={handleRegister}>
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
                {loading ? "Loading..." : "Register"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={{ textAlign: "center", marginTop: 10 }}>
                Already have an account? Login.
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Register;
