import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

// let remove =AsyncStorage.removeItem('access_token')

function SearchScreen({ navigation }) {
  const [Search, setSearch] = useState("");
  console.log(Search);
  async function findFriendsAPI(SearchInput) {

    useEffect(()=>{
      let remove =AsyncStorage.removeItem('access_token')
    },[])

    const response = await fetch("http://127.0.0.1:8000/api/auth/search", {
      method: "POST",
      headers: {
        Authorization:
          "bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMzQ0ODI3NSwiZXhwIjoxNjMzNTM0Njc1LCJuYmYiOjE2MzM0NDgyNzUsImp0aSI6IlZmSERSUWdyR0lWVEx6bE0iLCJzdWIiOjEsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.o98tj_37Bz1i5I62Cdhd2UzdSh9Aw3kurtCCEO0Z9qU",
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
      console.log(results);
    });
  }

  const saveValue = () =>{
    if(Search){
      findFriends(Search)
    }
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

        <TouchableOpacity style={styles.loginBtn} onPress={saveValue}>
          <Text  style={styles.loginText}>
            SEARCH
          </Text>
        </TouchableOpacity>

      </View>

      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Search Screen</Text>
      </View>
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
    // alignItems: "center",
    flexDirection: 'row',

  },
  TextInput: {
    height: 50,
    // flex: 0.3,
    padding: 10,
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
    marginTop: 40,
    backgroundColor: "#FF1493",
  },
  stretch: {
    width: 350,
    height: 350,
    resizeMode: "stretch",
  },
});
