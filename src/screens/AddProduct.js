import { View, Text, Image, Pic } from "react-native";
import React, { useContext, useState } from "react";
import Constants from "expo-constants";
import Input from "../components/Input";
import * as ImagePicker from "expo-image-picker";
import { TouchableOpacity } from "react-native-gesture-handler";
import AppContext from "../context/app/appContext";
import AuthContext from "../context/auth/authContext";
import { Picker } from "@react-native-picker/picker";

const AddProduct = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");

  const { productsLoading: loading, createProduct } = useContext(AppContext);
  const { user } = useContext(AuthContext);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      const img = {
        uri: result.assets[0].uri,
        type: result.assets[0].type,
        name: result.assets[0].fileName,
      };

      const res = await fetch(img.uri);
      const blob = await res.blob();
      img.blob = blob;

      setImage(img);
    }
  };

  const handleAdd = () => {
    const product = {
      image,
      category,
      price,
      description,
      title,
      userId: user.id,
    };

    createProduct(product, navigation);
  };

  return (
    <View
      style={{
        marginTop: Constants.statusBarHeight,
        padding: 20,
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <Text style={{ fontWeight: "600", fontSize: 25 }}>Add Product</Text>
      <View>
        <View>
          <TouchableOpacity onPress={pickImage}>
            <View style={{ flexDirection: "row" }}>
              {image && (
                <Image
                  source={{ uri: image.uri }}
                  style={{ width: 50, height: 50, borderRadius: 5 }}
                />
              )}
              <Text
                style={{
                  marginLeft: 10,
                  fontWeight: "600",
                  padding: 10,
                  borderWidth: 1,
                  borderColor: "#bdbdbd",
                }}
              >
                Add an image
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <Input placeholder="Title" setValue={setTitle} value={title} />
        <Input
          placeholder="Description"
          setValue={setDescription}
          value={description}
        />
        <Input placeholder="Price" setValue={setPrice} value={price} />
        {/* <Input placeholder="Category" setValue={setCategory} value={category} /> */}
        <View
          style={{
            marginTop: 20,
            borderWidth: 2,
            borderRadius: 5,
            borderColor: "#bdbdbd",
            paddingHorizontal: 5,
          }}
        >
          <Picker
            selectedValue={category}
            style={{}}
            onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}
          >
            <Picker.Item label="Select category" value="" />
            <Picker.Item label="Fruits" value="Fruits" />
            <Picker.Item label="Vegitables" value="Vegitables" />
          </Picker>
        </View>

        <TouchableOpacity onPress={handleAdd}>
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
            {loading ? "Loading..." : "Add product"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddProduct;
