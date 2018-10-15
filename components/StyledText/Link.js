import React, {PureComponent} from "react";
import {
  Text,
  StyleSheet
} from "react-native";

export default class Link extends PureComponent {

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
