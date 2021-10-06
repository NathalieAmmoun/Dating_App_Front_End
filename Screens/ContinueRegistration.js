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



function ContinueRegistration({ navigation }){
    const [bio, setBio] = useState("");
    const [nationality, setNationality] = useState("");
    const [height, setHeight] = useState("");


    function continueRegistration() {
        continueRegistrationAPI().then((result) => {
            console.log(result);
            navigation.navigate('HomeStack');
          })
          .catch((error) => {
            console.log(error.message);
          });
          
          
      }
    
      async function continueRegistrationAPI() {
        const response = await fetch("http://127.0.0.1:8000/api/auth/continue-registration", {
          method: "POST",
          body: new URLSearchParams({
            bio: bio,
            height: height,
            nationality: nationality
          }),
          headers: {
            Authorization:
              "bearer  eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMzUwNTY1MSwiZXhwIjoxNjMzNTkyMDUxLCJuYmYiOjE2MzM1MDU2NTEsImp0aSI6ImVYdzU4SE9sWTY3YnhqOTYiLCJzdWIiOjEsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.Ar3CSoD2gbD000ybCXnKkHflSOT6VIk7ym1lsa_6VI4",
            Accept: "application / json",
          },
        });
        if (!response.ok) {
          const message = "Error Occurred";
          throw new Error(message);
        }
    
        const result = await response.json();
        return result;
      }

    return (
        <ScrollView style={styles.mainContainer}>
          <StatusBar style="auto" />
          <View>
            <Text style={styles.labelText}>Nationality</Text>
            <TextInput
              style={styles.TextInput}
              placeholder="Your country"
              placeholderTextColor="#FE5267"
              onChangeText={(nationality) => setNationality(nationality)}
            />
          </View>

          <View>
            <Text style={styles.labelText}>Height</Text>
            <TextInput
              style={styles.TextInput}
              placeholder="Your height in cm"
              placeholderTextColor="#FE5267"
              onChangeText={(height) => setHeight(height)}
            />
          </View>

          <View>
            <Text style={styles.labelText}>Bio</Text>
            <TextInput
              style={styles.TextInput}
              multiline={true}
              placeholder="Describe yourself"
              placeholderTextColor="#FE5267"
              onChangeText={(bio) => setBio(bio)}
            />
          </View>

          <TouchableOpacity style={styles.loginBtn}>
            <Text onPress={continueRegistration} style={styles.loginText}>
              DONE
            </Text>
          </TouchableOpacity>
          </ScrollView>
      );
      }

export default ContinueRegistration;

const styles = StyleSheet.create({
    avatar: {
      width: 180,
      height: 180,
      borderRadius: 100,
      borderWidth: 4,
      borderColor: "#FE5267",
      marginBottom:10,
      alignSelf:'center',
      marginBottom: 10,
      marginTop:10
    },
    inputView: {
      backgroundColor: "#FFC0CB",
      borderRadius: 30,
      height: 45,
      marginBottom: 20,
      paddingTop:0,
      marginTop:"50%",
      alignItems: "center",
      alignSelf: "center"
    },
    TextInput: {
      backgroundColor: "white",
      borderRadius: 15,
      borderColor: "#FE5267",
      color: "black",
      width: "80%",
      alignSelf:"center",
      paddingTop: 0,
      borderWidth: 1,
      fontSize:"14pt", 
      padding: 5,
      height: 50,
      margin: 10,
    },
    loginBtn: {
      width: "50%",
      borderRadius: 15,
      height: 50,
      alignSelf: "center",
      justifyContent: "center",
      backgroundColor: "#FE5267",
      marginBottom: 20,
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
      paddingBottom: 0,
      fontStyle: "bold",
      fontSize: "14pt"
    }
  });