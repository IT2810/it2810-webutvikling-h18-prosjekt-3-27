import React, {Component} from 'react';
import {View} from 'react-native';
import {createBottomTabNavigator, createStackNavigator} from "react-navigation";
import HomeScreen from "./components/HomeScreen";
import ContactsScreen from "./components/ContactsScreen";
import AddContactScreen from "./components/AddContactScreen";
import Icon from "react-native-vector-icons/Ionicons";
import {Text} from "react-native-elements";
import TodoScreen from "./components/Todo/TodoScreen"
import CalendarScreen from "./components/Calendar/CalendarScreen";

/*
 * This is the React Native entry point. The component
 * that is default exported from here will be the
 * root component, and its render function will be
 * called to render our application
 *
 * This application uses react-native-navigation to
 * handle navigation. The navigation exported from
 * here serves as the root component.
 *
 * Our navigation tree is as follows:
 *  RootBottomTabNavigator : BottomTabNavigator
 *   * HomeStack : StackNavigator
 *    * HomeScreen
 *   * ContactsStack : StackNavigator
 *    * ContactsScreen
 *    * AddContactScreen
 *   * CalendarStack : StackNavigator
 *    * CalendarScreen
 *   * TodoStack : StackNavigator
 *    * TodoScreen
 *
 */


const HomeStack = createStackNavigator({
  Home: HomeScreen
});

const ContactsStack = createStackNavigator({
  Contacts: ContactsScreen,
  AddContact: AddContactScreen
});

const CalendarStack = createStackNavigator({
  Calendar: CalendarScreen
});

const TodoStack = createStackNavigator({
  Todo: TodoScreen
});

const RootBottomTabNavigator = createBottomTabNavigator({
  Home: {
    screen: HomeStack,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({tintColor}) => (
        <Icon name="ios-home" color={tintColor} size={24}/>
      )
    }
  },
  Contacts: {
    screen: ContactsStack,
    navigationOptions: {
      tabBarLabel: 'Contacts',
      tabBarIcon: ({tintColor}) => (
        <Icon name="ios-contacts" color={tintColor} size={24}/>
      )
    }
  },
  Calendar: {
    screen: CalendarStack,
    navigationOptions: {
      tabBarLabel: 'Calendar',
      tabBarIcon: ({tintColor}) => (
        <Icon name="ios-calendar" color={tintColor} size={24}/>
      )
    }
  },
  Todo: {
    screen: TodoStack,
    navigationOptions: {
      tabBarLabel: 'Todo',
      tabBarIcon: ({tintColor}) => (
        <Icon name="ios-checkmark-circle" color={tintColor} size={24}/>
      )
    }
  }
});

export default RootBottomTabNavigator;
