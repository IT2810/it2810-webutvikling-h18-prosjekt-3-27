import {StyleSheet, Text, View, TextInput} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import React, {Component} from "react";

export default class TodoItem extends Component {

  _handlePress = () => {
    this.props.toggleComplete(this.props.index);
  };

  _handleTextEdit = () => {
    this.props.onEditStart(this.props.item.key)
  };

  _handleTextChange = () => {

  };

  render() {
    let item = this.props.item;
    console.log(this.props.selected);
    console.log(this.props.item.key);
    return (
      <View>
        <View style={styles.itemContainer}>
          {(this.props.selected === this.props.item.key) ?
          <TextInput
            value={this.props.item.text}
            onChangeText={this._handleTextChange}
          />
         :
          <Text onPress={this._handleTextEdit} style={item.completed ? styles.itemCompleted : styles.item}>
            {item.text}
          </Text>

          }
          <Icon style={styles.button} name={item.completed ? "ios-checkmark-circle": "ios-radio-button-off"}  color={item.color} size={50}
                onPress={this._handlePress}/>
        </View>
        <View style={styles.hr}/>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  item: {
    flex: 1,
    flexWrap: "wrap",
    paddingLeft: 10,
    paddingTop: 2,
    paddingBottom: 2,
    fontSize: 18,
    margin: 5,
  },
  itemCompleted: {
    flex: 1,
    flexWrap: "wrap",
    textDecorationLine: "line-through",
    color: "#D3D3D3",
    paddingLeft: 10,
    paddingTop: 2,
    paddingBottom: 2,
    fontSize: 18,
    margin: 5,
  },
  button: {
    marginRight: 5,
  },
  hr: {
    marginTop: 5,
    marginBottom: 5,
    height: 1,
    backgroundColor: "gray"
  },
});