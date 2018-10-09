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
            Tight schedule? Having a hard time keeping track of whats when?
            Organize your schedule with our calendar!
          </Text>
          <Text style={styles.textStyle}>
            Problems organizing your tasks?
            Try our todo list!
          </Text>
          <Text style={styles.textStyle}>
          Always forgetting your friend's last name? And what was her number again...?
            Use our contact list to keep track of who's who.
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
    fontSize: 25,
    color: "green",
    textAlign: 'center',
    margin: 10,
  },
  textStyle: {
    fontSize: 15,
    margin: 10,
    color: "grey",
    textAlign: 'center',
  }

});
