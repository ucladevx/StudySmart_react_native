import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

export default class StatusBarBackground extends Component {
  render() {
    return (
      <View style={[styles.statusBarBackground, this.props.style || {}]} />
    );
  }
}

const styles = StyleSheet.create({

  statusBarBackground: {
    height: 20,
    backgroundColor: 'white'
  }

});

module.exports = StatusBarBackground;
