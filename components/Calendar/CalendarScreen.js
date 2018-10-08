import React, {Component} from "react";
import {
  View,
  Text,
  StyleSheet
} from "react-native";
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

class CalendarScreen extends Component {
  render() {
    return (
      <CalendarList />
    );
  }
}

export default CalendarScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
