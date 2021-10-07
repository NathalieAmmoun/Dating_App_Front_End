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
export default function SignupPage({ navigation }) {
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
  const [gender, setGender] = useState("0");
  const [interested_in, setInterested_in] = useState("0");
  const [dob, setDOB] = useState("");
  function register(){
     registerAPI().then(user_data=>{
      navigation.navigate('ContinueRegistration');
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
    <ScrollView style={styles.mainContainer}>
      <View style={styles.scrollViewContainer}>
      <Image style={styles.stretch} source={require("../assets/logo4.png")} />
      <StatusBar style="auto" />
      <View>
        <Text style={styles.labelText}>Name</Text>
        <TextInput
          style={styles.TextInput}
          placeholder="John Smith"
          placeholderTextColor="#FE5267"
          onChangeText={(name) => setName(name)}
        />
      </View>
      <View>
        <Text style={styles.labelText}>Date of Birth</Text>
        <TextInput
          style={styles.TextInput}
          placeholder="1994-08-25"
          placeholderTextColor="#FE5267"
          onChangeText={(dob) => setDOB(dob)}
        />
      </View>
      <View>
        <Text style={styles.labelText}>E-mail Address</Text>
        <TextInput
          style={styles.TextInput}
          placeholder="Johnsmith@example.com"
          placeholderTextColor="#FE5267"
          onChangeText={(email) => setEmail(email)}
        />
      </View>
      <View>
        <Text style={styles.labelText}>Password</Text>
        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          secureTextEntry={true}
          placeholderTextColor="#FE5267"
          onChangeText={(password) => setPassword(password)}
        />
      </View>
      <View>
        <Text style={styles.labelText}>Confirm Password</Text>
        <TextInput
          style={styles.TextInput}
          placeholder="Confirm Password"
          secureTextEntry={true}
          placeholderTextColor="#FE5267"
          onChangeText={(password_confirmation) => setPasswordConfirmation(password_confirmation)}
        />
      </View>
      <View>
        <Text style={styles.labelText}>Gender</Text>
        <View style={styles.TextInput}>
        <RadioForm
         radio_props={radio_props}
         initial={0}
         buttonSize={10}
         style={styles.radioBtn}
         formHorizontal={true}
         buttonColor={'#FE5267'}
         radioStyle={{paddingRight: 20}}
         labelHorizontal={true}
         onPress={(value) => setGender(value)}>
        </RadioForm>
        </View>
      </View>
      <View>
        <Text style={styles.labelText}>Interested In</Text>
        <View style={styles.TextInput}>
        <RadioForm
         radio_props={radio_props}
         initial={0}
         buttonSize={10}
         style={styles.radioBtn}
         formHorizontal={true}
         buttonColor={'#FE5267'}
         radioStyle={{paddingRight: 20}}
         labelHorizontal={true}
         onPress={(value) => setInterested_in(value)}>
        </RadioForm>
        </View>
      </View>
      <View style={{flexDirection: 'row', alignSelf: "center", padding: 30}}>
        <Text >Already on Amore? </Text>
        <TouchableOpacity contentContainerStyle={{ flexDirection: 'row'}}>
        <Text style={styles.forgot_button} onPress={() => navigation.navigate('LoginPage')}> Login. </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.loginBtn} >
        <Text onPress={register} style={styles.loginText} >SIGN UP</Text>
      </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  radioBtn: {
    alignSelf: "center",
    padding: 2,
    margin: 10,
  },
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
    marginBottom: 30,
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
  scrollViewContainer : { },
  labelText:{
    marginLeft: 40,
    fontStyle: "bold",
    fontSize: "12pt",
    marginTop:10,
    marginBottom:2
  }
});