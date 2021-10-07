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



function AddInterest({ navigation }){
    const [interest, setInterest] = useState("");

    function addInterest() {
        addInterestAPI().then((add_response) => {
            console.log(add_response);
            navigation.navigate('Home');
          })
          .catch((error) => {
            console.log(error.message);
          });
          
          
      }
    
      async function addInterestAPI() {
        const response = await fetch("http://127.0.0.1:8000/api/auth/add-interest", {
          method: "POST",
          body: new URLSearchParams({
            name: interest
          }),
          headers: {
            Authorization:
              "bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMzUwNTY1MSwiZXhwIjoxNjMzNTkyMDUxLCJuYmYiOjE2MzM1MDU2NTEsImp0aSI6ImVYdzU4SE9sWTY3YnhqOTYiLCJzdWIiOjEsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.Ar3CSoD2gbD000ybCXnKkHflSOT6VIk7ym1lsa_6VI4",
            Accept: "application / json",
          },
        });
        if (!response.ok) {
          const message = "Error Occurred";
          throw new Error(message);
        }
    
        const add_response = await response.json();
        return add_response;
      }

    return (
        <View style={styles.mainContainer}>
          <StatusBar style="auto" />
          <View>
            <Text style={styles.labelText}>Interest</Text>
            <TextInput
              style={styles.TextInput}
              placeholder="Interest goes here"
              placeholderTextColor="#FE5267"
              onChangeText={(interest) => setInterest(interest)}
            />
          </View>

          <TouchableOpacity style={styles.loginBtn}>
            <Text onPress={addInterest} style={styles.loginText}>
              ADD INTEREST
            </Text>
          </TouchableOpacity>
          </View>
      );
      }

export default AddInterest;

const styles = StyleSheet.create({
    inputView: {
      backgroundColor: "#FFC0CB",
      borderRadius: 30,
      height: 45,
      marginBottom: 20,
      marginTop:"50%",
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
    loginBtn: {
      width: "85%",
      borderRadius: 15,
      height: 50,
      alignSelf: "center",
      justifyContent: "center",
      backgroundColor: "#FE5267",
      marginTop:30
    },
    loginText:{
      textAlign: "center",
      color: "white",
      fontSize: "14pt"
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