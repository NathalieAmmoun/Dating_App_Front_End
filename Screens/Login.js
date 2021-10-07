import { StatusBar } from "expo-status-bar";
import React, { useState, } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import App from "../App";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginPage({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function login() {
    loginAPI()
      .then((user_data) => {
        console.log(user_data);
        // let key = user_data.access_token;
        // console.log(key);
        // AsyncStorage.setItem('access_token', key);
        navigation.navigate('HomeStack');

      
      })
      .catch((error) => {
        console.log(error.message);
      });
      
      
  }

  async function loginAPI() {
    const response = await fetch("http://127.0.0.1:8000/api/login", {
      method: "POST",
      body: new URLSearchParams({
        email: email,
        password: password,
      }),
    });
    if (!response.ok) {
      const message = "Wrong Email or Password";
      throw new Error(message);
    }

    const user_data = await response.json();
    return user_data;
  }

  




  return (
    <View style={styles.mainContainer}>
      <Image style={styles.stretch} source={require("../assets/logo4.png")} />
      <StatusBar style="auto" />
      <View>
        <Text style={styles.labelText}>Email</Text>
        <TextInput
          style={styles.TextInput}
          placeholder="johnsmith@example.com"
          placeholderTextColor="#FE5267"
          onChangeText={(email) => setEmail(email)}
        />
      </View>
      <View >
        <Text style={styles.labelText}>Password</Text>
        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          placeholderTextColor="#FE5267"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>
      <View style={{flexDirection: 'row', alignSelf: "center", padding: 30}}>
        <Text >New to Amore? </Text>
        <TouchableOpacity contentContainerStyle={{ flexDirection: 'row'}}>
        <Text style={styles.forgot_button} onPress={() => navigation.navigate('SignupPage')}> Signup. </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.loginBtn}>
        <Text onPress={login} style={styles.loginText}>
          LOGIN
        </Text>
      </TouchableOpacity>
      </View>
  );
  }
const styles = StyleSheet.create({
  image: {
    alignSelf: "center"
  },
  inputView: {
    backgroundColor: "#FFC0CB",
    borderRadius: 30,
    height: 45,
    marginBottom: 20,
    alignItems: "center",
    alignSelf: "center"
  },
  TextInput: {
    backgroundColor: "white",
    borderRadius: 15,
    borderColor: "#FE5267",
    color: "black",
    width: "85%",
    alignSelf:"center",
    borderWidth: 1,
    fontSize:"11pt", 
    padding: 5,
    height: 50,
  },
  forgot_button: {
    color: "#FE5267",
    fontWeight: "bold",
  },
  loginBtn: {
    width: "85%",
    borderRadius: 15,
    height: 50,
    alignSelf: "center",
    justifyContent: "center",
    marginBottom: 500,
    backgroundColor: "#FE5267",
  },
  loginText:{
    textAlign: "center",
    color: "white",
    fontSize: "14pt"
  },
  stretch: {
    width: 80,
    height: 100,
    resizeMode: "stretch",
    marginTop: 40,
    marginBottom: 40,
    alignSelf: "center"
  },
  scrollView : {
    height : "100%", 
    backgroundColor: "#FFE0F2",
  },
  mainContainer : {
    flex : 1,
    backgroundColor: "#FFE0F2",
    height:"100%",
   },
  labelText:{
    marginLeft: 40,
    fontStyle: "bold",
    fontSize: "12pt",
    marginTop:10,
    marginBottom:2
  }
});
