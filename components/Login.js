import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
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
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function login() {
    loginAPI()
      .then((user_data) => {
        console.log(user_data);
        save('@access_token', user_data.access_token );
        console.log(get("@access_token"));
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

   function save(key, value){

    try{
      const value =  AsyncStorage.setItem(key , value);
    }catch(error){
      console.log(error);
    }
  }

   function get(key){

    try{
      const value =  AsyncStorage.getItem(key);
      return value;
    }catch(error){
      console.log(error);
    }
  }



  return (
    <View style={styles.mainContainer}>
    <ScrollView contentContainerStyle={{flexGrow : 1, justifyContent : 'center'}}>
      <View style={styles.scrollViewContainer}>
      <Image style={styles.stretch} source={require("../assets/logo2.jpg")} />

      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email"
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setEmail(email)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>

      <TouchableOpacity>
        <Text style={styles.forgot_button}>New to Amore? Signup. </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginBtn}>
        <Text onPress={login} style={styles.loginText}>
          LOGIN
        </Text>
      </TouchableOpacity>
      </View>
    </ScrollView>
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

  image: {
    marginBottom: 40,
  },

  inputView: {
    backgroundColor: "#FFC0CB",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
    alignSelf: "center"
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    
  },

  forgot_button: {
    height: 30,
    marginBottom: 30,
    alignSelf: "center",
  },

  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignSelf: "center",
    justifyContent: "center",
    marginBottom: 0,
    backgroundColor: "#FF1493",
  },

  loginText:{
    textAlign: "center"
  },

  stretch: {
    width: 350,
    height: 350,
    resizeMode: "stretch",
  },
  scrollView : {
    height : "100%", 
  },
  mainContainer : {
    flex : 1
   },
  scrollViewContainer : { },
});
