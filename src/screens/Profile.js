import { Text, View, TouchableOpacity, Image } from "react-native";
import React, { useContext } from "react";
import constants from "expo-constants";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import AuthContext from "../context/auth/authContext";
const Profile = ({ navigation }) => {
  const { logout, user } = useContext(AuthContext);

  return (
    <View
      style={{
        marginTop: constants.statusBarHeight,
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
          <View>
            <Ionicons name="arrow-back-outline" size={24} color="black" />
          </View>
        </TouchableOpacity>

        <Text
          style={{
            color: "black",
            marginRight: 26,
            fontSize: 18,
            fontWeight: "700",
          }}
        >
          Profile
        </Text>

        <View />
      </View>
      <View
        style={{
          backgroundColor: "white",
          padding: 10,
          marginTop: 30,
          marginLeft: 130,
          borderRadius: 5,
        }}
      >
        <Image
          source={require("../../assets/profile.webp")}
          style={{
            width: 70,
            height: 70,
            borderRadius: 70,
            borderWidth: 2,
            borderColor: "#108437",
          }}
        />
      </View>
      <Text
        style={{
          color: "black",
          marginLeft: 122,
          fontSize: 20,
          fontWeight: "700",
          marginTop: 8,
        }}
      >
        {user?.name}
      </Text>
      <Text
        style={{
          textAlign: "center",
          fontWeight: "700",
          fontSize: 17,
          color: "grey",
        }}
      >
        {user?.email}
      </Text>
      <View
        style={{ flexDirection: "row", alignItems: "center", marginLeft: 97 }}
      >
        <TouchableOpacity onPress={() => navigation.navigate("EditProfile")}>
          <Text
            style={{
              paddingVertical: 10,
              paddingHorizontal: 30,
              backgroundColor: "#108437",
              color: "white",
              fontSize: 18,
              fontWeight: "800",
              borderRadius: 9,
              marginTop: 20,
            }}
          >
            Edit Profile
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: "column", flex: 1, paddingVertical: 30 }}>
        <View
          style={{ height: 3, backgroundColor: "#ECECEC", marginTop: 10 }}
        />
<TouchableOpacity onPress={() => navigation.navigate("ProducerRegistration")}>
<View
          style={{
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 15,
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 5,
            }}
          >
            <View style={{  marginTop: 15 }}>
            <Ionicons name="document-attach-outline" size={28} color="black" />
            </View>
          </View>

          <Text
            style={{
              paddingVertical: 3,
              marginTop: 13,
              marginRight: 200,
            }}
          >
          Attachment
          </Text>

          
            <View style={{ marginTop: 10, marginLeft: -20 }}>
              <Ionicons name="chevron-forward" size={20} color="black" />
            </View>
          
        </View>
         </TouchableOpacity>
         


         <TouchableOpacity onPress={() => navigation.navigate("Test")}>
<View
          style={{
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 15,
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 5,
            }}
          >
            <View style={{  marginTop: 15 }}>
            <Ionicons name="document-attach-outline" size={28} color="black" />
            </View>
          </View>

          <Text
            style={{
              paddingVertical: 3,
              marginTop: 13,
              marginRight: 200,
            }}
          >
          Test
          </Text>

          
            <View style={{ marginTop: 10, marginLeft: -20 }}>
              <Ionicons name="chevron-forward" size={20} color="black" />
            </View>
          
        </View>
         </TouchableOpacity>





        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 7,
          }}
        >
          <TouchableOpacity onPress={() => navigation.navigate("Orders")}>
          <View style={{
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
          }}>
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 5,
            }}
          >
            
            <Image
              source={require("../../assets/order.png")}
              style={{ height: 26, width: 27, marginTop: 15 }}
            />
          </View>
          <View>
          <Text
            style={{
              paddingVertical: 3,
              paddingHorizontal: 15,
              marginTop: 12,
              marginRight: 200,
            }}
          >
            My Orders
          </Text>
          </View>
          </View>
         </TouchableOpacity>
          <TouchableOpacity>
            <View style={{ marginTop: 10 }}>
              <Ionicons name="chevron-forward" size={20} color="black" />
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 5,
            }}
          >
            <Image
              source={require("../../assets/address.jpg")}
              style={{ height: 26, width: 27, marginTop: 15 }}
            />
          </View>

          <Text
            style={{
              paddingVertical: 3,
              paddingHorizontal: 15,
              marginTop: 13,
              marginRight: 200,
            }}
          >
            Address
          </Text>

          <TouchableOpacity>
            <View style={{ marginTop: 10 }}>
              <Ionicons name="chevron-forward" size={20} color="black" />
            </View>
          </TouchableOpacity>
        </View>

        <View
          style={{ height: 3, backgroundColor: "#ECECEC", marginTop: 30 }}
        />

        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 15,
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 5,
            }}
          >
            <View style={{ height: 26, width: 27, marginTop: 15 }}>
              <Ionicons name="help-circle-outline" size={26} color="black" />
            </View>
          </View>

          <Text
            style={{
              paddingVertical: 3,
              paddingHorizontal: 15,
              marginTop: 13,
              marginRight: 200,
            }}
          >
            Help & Support
          </Text>

          <TouchableOpacity>
            <View style={{ marginTop: 10, marginLeft: -20 }}>
              <Ionicons name="chevron-forward" size={20} color="black" />
            </View>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => logout()}>
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 15,
            }}
          >
            <View
              style={{
                backgroundColor: "white",
                borderRadius: 5,
              }}
            >
              <View style={{ height: 26, width: 27, marginTop: 15 }}>
                <MaterialIcons name="logout" size={24} color="black" />
              </View>
            </View>

            <Text
              style={{
                paddingVertical: 3,
                paddingHorizontal: 15,
                marginTop: 13,
                marginRight: 235,
              }}
            >
              Log out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;
