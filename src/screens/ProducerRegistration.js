import React, { useContext, useState } from "react";
import {
  View,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import app, { db } from "../firebase/config"; // Importing firebase configuration
import { Picker } from "@react-native-picker/picker";
import AuthContext from "../context/auth/authContext";
import { Ionicons } from "@expo/vector-icons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import * as DocumentPicker from "expo-document-picker";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { updateDoc, doc } from "firebase/firestore";
import Constants from "expo-constants";
import * as FileSystem from "expo-file-system";

const storage = getStorage();

// Function to upload a document to Firebase Storage
const uploadDocument = async (userId, document, folder) => {
  try {
    const documentRef = ref(
      storage,
      `documents/${folder}/${userId}/${document.name}`
    );

    // Fetch the file as a blob
    const response = await fetch(document.uri);
    const blob = await response.blob();

    // Upload the Blob directly to Firebase Storage
    const documentSnapShot = await uploadBytes(documentRef, blob);
    const documentDownloadURL = await getDownloadURL(documentSnapShot.ref);

    return documentDownloadURL;
  } catch (error) {
    console.error("Error uploading document:", error);
    throw error;
  }
};

const ProducerRegistration = ({ navigation }) => {
  const { user, setUser } = useContext(AuthContext);
  const [companyAddress, setcompanyAddress] = useState("");
  const [activity, setActivity] = useState("Sell");
  const [product, setProduct] = useState("Freshly harvested food");
  const [moiDocument, setMoiDocument] = useState(null);
  const [foodSafetyCertificate, setFoodSafetyCertificate] = useState(null);
  const [directorIdDocument, setDirectorIdDocument] = useState(null);
  const [registrationFeeDocument, setRegistrationFeeDocument] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleRegistration = async () => {
    console.log("uploading");

    try {
      const userId = user.id;
      setLoading(true);
      // Uploading required documents and getting their download URLs
      const moiUrl = await uploadDocument(userId, moiDocument, "moi");
      const foodSafetyUrl = await uploadDocument(
        userId,
        foodSafetyCertificate,
        "food_safety"
      );
      const directorIdUrl = await uploadDocument(
        userId,
        directorIdDocument,
        "director_id"
      );
      const registrationFeeUrl = await uploadDocument(
        userId,
        registrationFeeDocument,
        "registration_fee"
      );

      // Updating user profile document
      await updateDoc(doc(db, "profile", userId), {
        companyAddress,
        activity,
        product,
        moiUrl,
        foodSafetyUrl,
        directorIdUrl,
        registrationFeeUrl,
      });

      Alert.alert("Done", "The documents have been saved successfully", [
        { text: "OK", onPress: () => setUser(user) },
      ]);
      setLoading(false);
    } catch (error) {
      // Alerting user in case of registration error
      Alert.alert("Please upload your documents", "Incomplete Registration");
      setLoading(false);
    }
  };

  // Function to handle document upload
  const handleDocumentUpload = async (type) => {
    try {
      const document = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
      });

      // Setting the corresponding document state based on the type
      switch (type) {
        case "moi":
          setMoiDocument(document.assets[0]);
          break;
        case "foodSafety":
          setFoodSafetyCertificate(document.assets[0]);
          break;
        case "directorId":
          setDirectorIdDocument(document.assets[0]);
          break;
        case "registrationFee":
          setRegistrationFeeDocument(document.assets[0]);
          break;
        default:
          break;
      }
    } catch (error) {
      console.error("Error selecting document:", error);
      Alert.alert("Error", "Failed to upload document");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Producer Attachments</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Enter the physical address of your company."
        onChangeText={setcompanyAddress}
        value={companyAddress}
      />
      <Picker
        selectedValue={activity}
        onValueChange={(itemValue) => setActivity(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Sell" value="Sell" />
        <Picker.Item label="Buy" value="Buy" />
      </Picker>
      <Picker
        selectedValue={product}
        onValueChange={(itemValue) => setProduct(itemValue)}
        style={styles.picker}
      >
        <Picker.Item
          label="Freshly harvested food"
          value="Freshly harvested food"
        />
      </Picker>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => handleDocumentUpload("moi")}>
          <View style={styles.uploadButton}>
            <Text style={styles.buttonText}>
              {moiDocument ? moiDocument?.name : "Upload MOI Document"}
            </Text>
            <FontAwesome5 name="file-upload" size={24} color="white" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleDocumentUpload("foodSafety")}>
          <View style={styles.uploadButton}>
            <Text style={styles.buttonText}>
              {foodSafetyCertificate
                ? foodSafetyCertificate?.name
                : "Upload Food Safety Certificate"}
            </Text>
            <FontAwesome5 name="file-upload" size={24} color="white" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleDocumentUpload("directorId")}>
          <View style={styles.uploadButton}>
            <Text style={styles.buttonText}>
              {directorIdDocument
                ? directorIdDocument?.name
                : "Upload Director ID Document"}
            </Text>
            <FontAwesome5 name="file-upload" size={24} color="white" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleDocumentUpload("registrationFee")}
        >
          <View style={styles.uploadButton}>
            <Text style={styles.buttonText}>
              {registrationFeeDocument
                ? registrationFeeDocument?.name
                : "Upload Registration Fee Document"}
            </Text>
            <FontAwesome5 name="file-upload" size={24} color="white" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleRegistration}>
          <Text style={styles.registerButton}>
            {loading ? "Loading..." : "Register"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: Constants.statusBarHeight,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    paddingHorizontal: 20,
    marginRight: 46,
    marginBottom: 20,
    marginTop: 20,
  },
  headerTitle: {
    fontSize: 18,
    marginLeft: 66,
    fontWeight: "700",
    color: "black",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  picker: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonContainer: {
    width: "100%",
    marginBottom: 20,
  },
  uploadButton: {
    backgroundColor: "#108437",
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
    alignSelf: "center",
    color: "white",
    padding: 1,
    fontWeight: "800",
    textAlign: "center",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  buttonText: {
    color: "white",
    padding: 15,
    fontWeight: "800",
    textAlign: "center",
  },
  registerButton: {
    backgroundColor: "#19bd50",
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
    alignSelf: "center",
    padding: 40,
    color: "white",
    padding: 15,
    fontWeight: "800",
    textAlign: "center",
    width: "50%",
  },
});
export default ProducerRegistration;
