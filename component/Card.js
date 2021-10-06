import React, {useEffect, useState} from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  Alert,
  ScrollView
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons'; 

function ProfileCardView(props) {

  const user = props.user.user;


let picture_url=props.user.pictures[0];
if(picture_url!=null){
 picture_url=picture_url.picture_url;
}
      
    return (
      
        <View style={styles.container} id={user.id}>
          <View>
          <Image style={[styles.profileImage, styles.imgBox]} source={{uri: picture_url}}/>
          <View style={{position: 'absolute', left: 0,bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={styles.name}>{user.name}  {user.dob}</Text>
            </View>
          </View>
        </View>
   
    );
  }
export default ProfileCardView;
const styles = StyleSheet.create({
 
  container:{
    flex: 1,
    padding:20,
  },
  box: {
    backgroundColor: 'white',
    borderRadius:10,
    borderWidth: 1,
    borderColor:'#FFC7E5',
    shadowColor: '#FF1493',
    shadowOpacity: .3,
    shadowOffset: {
      height:1,
      width:-2
    },
    elevation:2,
  },
  imgBox: {
    backgroundColor: 'grey',
    alignItems: 'center',
    borderRadius:10,
    borderWidth: 1,
    borderColor:'#FFC7E5',
    shadowColor: '#FF1493',
    shadowOpacity: .3,
    shadowOffset: {
      height:1,
      width:-2
    },
    elevation:2,
  },
  profileImage:{
    borderRadius:10,
    width:300,
    height:400,
  },
  name:{
    fontSize:20,
    marginBottom:5,
    color: 'white',
    justifyContent: 'flex-end',
    marginLeft: 10
  },
  buttonContainer:{
    marginTop: 20,
    flexDirection:'row',
    justifyContent: 'center'
  },

  button: {

    width:40,
    height:40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    borderRadius:30,
    margin:10,
    borderWidth: 1,
    borderColor: '#A9A9A9',
    shadowColor: 'black',
    shadowOpacity: .8,
    shadowOffset: {
      height:2,
      width:-2
    },
    elevation:4,
  },
  icon: {
    width:35,
    height:35,
  },

});