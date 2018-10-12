import React, {PureComponent} from "react";
import {
  Text,
  StyleSheet, TouchableOpacity
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

class AddEvent extends PureComponent {

  handleAddAgendaPress = () => {
    if (this.props.date && this.props.onAddAgenda) {
      this.props.onAddAgenda(this.props.date);
    }
  };

  render() {
    return (
      <TouchableOpacity
        style={styles.itemAdd}
        onPress={this.handleAddAgendaPress}
      >
        <Icon style={{margin: 5}} name="ios-add-circle" color="green" size={28}/>
        <Text>Create event</Text>
      </TouchableOpacity>
    );
  }
}

export default AddEvent;

const styles = StyleSheet.create({
  itemAdd: {
    backgroundColor: "white",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  }
});
