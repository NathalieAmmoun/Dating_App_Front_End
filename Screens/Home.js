import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
    </View>
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFE0F2",
    height:"100%",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#161924",
    fontSize: 20,
    fontWeight: "500",
  },
});