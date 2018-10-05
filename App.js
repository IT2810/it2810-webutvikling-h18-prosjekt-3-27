import React, {Component} from 'react';
import {View} from 'react-native';
import {createBottomTabNavigator, createStackNavigator} from "react-navigation";
import Home from "./components/Home";
import Contacts from "./components/Contacts";
import EditContact from "./components/EditContact";
import Icon from "react-native-vector-icons/Ionicons";
import {Text} from "react-native-elements";

/*
 * This is the React Native entry point. The component
 * that is default exported from there will be the
 * root component, and it's render function will be
 * called to render our application
 *
 * This application uses react-native-nagivation to
 * handle navigation. The navigation exported from
 * here serves as the root component.
 *
 * Our navigation tree is as follows:
 *  RootButtomTabNavigator : BottomTabNavigator
 *   * HomeStack : StackNavigator
 *    * Home
 *   * ContactsStack : StackNavigator
 *    * Contacts
 *    * EditContacts
 *   * CalendarStack : StackNavigator
 *    * Calendar
 *   * TodoStack : StackNavigator
 *    * TodoList
 *
 */


/*
 * These are temporary classes for Todo and Calendar,
 * they should be removed once those screens are implemented
 * */

class Todo extends Component{
  render() {
    return (
      <View>
        <Text>TodoScreen</Text>
      </View>
    );
  }
}

class Calendar extends Component{
  render() {
    return (
      <View>
        <Text>CalendarScreen</Text>
      </View>
    );
  }
}

/*
 * END temporary classes
 */


const HomeStack = createStackNavigator({
  Home: Home
});

const ContactsStack = createStackNavigator({
  Contacts: Contacts,
  EditContact: EditContact
});

const CalendarStack = createStackNavigator({
  Calendar: Calendar
});

const TodoStack = createStackNavigator({
  Todo: Todo
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
