import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

function Listing(props)  {

  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <View style={styles.square}></View>
        <Text style={styles.itemText}>{props.text}</Text>
      </View>
    </View>
  )
}
export default Listing;
const styles = StyleSheet.create({
  item: {
    backgroundColor: '#FE5267',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginHorizontal:10,
    marginTop:10
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    
  },
  square: {
    width: 24,
    height: 24,
    backgroundColor: '#FFF',
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
  },
  itemText: {
    maxWidth: '80%',
    color: '#FFF'
  },
});

