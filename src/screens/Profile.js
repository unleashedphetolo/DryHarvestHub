import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Linking,
} from "react-native";
import React, { useContext } from "react";
import Constants from "expo-constants";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import AuthContext from "../context/auth/authContext";

const Profile = ({ navigation }) => {
  const { logout, user } = useContext(AuthContext);

  const handleEmail = () => {
    const email = "phetolo@hmpengineering.co.za";
    const subject = "DryHarvestHub, Assistance Needed";
    const body = "Hi, I need assistance with...";
    const mailto = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    Linking.openURL(mailto).catch((err) =>
      console.error("Error opening mail app", err)
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <View />
      </View>

      <View style={styles.profileImageContainer}>
        <Image
          source={
            user?.image
              ? { uri: user?.image }
              : require("../../assets/profile.webp")
          }
          style={styles.profileImage}
        />
      </View>
      <Text style={styles.userName}>{user?.name}</Text>
      <Text style={styles.userEmail}>{user?.email}</Text>
      <Text style={styles.userEmail}>{user?.bio}</Text>

      <View style={styles.editProfileButtonContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("EditProfile")}>
          <Text style={styles.editProfileButton}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.optionsContainer}>
        <View style={styles.separator} />
        {user?.type === "Producer" && (
          <TouchableOpacity
            onPress={() => navigation.navigate("ProducerRegistration")}
          >
            <OptionItem
              icon="document-attach-outline"
              text="Attachment"
              optionChevronStyle={styles.optionChevronAttachment}
            />
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={() => navigation.navigate("Orders")}>
          <OptionItem
            image={require("../../assets/order.png")}
            text="My Orders"
            optionChevronStyle={styles.optionChevronOrders}
          />
        </TouchableOpacity>
        {/* <TouchableOpacity>
          <OptionItem
            image={require("../../assets/address.jpg")}
            text="Address"
            optionChevronStyle={styles.optionChevronAddress}
          />
        </TouchableOpacity> */}
        <View style={styles.separator} />
        <TouchableOpacity onPress={handleEmail}>
          <OptionItem
            icon="help-circle-outline"
            text="Help & Support"
            optionChevronStyle={styles.optionChevronHelpSupport}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => logout()}>
          <OptionItem
            iconFamily="MaterialIcons"
            icon="logout"
            text="Log out"
            isLogout
            optionChevronStyle={styles.optionChevronLogout}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const OptionItem = ({
  iconFamily = "Ionicons",
  icon,
  image,
  text,
  isLogout,
  optionChevronStyle,
}) => {
  const IconComponent =
    iconFamily === "MaterialIcons" ? MaterialIcons : Ionicons;

  return (
    <View style={styles.optionItem}>
      <View style={styles.optionIconContainer}>
        {icon ? (
          <IconComponent
            name={icon}
            size={26}
            color="black"
            style={styles.optionIcon}
          />
        ) : (
          <Image source={image} style={styles.optionImage} />
        )}
      </View>
      <Text style={[styles.optionText, isLogout && styles.logoutText]}>
        {text}
      </Text>
      <Ionicons
        name="chevron-forward"
        size={20}
        color="black"
        style={[styles.optionChevron, optionChevronStyle]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    padding: 20,
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    color: "black",
    marginRight: 26,
    fontSize: 18,
    fontWeight: "700",
  },
  profileImageContainer: {
    backgroundColor: "white",
    padding: 10,
    marginTop: 30,
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 5,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 70,
    borderWidth: 2,
    borderColor: "#108437",
  },
  userName: {
    color: "black",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "700",
    marginTop: 8,
  },
  userEmail: {
    textAlign: "center",
    fontWeight: "700",
    fontSize: 17,
    color: "grey",
  },
  editProfileButtonContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  editProfileButton: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    backgroundColor: "#108437",
    color: "white",
    fontSize: 18,
    fontWeight: "800",
    borderRadius: 9,
  },
  optionsContainer: {
    flex: 1,
    paddingVertical: 30,
  },
  separator: {
    height: 3,
    backgroundColor: "#ECECEC",
    marginTop: 10,
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 15,
  },
  optionIconContainer: {
    backgroundColor: "white",
    borderRadius: 5,
  },
  optionIcon: {
    marginTop: 15,
  },
  optionImage: {
    height: 26,
    width: 27,
    marginTop: 15,
  },
  optionText: {
    paddingVertical: 3,
    paddingHorizontal: 15,
    marginTop: 13,
    marginRight: 200,
  },
  logoutText: {
    marginRight: 235,
  },
  optionChevron: {},
  optionChevronAttachment: {
    marginTop: 13,
  },
  optionChevronTest: {
    marginTop: 13,
  },
  optionChevronOrders: {
    marginTop: 13,
  },
  optionChevronAddress: {
    marginTop: 13,
  },
  optionChevronHelpSupport: {
    marginTop: 13,
    marginHorizontal: -10,
  },
  optionChevronLogout: {
    marginTop: 13,
  },
});

export default Profile;
