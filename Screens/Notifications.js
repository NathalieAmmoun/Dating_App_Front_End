import React, { useState,useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Message from "../component/Message";
import AsyncStorage from '@react-native-async-storage/async-storage';



function Notifications({ navigation }) {
const [notifications,setNotifications] = useState("")
async function getNotificationAPI() {
    const response = await fetch("http://127.0.0.1:8000/api/auth/notifications", {
      method: "GET",
      headers: {
        Authorization:
          "bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMzQ0ODI3NSwiZXhwIjoxNjMzNTM0Njc1LCJuYmYiOjE2MzM0NDgyNzUsImp0aSI6IlZmSERSUWdyR0lWVEx6bE0iLCJzdWIiOjEsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.o98tj_37Bz1i5I62Cdhd2UzdSh9Aw3kurtCCEO0Z9qU",
        Accept: "application / json",
      },
    });

    if (!response.ok) {
      const message = "ERROR OCCURED";
      throw new Error(message);
    }

    const results = await response.json();
    return results;
  }

  function getNotification() {
    getNotificationAPI().then(results => {
      //console.log(results);
      setNotifications(results);
      
    });
    
  }
  
  console.log(notifications);
  
  useEffect(() => {
    getNotification()
  },[])

  
  return (
  <View style={styles.container}>
          <FlatList
          
          KeyExtractor={item => item.id.toString()}
          data={notifications}
          renderItem={({item})=>(
            
            <Message text={item.body} />
            
          )}
          />
          
    </View>
  );



}

export default Notifications;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFE0F2",
    height:"100%",
    

  },
  item:{
    marginTop:24,
    padding:30,
    backgroundColor:"#FFC0CB",
    fontSize:24
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
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    
  },
  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#FF1493",
  },
  stretch: {
    width: 350,
    height: 350,
    resizeMode: "stretch",
  },
});
