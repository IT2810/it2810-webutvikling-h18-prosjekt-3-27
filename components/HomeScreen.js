import React, { PureComponent } from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import Link from "./StyledText/Link";

export default class HomeScreen extends PureComponent {

  static navigationOptions = {
    title: "Home",
    headerTitleStyle: {
      textAlign: "center",
      flex: 1
    }
  };

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
            Organize your schedule with our <Link onPress={this.gotoCalendar}>calendar!</Link>
          </Text>
          <Text style={styles.textStyle}>
            Problems organizing your tasks?
            Try our <Link onPress={this.gotoTodo}>todo list!</Link>
          </Text>
          <Text style={styles.textStyle}>
            Always forgetting your friend's last name? And what was her number again...?
            Use our <Link onPress={this.gotoContacts}>contact list</Link> to keep track of who's who.
          </Text>
          <Text style={styles.textStyle}>
            Tired of counting your steps? Getting distracted and losing count?
            Use our <Link onPress={this.gotoPedometer}>pedometer integration</Link> to
            handle the numbers for you!
          </Text>
        </View>

      </View>
    );
  }

  gotoCalendar = () => {
    this.props.navigation.navigate("Calendar");
  };

  gotoTodo = () => {
    this.props.navigation.navigate("Todo");
  };

  gotoContacts = () => {
    this.props.navigation.navigate("Contacts");
  };

  gotoPedometer = () => {
    this.props.navigation.navigate("Pedometer");
  };
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
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
