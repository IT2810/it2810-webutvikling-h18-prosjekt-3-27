import React, {Component} from "react";
import {
  View,
  Text,
  StyleSheet
} from "react-native";

class CalendarScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>CalendarScreen</Text>
      </View>
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
