import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

function Message(props)  {

  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <View style={styles.square}></View>
        <Text style={styles.itemText}>{props.text}</Text>
      </View>
      <View style={styles.circular}></View>
    </View>
  )
}
export default Message;
const styles = StyleSheet.create({
  item: {
    backgroundColor: '#FFC0CB',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap'
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
    color: '#808080'
  },
  circular: {
    width: 12,
    height: 12,
    borderColor: '#FFF',
    borderWidth: 2,
    borderRadius: 5,
  },
});

