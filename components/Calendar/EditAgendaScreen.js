import React, {Component} from "react";
import {
  View,
  Text,
  StyleSheet
} from "react-native";

class EditAgendaScreen extends Component {
  state = {
    item: null
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>EditAgendaScreen</Text>
        <Text>{JSON.stringify(this.props.navigation.getParam("item"))}</Text>
      </View>
    );
  }
}

export default EditAgendaScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
