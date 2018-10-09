import React, { Component } from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";


export default class HomeScreen extends Component {
  render() {
    return (

      <View style={styles.container}>

        <View style={styles.iconStyle}>
          <Icon name="ios-home" color="green" size={100}/>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.welcome}>
            Welcome to The Motivation App
          </Text>
          <Text style={styles.textStyle}>
            This is your Home page. Use the tab bar at the bottom of the screen to navigate.
          </Text>
        </View>

      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  iconStyle: {

  },
  textContainer: {
    alignItems: "center",
    marginLeft: 20,
    marginRight: 20,
  },
  welcome: {
    fontSize: 30,
    color: "green",
    textAlign: 'center',
  },
  textStyle: {
    fontSize: 20,
    color: "grey",
    textAlign: 'center',
  }

});
