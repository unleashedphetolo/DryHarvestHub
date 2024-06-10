import React from "react";
import AuthState from "./src/context/auth/authState";
import MainNavigator from "./src/components/MainNavigator";
import AppState from "./src/context/app/appState";

export default function App() {
  return (
    <AuthState>
      <AppState>
      <MainNavigator />
      </AppState>
    </AuthState>
  );
}
