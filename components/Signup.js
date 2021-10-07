import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
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



 
export default function SignupPage() {
  var radio_props = [
        {label: 'Male', value: "0" },
        {label: 'Female', value: "1" }
      ];
  var radio_props2 = [
        {label: 'Men', value: "0" },
        {label: 'Women', value: "1" }
      ];
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [gender, setGender] = useState("");
  const [interested_in, setInterested_in] = useState("");
  const [dob, setDOB] = useState("");


  function register(){
     registerAPI().then(user_data=>{
       console.log(user_data);
   }).catch(error => {
     console.log(error.message);
   });
  
  }
  
  
  async function registerAPI(){
    const response = await fetch("http://127.0.0.1:8000/api/auth/register", {
        method: 'POST',
        body: new URLSearchParams({
            "name": name,
            "email" : email,
            "password": password,
            "password_confirmation": password_confirmation,
            "gender": gender,
            "interested_in": interested_in,
            "dob": dob,
        })
    });
    if(!response.ok){
      const message = "Error Occurred";
      throw new Error(message);
  }
  
  const user_data = await response.json();
  return user_data;
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
          placeholder="Name: John Smith"
          placeholderTextColor="#003f5c"
          onChangeText={(name) => setName(name)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Date of birth: Y-m-d"
          placeholderTextColor="#003f5c"
          onChangeText={(dob) => setDOB(dob)}
        />
      </View>


    

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email: john@example.com"
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

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password Confirmation"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password_confirmation) => setPasswordConfirmation(password_confirmation)}
        />
      </View>

      <View>
        <Text style={styles.title}>Gender</Text>
        <RadioForm
         radio_props={radio_props}
         initial={0}
         buttonSize={10}
         style={styles.radioBtn}
         formHorizontal={true}
         labelStyle={{padding: 2}}
         buttonColor={'#FF1493'}
         labelHorizontal={true}
         onPress={(value) => setGender(value)}>
          
        </RadioForm>
      </View>

      <View>
        <Text style={styles.title}>Interested In</Text>
        <RadioForm
         radio_props={radio_props2}
         initial={0}
         buttonSize={10}
         style={styles.radioBtn}
         formHorizontal={true}
         labelStyle={{padding: 2}}
         buttonColor={'#FF1493'}
         labelHorizontal={true}
         onPress={(value) => setInterested_in(value)}>
          
        </RadioForm>
      </View>
 
      <TouchableOpacity>
        <Text style={styles.forgot_button}>New to Amore? Signup. </Text>
      </TouchableOpacity>
 
      <TouchableOpacity style={styles.loginBtn}>
        <Text onPress={register} style={styles.loginText}>SIGN UP</Text>
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
    borderRadius: 20,
    width: "90%",
    alignSelf: "center",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },
 
  TextInput: {
    height: 50,
    width: "100%",
    flex: 1,
    padding: 10,
    textAlign: "center",
  },
 
  forgot_button: {
    height: 30,
    marginBottom: 0,
    alignSelf: "center"
  },
 
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 45,
    alignSelf: "center",
    justifyContent: "center",
    marginBottom: 20,
    backgroundColor: "#FF1493",
  },

  loginText:{
    textAlign: "center"
  },

  title:{
    paddingLeft: "20%",
    fontSize:10,
  },

  stretch: {
    width: 350,
    height: 350,
    resizeMode: 'stretch',
  },
  radioBtn: {
    alignSelf: "center",
    padding: 2,
    margin: 10
  },
  scrollView : {
    height : "100%", 
  },
  mainContainer : {
    flex : 1
   },
  scrollViewContainer : { },
});
