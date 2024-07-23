import React, { useState, useContext } from "react";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import Constants from "expo-constants";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import AppContext from "../context/app/appContext";
import AuthContext from "../context/auth/authContext";

const EditProfile = ({ navigation }) => {
  // const { loading, updatePersonalInfo } = useContext(AppContext);
  const { user, loading, updatePersonalInfo } = useContext(AuthContext);

  const [name, setName] = useState(user?.name);
  const [surname, setSurname] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState({});
  const [hub, setHub] = useState(null); // Example: could be fetched from a profile API

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      const img = {
        uri: result.assets[0].uri,
        type: result.assets[0].mimeType,
        name: result.assets[0].fileName,
      };
      const res = await fetch(img.uri);
      const blob = await res.blob();
      img.blob = blob;
      setImage(img);
    }
  };

  const handleSave = () => {
    const info = {
      name,
      surname,
      bio,
      image,
    };
    console.log(info);
    updatePersonalInfo(user.id, info, navigation);
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <View />
      </View>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.profileImageContainer}>
          <Image source={{ uri: image.uri }} style={styles.profileImage} />
          <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
            <Text style={styles.imageButtonText}>Choose Image</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Full Name</Text>
          <TextInput
            style={styles.textInput}
            placeholderTextColor="black"
            placeholder="Enter your full name"
            onChangeText={setName}
            value={name}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Surname</Text>
          <TextInput
            style={styles.textInput}
            placeholderTextColor="black"
            placeholder="Enter your surname"
            onChangeText={setSurname}
            value={surname}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Bio</Text>
          <TextInput
            style={[styles.textInput, styles.textArea]}
            placeholderTextColor="black"
            placeholder="Tell us about yourself"
            multiline
            numberOfLines={5}
            onChangeText={setBio}
            value={bio}
          />
        </View>
        <TouchableOpacity
          style={[styles.saveButton, loading && styles.loadingButton]}
          onPress={handleSave}
          disabled={loading}
        >
          <Text style={styles.saveButtonText}>
            {loading ? "Saving..." : "Save"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: "#f8f9f3",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    color: "black",
    fontSize: 18,
    fontWeight: "700",
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: "center",
  },
  profileImageContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#108437",
  },
  imageButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#108437",
    borderRadius: 5,
  },
  imageButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    color: "#DCDCEC",
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 5,
  },
  textInput: {
    fontSize: 15,
    fontWeight: "bold",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ECECEC",
    borderRadius: 5,
    backgroundColor: "white",
  },
  textArea: {
    height: 100,
  },
  saveButton: {
    paddingVertical: 14,
    backgroundColor: "#108437",
    borderRadius: 11,
    alignItems: "center",
  },
  loadingButton: {
    backgroundColor: "#9e9e9e",
  },
  saveButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "800",
  },
});

export default EditProfile;
