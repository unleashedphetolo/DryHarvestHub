import { View, Text, Touchable, Image } from "react-native";
import React, { useContext, useState } from "react";
import constants from "expo-constants";
import Input from "../components/Input";
import * as ImagePicker from "expo-image-picker";
import { TouchableOpacity } from "react-native-gesture-handler";
import AppContext from "../context/app/appContext";
import AuthContext from "../context/auth/authContext";

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
        console.log(result);
      const img = {
        uri: result.assets[0].uri,
        type: result.assets[0].type,
        name: result.assets[0].fileName,
      };
      const res = await fetch(img.uri, { mode: 'cors' });
  
      const blob = res.blob();
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
        marginTop: constants.statusBarHeight,
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
        <Input placeholder="Category" setValue={setCategory} value={category} />

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
