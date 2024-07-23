import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ProgressBarAndroid,
  ProgressViewIOS,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/config"; // Importing firebase configuration

const Test = () => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({ type: "*/*" });
      if (result.type === "success") {
        console.log("Document picked:", result);
        setSelectedFile(result);
        uploadDocument(result);
      }
    } catch (err) {
      console.log("Error picking document:", err);
    }
  };

  const uploadDocument = async (file) => {
    try {
      const response = await fetch(file.uri);
      const blob = await response.blob();
      const storageRef = ref(storage, `documents/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, blob);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
          setUploadProgress(progress);
        },
        (error) => {
          console.error("Upload failed:", error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at:", downloadURL);
          });
        }
      );
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  const deleteDocument = () => {
    setSelectedFile(null);
    setUploadProgress(0);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.dropZone} onPress={pickDocument}>
        <Text style={styles.dropZoneText}>Browse Or Drop files here</Text>
      </TouchableOpacity>
      {selectedFile && (
        <View style={styles.fileContainer}>
          <Text style={styles.fileName}>{selectedFile.name}</Text>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={deleteDocument}
          >
            <Text style={styles.deleteButtonText}>Delete Document</Text>
          </TouchableOpacity>
        </View>
      )}
      {uploadProgress > 0 && (
        <View style={styles.progressBarContainer}>
          {Platform.OS === "android" ? (
            <ProgressBarAndroid
              styleAttr="Horizontal"
              color="#2196F3"
              progress={uploadProgress / 100}
            />
          ) : (
            <ProgressViewIOS
              progress={uploadProgress / 100}
              progressTintColor="#2196F3"
            />
          )}
          <Text style={styles.progressText}>
            {uploadProgress.toFixed(2)}%
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  dropZone: {
    width: "100%",
    height: 150,
    borderWidth: 2,
    borderColor: "#ccc",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
  dropZoneText: {
    fontSize: 18,
    color: "#777",
  },
  fileContainer: {
    marginTop: 20,
    width: "100%",
    padding: 10,
    backgroundColor: "#e9e9e9",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  fileName: {
    fontSize: 16,
  },
  deleteButton: {
    padding: 10,
    backgroundColor: "#ff5c5c",
    borderRadius: 5,
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 14,
  },
  progressBarContainer: {
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  progressText: {
    marginTop: 10,
    fontSize: 16,
    color: "#555",
  },
});

export default Test;
