import React, { useReducer } from "react";
import AuthReducer from "./authReducer";
import AuthContext from "./authContext";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  AUTH_ERROR,
  AUTH_LOADING,
  LOGIN,
  LOGOUT,
  REGISTER,
  RESET_PASSWORD,
  SET_USER,
  UPDATE_PROFILE,
  USER_LOADING,
} from "../types";
import { auth, db } from "../../firebase/config";
import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
const storage = getStorage();

const AuthState = ({ children }) => {
  const initialState = {
    user: null,
    loading: false,
    userLoading: false,
  };
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  // Register
  const register = (user, type) => {
    setAuthLoading();
    createUserWithEmailAndPassword(auth, user.email, user.password)
      .then((credentials) => {
        setDoc(doc(db, "profile", credentials.user.uid), {
          name: user.name,
          type,
        })
          .then(() => console.log("profile saved"))
          .catch((error) => console.log(error));
        dispatch({ type: REGISTER });
      })
      .catch((err) => {
        console.log(err);
        if (err.code === "auth/email-already-in-use") {
          console.error("That email address is already in use!");
        }

        if (err.code === "auth/invalid-email") {
          console.error("That email address is invalid!");
        }

        dispatch({ type: AUTH_ERROR });
      });
  };

  // Set User
  const setUser = async (user) => {
    console.log(user);
    if (user) {
      const { email, uid } = user;
      const profile = await getDoc(doc(db, "profile", uid));
      console.log(profile);
      if (profile.exists()) {
        console.log(profile.data());
        dispatch({
          type: SET_USER,
          payload: {
            ...profile.data(),
            email,
            id: uid,
          },
        });
      } else {
        dispatch({ type: AUTH_ERROR });
      }
    } else {
      dispatch({ type: AUTH_ERROR });
    }
  };

  const updatePersonalInfo = async (id, info, navigation) => {
    setAuthLoading();
    try {
      const update = {
        name: info.name,
        surname: info.surname,
        bio: info.bio,
      };

      if (Object.keys(info.image).length) {
        const imageRef = ref(
          storage,
          "images/" + new Date().valueOf() + "_" + info.image.name
        );
        const imageSnapShot = await uploadBytes(imageRef, info.image.blob);
        update.image = await getDownloadURL(imageSnapShot.ref);
      }

      await updateDoc(doc(db, "profile", id), {
        ...update,
      });
      dispatch({
        type: UPDATE_PROFILE,
        payload: { id, ...update },
      });
      navigation.goBack();
    } catch (error) {
      console.log(error);
      dispatch({ type: AUTH_ERROR, payload: error });
    }
  };

  // Logout
  const logout = async () => {
    setAuthLoading();
    try {
      await signOut(auth);
      dispatch({
        type: LOGOUT,
      });
    } catch (err) {
      dispatch({ type: AUTH_ERROR });
      console.log(err);
    }
  };

  // Login
  const login = (user) => {
    setAuthLoading();
    signInWithEmailAndPassword(auth, user.email, user.password)
      .then(() => dispatch({ type: LOGIN }))
      .catch((err) => {
        console.log(err);
        if (err.code === "auth/user-not-found") {
          console.error("well user not found");
        }
        if (err.code === "auth/wrong-password") {
          console.error("You have enter the wrong password");
        }
        if (err.code === "auth/invalid-email") {
          console.error("That email address is invalid!");
        }

        if (err.code === "auth/invalid-credential")
          console.error("Invalid email or password");
        dispatch({ type: AUTH_ERROR });
      });
  };

  // Reset password
  const resetPassword = (email, navigation) => {
    setAuthLoading();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log("Password reset email sent");
        dispatch({ type: RESET_PASSWORD });
        navigation.navigate("Login");
      })
      .catch((err) => {
        if (err.code === "auth/user-not-found") {
          console.error("well user not found");
        }

        if (err.code === "auth/invalid-email") {
          console.error("That email address is invalid!");
        }
        if (err.code === "auth/missing-email") {
          console.error("No email address is entered!");
        }
        dispatch({ type: AUTH_ERROR });
      });
  };

  // Set Loading
  const setAuthLoading = () => dispatch({ type: AUTH_LOADING });
  const setUserLoading = () => dispatch({ type: USER_LOADING });

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        userLoading: state.userLoading,
        isAuthenticated: state.isAuthenticated,
        register,
        setUser,
        setUserLoading,
        logout,
        login,
        updatePersonalInfo,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
