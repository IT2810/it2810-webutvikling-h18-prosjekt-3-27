import React from 'react';
import {View } from 'react-native';
import AppNavigator from './components/AppNavigator';
import Navigator from './components/Navigator';

export default class App extends React.Component {
  render() {
    return (
      <View>
        <Navigator/>
      </View>
    );
  }
}