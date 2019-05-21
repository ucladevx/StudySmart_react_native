/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import {
  StyleSheet, Text, View, Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

export default class Hours extends Component {
  render() {
    const { item, getLibraryHours } = this.props;

    /* Calculate time */
    const millis = new Date();
    const today = millis.getDay();

    /* 0-6 = Sunday-Saturday */
    return (
      <View style={styles.information}>
        <View style={styles.hours}>
          <Text style={today === 0 ? styles.currentDay : styles.normalDay}>
            Sunday:
            {' '}
            {getLibraryHours(item, 0)}
          </Text>
          <Text style={today === 1 ? styles.currentDay : styles.normalDay}>
            {'Monday: '}
            {getLibraryHours(item, 1)}
          </Text>
          <Text style={today === 2 ? styles.currentDay : styles.normalDay}>
            {'Tuesday: '}
            {getLibraryHours(item, 2)}
          </Text>
          <Text style={today === 3 ? styles.currentDay : styles.normalDay}>
            {'Wednesday: '}
            {getLibraryHours(item, 3)}
          </Text>
          <Text style={today === 4 ? styles.currentDay : styles.normalDay}>
            {'Thursday: '}
            {getLibraryHours(item, 4)}
          </Text>
          <Text style={today === 5 ? styles.currentDay : styles.normalDay}>
            {'Friday: '}
            {getLibraryHours(item, 5)}
          </Text>
          <Text style={today === 6 ? styles.currentDay : styles.normalDay}>
            {'Saturday: '}
            {getLibraryHours(item, 6)}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  information: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  Activity_Level_TEMPORARY: {
    color: '#5e5b59',
    textAlign: 'left',
    paddingTop: 10,
    paddingBottom: 30,
    fontSize: 16,
    flex: 1,
  },
  hours: {
    width,
    paddingLeft: 18,
    paddingTop: 10,
  },
  currentDay: {
    fontWeight: '500',
  },
  normalDay: {
    fontWeight: '100',
  }
});

module.exports = Hours;
