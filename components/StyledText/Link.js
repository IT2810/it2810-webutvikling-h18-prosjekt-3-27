import React, {Component} from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from "react-native";

export default class Link extends Component {

  getStylesArrayFromProps() {
    return this.props.style || [];
  }

  render() {
    return (
      <Text
        onPress={this.props.onPress}
        style={[...this.getStylesArrayFromProps(), styles.linkText]}>
        {this.props.children}
      </Text>
    );
  }
}

const styles = StyleSheet.create({
  linkText: {
    color: '#2e78b7',
    textDecorationLine: "underline"
  }
});
