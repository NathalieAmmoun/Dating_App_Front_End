import React,{useEffect, useState}from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View,button } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Home from "./Screens/Home";
import SecondScreen from "./Screens/SecondScreen";
import Search from "./Screens/Search";
import Notification from "./Screens/Notifications";
import Profile from "./Screens/Profile";

import LoginPage from "./Screens/Login";
import SignupPage from "./Screens/Signup";

const Stack = createDrawerNavigator();
const AppStack = createNativeStackNavigator();

// let remove =AsyncStorage.removeItem('access_token')
// let data = AsyncStorage.getItem('access_token')
        
    
// console.log(data);
// console.log("Hello");




export default function App(){
  const [token,settoken]= useState('')

  useEffect(()=>{
    getData()
  },[token])

  const getData = ()=>{
      AsyncStorage.getItem('access_token')
      .then(value=>{
        if(value != null){
          settoken(value)
          console.log(value)
          console.log("token")
        }
      })
    }
  
  
  return (
    <NavigationContainer>
      <AppStack.Navigator initialRouteName="LoginPage">
      <AppStack.Screen name="LoginPage" component={LoginPage}options={{
          headerStyle: {
            backgroundColor: "#FE5267",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}/>
      <AppStack.Screen name="SignupPage" component={SignupPage}/>
      <AppStack.Screen name="HomeStack" component={HomeStack}/>

      </AppStack.Navigator >
    </NavigationContainer>
      )
}

function HomeStack(){
        return(
    
      <Stack.Navigator initialRouteName="Profile">
        <Stack.Screen name="Home" component={Home} 
        options={{
          headerStyle: {
            backgroundColor: "#FE5267",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}/>
        <Stack.Screen name="Search" component={Search}
        options={{
          headerStyle: {
            backgroundColor: "#FE5267",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }} />
        <Stack.Screen name="Notification" component={Notification} 
        options={{
            headerStyle: {
              backgroundColor: "#FE5267",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}/>
        <Stack.Screen name="Profile" component={Profile} 
        options={{
            headerStyle: {
              backgroundColor: "#FE5267",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
           }} />
        <Stack.Screen
          name="SecondScreen"
          component={SecondScreen}
          options={{
            headerStyle: {
              backgroundColor: "#FE5267",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
      </Stack.Navigator>
    
  )}

// let data = AsyncStorage.getItem('access_token')
// if(data){}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  text: {
    color: "#161924",
    fontSize: 20,
    fontWeight: "500",
  },
  headers: { flex: 1, alignItems: "center", justifyContent: "center" },
});
