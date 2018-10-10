import React, {Component} from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { Agenda } from 'react-native-calendars';
import AgendaPersistence from "./AgendaPersistence";

class CalendarScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {}
    };
  }

  componentDidMount() {
    /*
    const d = new Date("2018-10-01");
    this.loadItems({
      dateString: d.dateString,
      day: d.getDay(),
      month: d.getMonth() + 1,
      timestamp: d.getTime(),
      year: d.getFullYear()
    });
    */
    //this.loadAgenda();
  }

  async loadAgenda() {
    const items = await AgendaPersistence.getAllItems();
    // TODO: set state
  };

  /**
   * Called when the calendar wants items to be loaded,
   * an empty array means there are no agendas for that
   * day. No value indicates that the items are still
   * loading.
   *
   * @param dayInMonth a day in the month that must be loaded
   */
  loadItemsForMonth(dayInMonth) {
    let date = new Date(dayInMonth.dateString);
    date.setDate(1);
    this.setState(prevState => {
      const itemsCopy = {...prevState.items};
      while (date.getMonth() + 1 === dayInMonth.month) {
        // fill the state with empty arrays for each day
        const key = CalendarScreen.timeToString(date.getTime());
        if (!(key in itemsCopy)) {
          itemsCopy[key] = [];
        }
        console.debug(key);
        // advance day by one day
        date.setDate(date.getDate() + 1);
      }
      return {items: itemsCopy};
    });
  };

  render() {
    return (
      <Agenda
        style={{minHeight: 200}}
        items={this.state.items}
        minDate={'2018-08-01'}
        maxDate={'2018-12-31'}
        renderItem={this.renderItem.bind(this)}
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        loadItemsForMonth={this.loadItemsForMonth.bind(this)}
        rowHasChanged={CalendarScreen.rowHasChanged}
        firstDay={1}
      />
    );
  }

  loadItems(day) {
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = CalendarScreen.timeToString(time);
        if (!this.state.items[strTime]) {
          this.state.items[strTime] = [];
          const numItems = Math.floor(Math.random() * 5);
          for (let j = 0; j < numItems; j++) {
            this.state.items[strTime].push({
              name: 'Item for ' + strTime,
              height: Math.max(50, Math.floor(Math.random() * 150))
            });
          }
        }
      }
      // console.log(this.state.items);
      const newItems = {};
      Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
      this.setState({
        items: newItems
      });
    }, 400);
    //console.log(`Load Items for ${day.dateString}`);
  }

  renderItem(item) {
    return (
      <TouchableOpacity
        style={[styles.item, {height: item.height}]}
        onPress={() => this.navigateToEditAgenda(item)}
      >
        <Text>{item.name}</Text>
      </TouchableOpacity>
    );
  }

  renderEmptyDate(date) {
    // input example: 2018-10-11T18:20:41.180Z
    const d = new Date(date);
    return (
      <TouchableOpacity
        style={styles.emptyDate}
        onPress={() => this.navigateToAddAgenda(date)}
      >
        <Text>+</Text>
      </TouchableOpacity>
    );
  }

  static rowHasChanged(r1, r2) {
    return r1.name !== r2.name || r1.note !== r2.note;
  }

  static timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }

  navigateToAddAgenda(date) {
    // navigate to an add item screen
    console.debug("Add new item on date: ", date);
    // TODO: navigate, use callback
    this.props.navigation.navigate("AddAgenda", {
      date: date,
      addAgenda: this.addNewItem.bind(this)
    });
  }

  addNewItem(item) {
    console.debug("Add new item: ", item);
  }

  navigateToEditAgenda(item) {
    // navigate to an edit item screen
    console.debug("Edit item screen of item: ", item);
    // TODO: navigate, use callback
    this.props.navigation.navigate("EditAgenda", {
      item: item,
      editAgenda: this.editItem.bind(this),
      removeAgenda: this.deleteItem.bind(this)
    });
  }

  editItem(item) {
    console.debug("EditItem: ", item);
  }

  deleteItem(item) {
    console.debug("Delete item: ", item)
  }
}

export default CalendarScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    backgroundColor: "#5fff5c",
    height: 15,
    flex:1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginTop: 20
  }
});
