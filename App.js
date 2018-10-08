import React, {Component} from 'react';
import {View} from 'react-native';
import {createBottomTabNavigator, createStackNavigator} from "react-navigation";
import HomeScreen from "./components/HomeScreen";
import ContactsScreen from "./components/ContactsScreen";
import AddContactScreen from "./components/AddContactScreen";
import Icon from "react-native-vector-icons/Ionicons";
import {Text} from "react-native-elements";
import EditContactScreen from "./components/EditContactScreen";

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
 *    * EditContactScreen
 *   * CalendarStack : StackNavigator
 *    * CalendarScreen
 *   * TodoStack : StackNavigator
 *    * TodoScreen
 *
 */


/*
 * These are temporary classes for Todo and Calendar,
 * they should be removed once those screens are implemented
 * */

class TodoScreen extends Component{
  render() {
    return (
      <View>
        <Text>TodoScreen</Text>
      </View>
    );
  }
}

class CalendarScreen extends Component{
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
  Home: HomeScreen
});

const ContactsStack = createStackNavigator({
  Contacts: ContactsScreen,
  AddContact: AddContactScreen,
  EditContact: EditContactScreen
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
