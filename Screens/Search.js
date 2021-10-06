import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProfileCardView from "../component/Card";
import { ScrollView } from "react-native-gesture-handler";
// let remove =AsyncStorage.removeItem('access_token')

function SearchScreen({ navigation }) {
  const [Search, setSearch] = useState("");
  const [users,setUsers] = useState([]);
  console.log(Search);
  async function findFriendsAPI(SearchInput) {

    // useEffect(()=>{
    //   let remove =AsyncStorage.removeItem('access_token')
    // },[])

    const response = await fetch("http://127.0.0.1:8000/api/auth/search", {
      method: "POST",
      headers: {
        Authorization:
          "bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMzUwNTY1MSwiZXhwIjoxNjMzNTkyMDUxLCJuYmYiOjE2MzM1MDU2NTEsImp0aSI6ImVYdzU4SE9sWTY3YnhqOTYiLCJzdWIiOjEsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.Ar3CSoD2gbD000ybCXnKkHflSOT6VIk7ym1lsa_6VI4",
        Accept: "application / json",
      },
      body: new URLSearchParams({
        name: SearchInput,
      }),
    });

    if (!response.ok) {
      const message = "ERROR OCCURED";
      throw new Error(message);
    }

    const results = await response.json();
    return results;
  }

  function findFriends(Searchin) {
    findFriendsAPI(Searchin).then(results => {
      setUsers(results);
    }).catch(error=>{
      console.log(error)
    });
  }

  const saveValue = () =>{
    if(Search){
      findFriends(Search)
    }
  }

  if (users.length>1){
    var component = users.map((user,index) => {
      
      return (
      <ProfileCardView key ={index} user={user} />
      )})
    }
  return (
    <View style={styles.container}>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="search"
          placeholderTextColor="#003F5C"
          onChangeText={(Search) => setSearch(Search)}
        />

      </View>
      <TouchableOpacity style={styles.loginBtn} onPress={saveValue}>
          <Text  style={styles.loginText}>
            SEARCH
          </Text>
        </TouchableOpacity>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        {/* <Text>Search Screen</Text> */}
      </View>
      <ScrollView>
        {component}
      </ScrollView>
    </View>
  );
}

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFE0F2",
    height:"100%",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    marginBottom: 40,
  },
  inputView: {
    backgroundColor: "#FFC0CB",
    borderRadius: 30,
    width: "100%",
    height: 45,
    marginBottom: 20,

  },
  TextInput: {
    height: 50,
    padding: 10,
    justifyContent: "flex-end",
  },
  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
  loginBtn: {
    width: "30%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FE5267",
  },
  stretch: {
    width: 350,
    height: 350,
    resizeMode: "stretch",
  },
  loginText:{
    justifyContent: "flex-end",
    color:"white",
  }
});
