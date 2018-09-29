import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createBottomTabNavigator} from 'react-navigation';
import Home from "./components/Home";
import Icon from 'react-native-vector-icons/Ionicons';
import Todo from './components/Todo/Todo.js';

export class App extends Component{
  render() {
    return (
      <View style={styles.container}>
        <Home />
      </View>
    );
  }
}

export class Calendar extends Component{
  render() {
    return (
      <View>
        <Text>test cal</Text>
      </View>
    );
  }
}
export class Contacts extends Component{
  render() {
    return (
      <View>
        <Text>test contacts</Text>
      </View>
    );
  }
}
/* -------------------------------------------*/

export default createBottomTabNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({tintColor}) => (
        <Icon name = "ios-home" color={tintColor} size = {24} />
      )
    }
  },
  Todo: {
    screen: Todo,
    navigationOptions: {
      tabBarLabel: 'Todo',
      tabBarIcon: ({tintColor}) => (
        <Icon name="ios-checkmark-circle" color={tintColor} size={24}/>
      )
    }
  },
  Calendar: {
    screen: Calendar,
    navigationOptions: {
      tabBarLabel: 'Calendar',
      tabBarIcon: ({tintColor}) => (
        <Icon name="ios-calendar" color={tintColor} size={24}/>
      )
    }
  },
  Contacts: {
    screen: Contacts,
    navigationOptions: {
      tabBarLabel: 'Contacts',
      tabBarIcon: ({tintColor}) => (
        <Icon name="ios-contacts" color={tintColor} size={24}/>
      )
    }
  }
}, {
  initialRouteName: 'Home',
  order: ['Home', 'Contacts', 'Calendar', 'Todo'],
  navigationOptions : {
    tabBarVisible: true,
  },
  tabBarOptions: {
    activeTintColor: 'black',
    inactiveTintColor: 'grey'
  }

});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

