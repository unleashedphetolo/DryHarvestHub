import React, { useContext, useState } from "react";
import { View, TextInput, Button, Alert, StyleSheet, Text } from "react-native";
import app, { db } from "../firebase/config"; // Importing firebase configuration
import { Picker } from "@react-native-picker/picker";
import AuthContext from "../context/auth/authContext";
import * as DocumentPicker from "expo-document-picker";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

const storage = getStorage();



// Function to upload a document to Firebase Storage
const uploadDocument = async (userId, document, folder) => {
  try {
    const imageRef = ref(
      storage,
      ` documents/${folder}/${userId}/${document.name}`
    );

    const imageSnapShot = await uploadBytes(imageRef, document);
    const imageDownloadURL = await getDownloadURL(imageSnapShot.ref);
    return imageDownloadURL;

    const storageRef = app.storage().ref();
    const documentRef = storageRef.child(
      `documents/${folder}/${userId}/${document.name}`
    );
    await documentRef.put(document);
    return documentRef.getDownloadURL(); // Returning the download URL of the uploaded document
  } catch (error) {
    console.error("Error uploading document:", error);
    throw error;
  }
};

const ProducerRegistration = ({navigation}) => {
  const { user } = useContext(AuthContext);
  // State variables to store user input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [companyBankAccount, setCompanyBankAccount] = useState("");
  const [activity, setActivity] = useState("Sell"); // Default activity is 'Sell'
  const [product, setProduct] = useState("Freshly harvested food"); // Default product
  const [moiDocument, setMoiDocument] = useState(null);
  const [foodSafetyCertificate, setFoodSafetyCertificate] = useState(null);
  const [directorIdDocument, setDirectorIdDocument] = useState(null);
  const [registrationFeeDocument, setRegistrationFeeDocument] = useState(null);
  const producersCollection = collection(db, "producers");

  // Function to handle registration process
  const handleRegistration = async () => {
    try {
      // Creating user with email and password using Firebase authentication
      // const response = await app.auth().createUserWithEmailAndPassword(email, password);
      const userId = user.id;

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

      // Storing registration details in Firestore
      // await db.collection("producers").doc(userId).set({
      //   companyBankAccount,
      //   activity,
      //   product,
      //   moiUrl,
      //   foodSafetyUrl,
      //   directorIdUrl,
      //   registrationFeeUrl,
      // });

      await addDoc(producersCollection, {
        name: user.name,
        companyBankAccount,
        activity,
        product,
        moiUrl,
        foodSafetyUrl,
        directorIdUrl,
        registrationFeeUrl,
        email: user.email,
      });

      // Alerting user upon successful registration
      // Alert.alert(
      //   "Registration Successful",
      //   "Your registration is pending approval."
      // );
      navigation.navigate("Profile")
    } catch (error) {
      // Alerting user in case of registration error
      Alert.alert("Registration Error", error.message);
    }
  };

  // Function to handle document upload
  const handleDocumentUpload = async (type) => {
    try {
      const document = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
      });

      console.log(document, type);

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
      <View
        style={{
          flexDirection: "row",
          // alignItems: "center",
          // justifyContent: "space-between",
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
      {/* <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={setPassword}
        value={password}
        secureTextEntry // Secure text entry for password field
      /> */}
      <TextInput
        style={styles.input}
        placeholder="Company Bank Account Number"
        onChangeText={setCompanyBankAccount}
        value={companyBankAccount}
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
        <View style={styles.uploadButton}>
          <Button
            title="Upload MOI Document"
            onPress={() => handleDocumentUpload("moi")}
          />
        </View>
        <View style={styles.uploadButton}>
          <Button
            title="Upload Food Safety Certificate"
            onPress={() => handleDocumentUpload("foodSafety")}
          />
        </View>
        <View style={styles.uploadButton}>
          <Button
            title="Upload Director ID Document"
            onPress={() => handleDocumentUpload("directorId")}
          />
        </View>
        <View style={styles.uploadButton}>
          <Button
            title="Upload Registration Fee Document"
            onPress={() => handleDocumentUpload("registrationFee")}
          />
        </View>
      </View>
      <View style={styles.registerButton}>
        <Button title="Register" onPress={handleRegistration} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: "100%",
  },
  picker: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
    width: "100%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  uploadButton: {
    flex: 1,
    marginHorizontal: 5,
  },
  registerButton: {
    width: "100%",
    marginTop: 10,
  },
});

export default ProducerRegistration;
