import React, {PureComponent} from "react";
import {
  Text,
  StyleSheet, TouchableOpacity
} from "react-native";

export default class Event extends PureComponent {

  handleEventPress = () => {
    if (this.props.event && this.props.onEventPress) {
      this.props.onEventPress(this.props.event);
    }
  };

  render() {
    let eventName = "";
    let eventNote = "";
    if (this.props.event) {
      eventName = this.props.event.name;
      eventNote = this.props.event.note;
      const maxNoteLength = 35;
      if (eventNote.length > maxNoteLength) {
        eventNote = eventNote.slice(0, maxNoteLength - 4) + "...";
      }
    }
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={this.handleEventPress}
      >
        <Text>{eventName}</Text>
        <Text style={styles.note}>{eventNote}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "white",
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  note: {
    color: "#828282"
  }
});
