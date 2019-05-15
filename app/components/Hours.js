/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import {
  StyleSheet, Text, ScrollView, Image, View, Dimensions,
} from 'react-native';

import { IMG_TEMP, getLibraryHours } from '../screens/LocationsList';

const { width } = Dimensions.get('window');

export default class Hours extends Component {
  render() {
    /* Get item that was clicked */
    // const item = this.props.navigation.getParam('locationClicked', 'NO-ITEM');
    const { item } = this.props;
    // console.log(item);

    /* Calculate time */
    const millis = new Date();
    const today = millis.getDay();

    /* 0-6 = Sunday-Saturday */
    return (
      <View style={styles.information}>
        {/* <Text style={styles.Activity_Level_TEMPORARY}>
              Activity Level: 0%
          </Text> */}
        <View style={styles.hours}>
          <Text style={today == 0 ? styles.currentDay : styles.normalDay}>
            Sunday:
              {' '}
            {getLibraryHours(item, 0)}
          </Text>
          <Text style={today == 1 ? styles.currentDay : styles.normalDay}>
            Monday:
              {' '}
            {getLibraryHours(item, 1)}
          </Text>
          <Text style={today == 2 ? styles.currentDay : styles.normalDay}>
            Tuesday:
              {' '}
            {getLibraryHours(item, 2)}
          </Text>
          <Text style={today == 3 ? styles.currentDay : styles.normalDay}>
            Wednesday:
              {' '}
            {getLibraryHours(item, 3)}
          </Text>
          <Text style={today == 4 ? styles.currentDay : styles.normalDay}>
            Thursday:
              {' '}
            {getLibraryHours(item, 4)}
          </Text>
          <Text style={today == 5 ? styles.currentDay : styles.normalDay}>
            Friday:
              {' '}
            {getLibraryHours(item, 5)}
          </Text>
          <Text style={today == 6 ? styles.currentDay : styles.normalDay}>
            Saturday:
              {' '}
            {getLibraryHours(item, 6)}
          </Text>
        </View>
      </View>
    );
  }
}

/* Standardized text used throughout code */
const text = {
  fontFamily: 'System',
  letterSpacing: 1.92,
};

const styles = StyleSheet.create({
  information: {
    // padding: 20,
    flexDirection: 'column',
    justifyContent: 'flex-end',
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
    // flex: 1,
    width,
    paddingLeft: 25,
    paddingRight: 25,
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
