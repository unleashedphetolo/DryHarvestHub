import { Text, TextInput, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import constants from "expo-constants";
import { Ionicons } from "@expo/vector-icons";

const EditProfile = ({navigation}) => {
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
          Edit Profile
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
        Elaine Levine
      </Text>
      <Text
        style={{
          textAlign: "center",
          fontWeight: "700",
          fontSize: 17,
          color: "grey",
        }}
      >
        @elainelevine
      </Text>


      <View
            style={{ flexDirection: "column", flex: 1, paddingVertical: 30 }}
          >
        <View style={{ height: 3, backgroundColor: "#ECECEC", marginTop: 1 }} />
          
        <View style={{
                  paddingHorizontal: 10,
                  borderRadius: 14,
                  padding: 10,
                  borderWidth: 2,
                  borderColor: "#ECECEC",
                  marginTop: 15
                }}>
              <Text style={{
                  color: "#DCDCEC",
                  fontSize: 15,
                  fontWeight: "bold",
                  paddingVertical: 1,
                  paddingHorizontal: 1,
                }}>
                Full Name
              </Text>
              <TextInput style={{
                  fontSize: 15,
                  fontWeight: "bold",
                  paddingVertical: 1,
                  paddingHorizontal: 1,
                }}
                placeholderTextColor="black"
                placeholder="Elaine Levine"
                onChangeText={(text) => {}}
              />
             </View>     
             <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
            
                <View style={{
                  paddingHorizontal: 40,
                  borderRadius: 14,
                  borderWidth: 2,
                  borderColor: "#ECECEC",
                  marginTop: 15,
                  marginRight:15,
                }}>
                  <Text
                    style={{
                      color: "#DCDCEC",
                    //   marginTop: 15,
                      fontSize: 15,
                      fontWeight: "bold",
                    //   paddingVertical: 10,
                      paddingHorizontal: 14,
                    }}
                  >
                    Gender
                  </Text>
                  <TextInput
                    style={{
                      paddingVertical: 5,
                      paddingHorizontal: 25,
                      borderRadius: 5,
                    //   padding: 10,
                    }}
                    placeholderTextColor="black"
                    placeholder="Male"
                    onChangeText={(text) => {}}
                  />
                </View>
                <View style={{
                  paddingHorizontal: 40,
                  borderRadius: 14,
                  borderWidth: 2,
                  borderColor: "#ECECEC",
                  marginTop: 15
                }}>
                  <Text
                    style={{
                      color: "#DCDCEC",
                      //marginTop: 15,
                      fontSize: 15,
                      fontWeight: "bold",
                      //paddingVertical: 10,
                      paddingHorizontal: 14,
                    }}
                  >
                    Birthday
                  </Text>
                  <TextInput
                    style={{
                      paddingVertical: 5,
                      paddingHorizontal: 10,
                      borderRadius: 5,
                      //padding: 10,
                    }}
                    placeholderTextColor="black"
                    placeholder="05-01-2001"
                    onChangeText={(text) => {}}
                  />
                </View>
              </View>
              <View style={{
                  height: 70,
                  paddingHorizontal: 10,
                  borderRadius: 14,
                  padding: 10,
                  borderWidth: 2,
                  borderColor: "#ECECEC",
                  marginTop: 15
                }}>
              <Text style={{
                  color: "#DCDCEC",
                  fontSize: 15,
                  fontWeight: "bold",
                  paddingVertical: 1,
                  paddingHorizontal: 1,
                }}>
                Phone Number
              </Text>
              <TextInput style={{
                  fontSize: 15,
                  fontWeight: "bold",
                  paddingVertical: 1,
                  paddingHorizontal: 1,
                }}
                placeholderTextColor="black"
                placeholder="(+27) 711 400"
                onChangeText={(text) => {}}
              />
             </View>
             <View style={{
                  height: 70,
                  paddingHorizontal: 10,
                  borderRadius: 14,
                  padding: 10,
                  borderWidth: 2,
                  borderColor: "#ECECEC",
                  marginTop: 15
                }}>
              <Text style={{
                  color: "#DCDCEC",
                  fontSize: 15,
                  fontWeight: "bold",
                  paddingVertical: 1,
                  paddingHorizontal: 1,
                }}>
                Email
              </Text>
              <TextInput style={{
                  fontSize: 15,
                  fontWeight: "bold",
                  paddingVertical: 1,
                  paddingHorizontal: 1,
                }}
                placeholderTextColor="black"
                placeholder="ElaineLevine@gmail.com"
                onChangeText={(text) => {}}
              />
             </View>     
             <View style={{
                  paddingHorizontal: 10,
                  borderRadius: 14,
                  padding: 10,
                  height: 70,
                  borderWidth: 2,
                  borderColor: "#ECECEC",
                  marginTop: 15
                }}>
              <Text style={{
                  color: "#DCDCEC",
                  fontSize: 15,
                  fontWeight: "bold",
                  paddingVertical: 1,
                  paddingHorizontal: 1,
                }}>
                User name
              </Text>
              <TextInput style={{
                  fontSize: 15,
                  fontWeight: "bold",
                  paddingVertical: 1,
                  paddingHorizontal: 1,
                }}
                placeholderTextColor="black"
                placeholder="@ElaineLevine"
                onChangeText={(text) => {}}
              />
             </View> 

             <TouchableOpacity>
                <Text
                  style={{
                    
                    paddingVertical: 14,
                    paddingHorizontal: 156,
                    backgroundColor: "#108437",
                    color: "white",
                    fontSize: 18,
                    fontWeight: "800",
                    borderRadius: 11,
                    marginTop: 30,
                  }}
                >
                  Save
                </Text>
              </TouchableOpacity>
                  
     </View>
      </View>
      
      
  );
};

export default EditProfile;

