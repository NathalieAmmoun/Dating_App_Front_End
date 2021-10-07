import React, { Component,useState,useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import Listing from "../component/listing";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { FlatList } from "react-native-gesture-handler";

function Profile({ navigation }) {
  const [name,setName] = useState("")
  const [bio,setbio] = useState("")
  const [nationality,setnationality] = useState("")
  const [interested_in,setinterested_in] = useState("")
  const [height,setheight] = useState("")
  const [gender,setgender] = useState("")

  const [hobbies,sethobbies] = useState("")
  const [interests,setinterests] = useState("")

  const [image,setimage] = useState("")


  async function getProfileApi() {
    const response = await fetch("http://127.0.0.1:8000/api/auth/user-profile", {
      method: "GET",
      headers: {
        Authorization:
          "bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMzUwNTY1MSwiZXhwIjoxNjMzNTkyMDUxLCJuYmYiOjE2MzM1MDU2NTEsImp0aSI6ImVYdzU4SE9sWTY3YnhqOTYiLCJzdWIiOjEsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.Ar3CSoD2gbD000ybCXnKkHflSOT6VIk7ym1lsa_6VI4",
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

  function getProfile() {
    getProfileApi().then(results => {
      console.log(results);
      setName(results.user.name);
      setnationality(results.user.nationality);
      setheight(results.user.height);
      if(results.user.gender == 0){
        setgender("Male")
      }else{
        setgender("Female")
      };
      if(results.user.interested_in == 0){
        setinterested_in(results.user.interested_in);
        setinterested_in("Male")
      }else{
        setinterested_in("Female")
      };
      
      setbio(results.user.bio);
      setName(results.user.name);
      sethobbies(results.hobbies);
      setinterests(results.interests);
      if(results.pictures[0] != null){
      setimage(results.pictures[0].picture_url)}
      
    });
  }
  
  useEffect(() => {
    getProfile()
  },[])
  
  


  return (
    
    <View style={styles.container}>
        <View style={styles.header}></View>
        <Image style={styles.avatar} source={image} />
        <View style={styles.body}>
          <View style={styles.bodyContent}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.info}>Gender: {gender} /Interested_in: {interested_in}</Text>
            <Text style={styles.info}>Nationality: {nationality} /Height: {height}</Text>
            <Text style={styles.description}>{bio}</Text>
            
            <Text style={styles.title}>Hobbies </Text>
            <FlatList
          
          numColumns={2}
          data={hobbies}
          renderItem={({item})=>(
            
            <Listing text={item.name} />
            
          )}
          />

            <Text style={styles.title}>Interests</Text>
            <FlatList
          
          numColumns={2}
          data={interests}
          renderItem={({item})=>(
            
            <Listing text={item.name} />
            
          )}
          />
            <View style={styles.header}></View>
          </View>
      </View>
    </View>
  );
}

export default Profile;

const styles = StyleSheet.create({
  container:{
    backgroundColor: "#FFE0F2",
  },
  header:{
    backgroundColor: "#FFE0F2",
    height:200,
  },
  avatar: {
    width: 180,
    height: 180,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: "#FE5267",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:10,
    backgroundColor:"grey",
  },
  name:{
    fontSize:22,
    color:"#FFFFFF",
    fontWeight:'600',
    marginTop:10,
    marginBottom:10,
  },
  body:{
    marginTop: 0,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:30,
  },
  title:{
    fontSize:20,
    color: "#696969",
    fontWeight: "600",
    marginTop: 10,
    padding:30,
  },
  info:{
    fontSize:16,
    color: "#FE5267",
    marginTop:10
  },
  description:{
    fontSize:16,
    color: "#696969",
    marginTop:10,
    textAlign: 'center'
  },
  
});
