import React, {Component} from "react";
import {FlatList, StyleSheet, Text, TouchableOpacity, ScrollView, View,} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";


export default class Contact extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <View style={styles.contactList}>
        <View>
          <Icon name="ios-person" color={this.props.contact.color} size={50}/>
        </View>
        <View style={styles.contact}>
          <Text style={{color: this.props.contact.color}}>
            {this.props.contact.name}
          </Text>
          <Text style={styles.number}>
            {this.props.contact.number}
          </Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  contactList: {
    margin: 10,
    flexDirection: 'row',
  },

  contact: {
    paddingTop: 7,
    paddingLeft: 5,
  },
  number: {
    color: 'grey',
  },
});