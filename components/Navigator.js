import React, {Component} from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import Home from "./Home";
import Icon from "react-native-vector-icons/Ionicons";
import Contacts from "./Contacts";
import EditContact from "./EditContact";
import {Text} from "react-native-elements";

const HomeStack = createStackNavigator({
  Home: Home,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({tintColor}) => (
    <Icon name = "ios-home" color={tintColor} size = {24} />
  )
};

const EditContactStack = createStackNavigator({
  EditContact: 'EditContact',
});

const ContactsStack = createStackNavigator({
  Contacts: Contacts
});

ContactsStack.navigationOptions = {
  tabBarLabel: 'Contacts',
  tabBarIcon: ({tintColor}) => (
    <Icon name="ios-contacts" color={tintColor} size={24}/>
  )
};

const TodoStack = createStackNavigator({
  Todo: 'Todo',
});

TodoStack.navigationOptions = {
  tabBarLabel: 'Todo',
  tabBarIcon: ({tintColor}) => (
    <Icon name="ios-checkmark-circle" color={tintColor} size={24}/>
  )
};

const CalendarStack = createStackNavigator({
  Calendar: 'Calendar',
});

CalendarStack.navigationOptions = {
  tabBarLabel: 'Calendar',
  tabBarIcon: ({tintColor}) => (
    <Icon name="ios-calendar" color={tintColor} size={24}/>
  )
};


export class Todo extends Component{
  render() {
    return (
      <View>
        <Text>Test TODU</Text>
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

export default createBottomTabNavigator({
  HomeStack,
  ContactsStack,
});
