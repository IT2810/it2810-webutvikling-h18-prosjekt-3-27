import React, {Component} from "react";
import {
  AsyncStorage,
  FlatList,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import randomColor from "randomcolor";

export default class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      completedTasks: [],
      text: ""
    };
    this._handleAddTask = this._handleAddTask.bind(this);
    this._handleDeleteTask = this._handleDeleteTask.bind(this);
  }

  componentDidMount() {
    Tasks._load(tasks => this.setState({ tasks: tasks || [] }));// this.setState({ tasks: tasks || [] }))
  }

  _handleAddTask = () => {
    if (this.state.text.length > 0) {
      this.setState(
        prevState => {
          let {tasks, text} = prevState;
          return {
            tasks: tasks.concat({
              key: tasks.length,
              text: text,
              completed: false,
              color: randomColor({luminosity: 'dark', hue: "green"})
            }),
            text: ""
          };
        },
        () => Tasks._save(this.state.tasks)
      );
    }
  };

  _handleDeleteTask = index => {
    this.setState(
      prevState => {
        let tasks = [...prevState.tasks.slice()];
        tasks[index].completed = true;
        let completedTasks = [...prevState.completedTasks.slice()];
        let completedTask = tasks.splice(index, 1);
        return {tasks: tasks, completedTasks: completedTasks.concat(completedTask)};
      },
      () => Tasks._save(this.state.tasks)
    );
  };


  render() {
    return (
      <View
        style={styles.container}
      >
        <ScrollView>
          <FlatList
            style={styles.list}
            data={this.state.tasks}
            keyExtractor={(item) => item.key.toString()}
            renderItem={({item, index}) =>
              <View>
                <View style={styles.itemContainer}>
                  <Text style={styles.item}>
                    {item.text}
                  </Text>
                  <Icon style={styles.button} name="ios-checkmark-circle" color={item.color} size={50}
                        onPress={() => this._handleDeleteTask(index)}/>
                </View>
                <View style={styles.hr}/>
              </View>}
          />
        </ScrollView>

        <KeyboardAvoidingView behavior="position">
          <Text
            style={{textAlign: "center"}}>{this.state.completedTasks.length}/{this.state.tasks.length + this.state.completedTasks.length}</Text>
          <TextInput
            ref="input"
            style={styles.textInput}
            onChangeText={text => this.setState({text: text})}
            onSubmitEditing={this._handleAddTask}
            blurOnSubmit={false}
            value={this.state.text}
            placeholder="Add task.."
            autoCorrect={false}
            autoFocus
          />
        </KeyboardAvoidingView>
      </View>
    );
  }


}

let Tasks = {
  convertToArrayOfObject(tasks, callback) {
    return callback(
      tasks ? JSON.parse(tasks).map((task) => ({
        key: task.key,
        text: task.text,
        completed: task.completed,
        color: task.color
      })) : []
    );
  },
  _load(callback) {
    return AsyncStorage.getItem("TASKS", (err, tasks) =>
      this.convertToArrayOfObject(tasks, callback)
    );
  },
  _save(tasks) {
    AsyncStorage.setItem("TASKS", JSON.stringify(tasks));
  }
};


const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    height: "100%",
  },
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
  button: {
    marginRight: 5,
  },
  hr: {
    marginTop: 5,
    marginBottom: 5,
    height: 1,
    backgroundColor: "gray"
  },

  textInput: {
    textAlign: "center",
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    marginBottom: 5,
    fontSize: 25,
    height: 50,
  }
});
