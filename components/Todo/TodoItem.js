import {StyleSheet, Text, View, TextInput} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import React, {Component} from "react";



export default class TodoItem extends Component {

  _handleToggleComplete = () => {
    this.props.toggleComplete(this.props.item.key);
  };

  _handleEditStart = () => {
    this.props.onEditStart(this.props.item.key)
  };

  _handleTextChange = (text) => {
    this.props.onTextEdit(text, this.props.item);
  };

  _handleDeleteTask = () => {
    this.props.onDeleteClick(this.props.item);
  };

  render() {
    let item = this.props.item;
    return (
      <View>
        <View style={styles.itemContainer}>
          {(this.props.selected === this.props.item.key) ?
            <View style={{flexDirection: "row"}}>
              <Icon style={styles.button} name="ios-close"  color={item.color} size={50}
                    onPress={this._handleDeleteTask}/>
              <TextInput
                value={this.props.item.text}
                onChangeText={this._handleTextChange}
                style={styles.item}
              />
            </View>

         :
          <Text
            onPress={this._handleEditStart}
            style={item.completed ? styles.itemCompleted : styles.item}>
            {item.text}
          </Text>
          }
          <Icon style={styles.button} name={item.completed ? "ios-checkmark-circle": "ios-radio-button-off"}  color={item.color} size={50}
                onPress={this._handleToggleComplete}/>
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
    marginLeft: 5,
    marginRight: 5,
  },
  hr: {
    marginTop: 5,
    marginBottom: 5,
    height: 1,
    backgroundColor: "gray"
  },
});