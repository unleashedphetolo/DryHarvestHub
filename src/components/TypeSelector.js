import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const TypeSelector = ({type, setType}) => {
  return (
    <View
          style={{
            flexDirection: "row",
            backgroundColor: "#bdbdbd",
            borderRadius: 10,
            justifyContent: "space-between",
          }}
        >
          <View style={{ flex: 1 }}>
            <TouchableOpacity onPress={() => setType("Consumer")}>
              <Text
                style={{
                  backgroundColor: type == "Consumer" ? "white" : "#bdbdbd",
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
            <TouchableOpacity onPress={() => setType("Producer")}>
              <Text
                style={{
                  backgroundColor: type == "Producer" ? "white" : "#bdbdbd",
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
  )
}

export default TypeSelector