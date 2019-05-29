/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import {
  StyleSheet, View,
} from 'react-native';

export default class ActivityBar extends Component {
  render() {
    let { activityLevel, barWidth } = this.props;

    barWidth = parseInt(barWidth);

    if (activityLevel === 'N/A') {
      return (
        <View style={[styles.outside, { width: barWidth }, { backgroundColor: 'gray' }]} />
      );
    }
    else {
      activityLevel += '%';

      return (
        <View style={[styles.outside, { width: barWidth }]}>
          <View style={[styles.filler, { width: activityLevel }]} />
        </View>
      );
    }

  }
}

const styles = StyleSheet.create({
  outside: {
    position: 'relative',
    height: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'gray',
  },
  filler: {
    backgroundColor: '#108BF8',
    height: '100%',
    borderRadius: 4,
    opacity: 0.5,
  },
});

module.exports = ActivityBar;
