import { View, Text, TextInput } from 'react-native'
import React from 'react'
import { Ionicons } from "@expo/vector-icons";

const Input = ({placeholder, icon}) => {
  return (
    <View
              style={{
                flexDirection: "row",
                marginTop: 20,
                borderWidth: 2,
                borderRadius: 5,
                borderColor: "#bdbdbd",
                alignItems: "center",
                paddingHorizontal: 5,
              }}
            >
              <Ionicons name={icon} size={25} color="gray" />
              <TextInput
                style={{ backgroundColor: "white", flex: 1, padding: 5, color: 'black' }}
                placeholder={placeholder}
                placeholderTextColor={'grey'}
              />
            </View>
  )
}

export default Input