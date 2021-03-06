/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import {
  StyleSheet, View,
} from 'react-native';

export default class ActivityBar extends Component {
  render() {
    let { activityLevel, barWidth } = this.props;

    barWidth = parseInt(barWidth, 10);
    if (activityLevel !== 'N/A') {
      // Cap Activity Level at 100%
      if (parseInt(activityLevel, 10) >= 100) {
        activityLevel = '100';
      }
      activityLevel += '%';
    }

    return (
      activityLevel === 'N/A'
        ? (
          <View style={[styles.outside, { width: barWidth }, { backgroundColor: 'gray' }]} />
        )
        : (
          <View style={[styles.outside, { width: barWidth }]}>
            <View style={[styles.filler, { width: activityLevel }]} />
          </View>
        )
    );
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
