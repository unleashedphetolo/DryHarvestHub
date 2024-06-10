import React, { useReducer } from "react";
import AuthReducer from "./authReducer";
import AuthContext from "./authContext";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import {
  AUTH_ERROR,
  AUTH_LOADING,
  LOGIN,
  LOGOUT,
  REGISTER,
  SET_USER,
  USER_LOADING,
} from "../types";
import { auth } from "../../firebase/config";

const AuthState = ({ children }) => {
  const initialState = {
    user: null,
    loading: false,
    userLoading: false,
  };
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  // Register
  const register = (user) => {
    setAuthLoading();
    createUserWithEmailAndPassword(auth, user.email, user.password)
      .then((credentials) => {
        updateProfile(credentials.user, { displayName: user.name })
          .then(() => console.log("name saved"))
          .catch((error) => console.log(error));
        dispatch({ type: REGISTER });
      })
      .catch((err) => {
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
    if (user) {
      const { email, displayName, uid } = user;

      dispatch({
        type: SET_USER,
        payload: {
          name: displayName,
          email,
          id: uid,
        },
      });
    } else {
      dispatch({ type: AUTH_ERROR });
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
