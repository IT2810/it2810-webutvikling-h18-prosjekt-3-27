import React, {PureComponent} from "react";
import { Agenda } from 'react-native-calendars';
import AddEvent from "./AddEvent";
import Event from "./Event";
import AgendaPersistence from "./AgendaPersistence";

export default class CalendarScreen extends PureComponent {

  static navigationOptions = {
    title: "Calendar",
    headerTitleStyle: {
      textAlign: "center",
      flex: 1
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      items: {}
    };
  }

  componentDidMount() {
    this.loadAgenda();
  }

  /**
   * Asynchronously loads all items in persistent storage from
   * a AsyncStorage wrapper
   *
   * @returns {Promise<void>}
   */
  async loadAgenda() {
    try {
      const items = await AgendaPersistence.getAllItems();
      // for each day, add aux isLastButton object to end of list
      for (let key of Object.keys(items)) {
        // convert date string into date object
        items[key].forEach(agendaObject => agendaObject.date = new Date(agendaObject.date));
        const date = new Date(items[key][0].date.getTime());
        items[key].push({isLastButton: true, date: date});
      }
      this.setState(prevState => {
        const oldItems = {...prevState.items};
        return {items: Object.assign({}, oldItems, items)};
      });
    } catch (e) {
      console.error(e);
    }
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
        renderItem={this.renderItem.bind(this)}
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        loadItemsForMonth={this.loadItemsForMonth.bind(this)}
        rowHasChanged={CalendarScreen.rowHasChanged}
        firstDay={1}

        // styling
        theme={{
          selectedDayBackgroundColor: "#299c25",
          todayTextColor: "#005f1d",
          dotColor: '#15a800',
          selectedDotColor: '#ffffff',
          //monthTextColor: '#f0d',
          //agendaDayTextColor: "#6fbf81",
          agendaDayNumColor: "#56505d",
          agendaTodayColor: "#000000",
          agendaKnobColor: "#28bd10"
        }}
      />
    );
  }

  /**
   * How to render a single event/agenda on the agenda view
   *
   * @param item the item to render
   * @returns {*} a React component
   */
  renderItem(item) {
    if (item.isLastButton) {
      return (
        <AddEvent
          date={item.date}
          onAddAgenda={this.navigateToAddAgenda}
        />
      );
    }
    return (
      <Event
        event={item}
        onEventPress={this.navigateToEditAgenda}
      />
    );
  }

  /**
   * What to render when a day has no events
   *
   * @param date the date that has no events
   * @returns {*} a React component
   */
  renderEmptyDate(date) {
    // input example: 2018-10-11T18:20:41.180Z
    return (
      <AddEvent
        date={date}
        onAddAgenda={this.navigateToAddAgenda}
      />
    );
  }

  /**
   * Performance enhancing comparison check, compares two data items (events)
   *
   * @param r1 the first event
   * @param r2 the second event
   * @returns {boolean} true if the event items differ in content, false otherwise
   */
  static rowHasChanged(r1, r2) {
    return r1.name !== r2.name || r1.note !== r2.note;
  }

  /**
   * Takes in a parseable time, and outputs the date in string format
   *
   * @param time a timestring that can be parsed by the Date API
   * @returns {string} the date (year, month, day) only as readable string
   */
  static timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }

  /**
   * Handle navigation to event creation screen
   *
   * @param date the date to add an event to
   */
  navigateToAddAgenda = (date) => {
    // navigate to an add item screen
    this.props.navigation.navigate("AddAgenda", {
      date: date,
      addAgenda: this.addNewItem.bind(this)
    });
  };

  /**
   * Add new event to the state and persistent storage
   *
   * @param item the event to add
   * @returns {Promise<void>} resolves when the item has been added
   */
  async addNewItem(item) {
    const key = CalendarScreen.timeToString(item.date.getTime());
    item.id = await AgendaPersistence.getAndIncrementId();
    this.setState(prevState => {
      const itemsCopy = {...prevState.items};
      if (!(key in itemsCopy)) {
        itemsCopy[key] = [];
      }
      itemsCopy[key].pop();
      itemsCopy[key].push(item);
      itemsCopy[key].push({date: item.date, isLastButton: true});
      return {items: itemsCopy};
    });
    await AgendaPersistence.saveAgenda(item);
  }

  /**
   * Navigate to a screen for editing an event
   *
   * @param item the event data object that will be edited by the user
   */
  navigateToEditAgenda = (item) => {
    // navigate to an edit item screen
    this.props.navigation.navigate("EditAgenda", {
      item: item,
      editAgenda: this.editItem.bind(this),
      removeAgenda: this.deleteItem.bind(this)
    });
  };

  /**
   * Updates an item in the state and persistent storage
   *
   * @param item the event to update
   */
  editItem(item) {
    const key = CalendarScreen.timeToString(item.date.getTime());
    this.setState(prevState => {
      const itemsCopy = {...prevState.items};
      if (!(key in itemsCopy)) {
        console.warn(`Editing item ${item}, but it doesn't exist in the item state`);
        return {};
      }
      const arrayCopy = [...itemsCopy[key]];
      // find index of this item
      let index;
      if ((index = arrayCopy.findIndex(element => {
        return element.id === item.id;
      })) !== -1) {
        arrayCopy[index] = item;
      }
      itemsCopy[key] = arrayCopy;
      return {items: itemsCopy};
    });
    AgendaPersistence.saveAgenda(item);
  }

  /**
   * Deletes an event from state and persistent storage
   * @param item the event to delete
   */
  deleteItem(item) {
    const key = CalendarScreen.timeToString(item.date.getTime());
    this.setState(prevState => {
      const itemsCopy = {...prevState.items};
      if (!(key in itemsCopy)) {
        console.warn(`Deleting item ${item}, but it doesn't exist in the item state`);
        return {};
      }
      const arrayCopy = [...itemsCopy[key]];
      // find index of this item
      let index;
      if ((index = arrayCopy.findIndex(element => element.id === item.id)) !== -1) {
        arrayCopy.splice(index, 1);
      }
      itemsCopy[key] = arrayCopy;
      return {items: itemsCopy};
    });
    AgendaPersistence.deleteAgenda(item);
  }
}
