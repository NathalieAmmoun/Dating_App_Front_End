import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import LoginPage from "./components/Login";
import SignupPage from "./components/Signup";


 
export default function App() {

  return (
    <View style={styles.container}>
      {/* <LoginPage /> */}
      <LoginPage />

    </View>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
 
});
