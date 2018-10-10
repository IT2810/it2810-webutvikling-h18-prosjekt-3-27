import {Component} from 'react';
import {FlatList, View} from "react-native";
import TodoItem from "./TodoItem";
import React from "react";


export default class SortedList extends Component {
  getSortedTasks = () => {
    let tasksCopy = this.props.tasks;
    tasksCopy.sort((a, b) => {
      if (a.completed === b.completed) {
        return 0;
      }
      if (a.completed) {
        return 1;
      }
      return -1;
    });
    return tasksCopy;
  };


  render() {
    return (
      <FlatList
        data={this.getSortedTasks()}
        keyExtractor={(item) => item.key}
        keyboardShouldPersistTaps="always"
        extraData={this.props.selected}
        renderItem={({item, index}) =>
          <View>
            <TodoItem
              item={item}
              index={index}
              selected={this.props.selected}
              onDeleteTask={this.props.onDeleteTask}
              onTextEdit={this.props.onTextEdit}
              onEditStart={this.props.onEditStart}
              onEditFinish={this.props.onEditFinish}
              toggleComplete={this.props.toggleComplete}/>
          </View>
        }
      />
    )
  }

}