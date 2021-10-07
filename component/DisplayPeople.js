import React, { useState, useEffect } from "react";
import {
  Text,
  SafeAreaView,
  View
} from "react-native";
import ProfileCardView from "./Card";
import Swiping from './Swiping.js';
function DisplayPeople() {
  const [users, setUsers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  //console.log(Display);
  async function displayAPI() {
    const response = await fetch("http://127.0.0.1:8000/api/auth/display", {
      method: "GET",
      headers: {
        Authorization:
          "bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMzUwNTY1MSwiZXhwIjoxNjMzNTkyMDUxLCJuYmYiOjE2MzM1MDU2NTEsImp0aSI6ImVYdzU4SE9sWTY3YnhqOTYiLCJzdWIiOjEsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.Ar3CSoD2gbD000ybCXnKkHflSOT6VIk7ym1lsa_6VI4",
        Accept: "application / json",
      }
    });
    if (!response.ok) {
      const message = "ERROR OCCURED While Displaying Users";
      throw new Error(message);
    }
    const results = await response.json();
    
    return results;
    
  }
     function displayUsers() {
      displayAPI().then(results => {
        setUsers(results);
      }).catch(error=>
          console.log(error));
    }
    
    useEffect(()=>{
      displayUsers();
    },[]);
    console.log(users);
    if (users.length>1){
    var component = users.map((user,index) => {
      
      if(index===currentIndex){
        function handleLike(){
          console.log('like');
          nextUser();
        }
      return (
      <Swiping key ={index} currentIndex ={currentIndex} users={users} handleLike={handleLike} />
      )}
    })}

    
    function nextUser(){
      
      const nextIndex = users.length - 2 === currentIndex? 0 : currentIndex + 1;
      if (nextIndex ==0){
        console.log("All Users Have been swiped");
      }else{
      setCurrentIndex(nextIndex);}
    }

    //  = users.map((user,index) =>{
      
    //   //console.log(picture_url);
      
    //   let picture_url=user.pictures[0];
    //   if(picture_url!=null){
    //     picture_url=picture_url.picture_url;
    //   }
    //   console.log(picture_url);
    //   console.log(user.user.id);
    //   return <ProfileCardView key={user.user.id} id={user.user.id} picture_url={picture_url} name={user.user.name} age={user.user.dob}  />
    //  })
   
  return (
    
    <SafeAreaView >
      <View>{component}</View>
    </SafeAreaView>
    
    )
}


export default DisplayPeople;
