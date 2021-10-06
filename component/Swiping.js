import React, {useEffect} from "react";
import {View, Text} from 'react-native';
import { Swipeable } from "react-native-gesture-handler";
import {RectButton} from "react-native-gesture-handler";
import ProfileCardView from './Card';
export default function Swiping(props){//{users, currentIndex, handleLike}

    function favorite(id) {
        async function favoriteAPI(user_id) {
          const response = await fetch("http://127.0.0.1:8000/api/auth/favorite", { 
            method: "POST",
            headers: {
              Authorization:"bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzMzUxOTU1MCwiZXhwIjoxNjMzNjA1OTUwLCJuYmYiOjE2MzM1MTk1NTAsImp0aSI6Ingxb3ZBNWd2VWNxMGdQb3MiLCJzdWIiOjEsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.n5w-4P-iF2lPPr6TnD_I5CnIuuntU1lfNlpsNglU2m8",
              Accept: "application/json",
            },
            body: new URLSearchParams({
              "user2_id": user_id,
            }),
          });
          if (!response.ok) {
            const message = "ERROR OCCURED While favoureting User Users";
            throw new Error(message);
          }
          const results = await response.json();
          return results;
        }
        function fav(user_id) {
          favoriteAPI(user_id).then(results => {
            
          }).catch(error=>
              console.log(error));
        }
        fav(id);
    }
    const users = props.users;
    const currentIndex = props.currentIndex;
    
    const user_id = users[currentIndex].user.id;
    
const renderLeftActions =()=>{
    return ( <RectButton>
        <ProfileCardView user={users[currentIndex+1]}></ProfileCardView>
    </RectButton>
    )
}
const renderRightActions =()=>{
  
    return (<RectButton>
        <ProfileCardView user={users[currentIndex+1]}></ProfileCardView>
    </RectButton>
    )
}



    return(
        <Swipeable
        friction={1}
        leftThreshold={40}
        rightThreshold={40}
        renderLeftActions={renderLeftActions}
        renderRightActions={renderRightActions}
        onSwipeableLeftOpen={()=>{
          props.handleLike();
          favorite(user_id)
          }}>
            
            <ProfileCardView user={users[currentIndex]}/>
        </Swipeable>
    )
}