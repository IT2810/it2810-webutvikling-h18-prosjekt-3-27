import React, {Component} from "react";
import {
  View,
  Text,
  StyleSheet
} from "react-native";

class AddAgendaScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>AddAgendaScreen</Text>
        <Text>{JSON.stringify(this.props.navigation.getParam("date"))}</Text>
      </View>
    );
  }
}

export default AddAgendaScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
