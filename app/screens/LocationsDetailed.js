import React, { Component } from 'react';
import {
  StyleSheet, Text, ScrollView, Image, View, Dimensions
} from 'react-native';

import { IMG_TEMP, _getHours } from './LocationsList';

const width = Dimensions.get('window').width;

export default class LocationsDetailed extends Component {
  render() {
    /* Get item that was clicked */
    const item = this.props.navigation.getParam('locationClicked', 'NO-ITEM');
    console.log(item);

    /* Calculate time */
    const millis = new Date();
    const today = millis.getDay();

    /* 0-6 = Sunday-Saturday */
    return (
      <ScrollView style={styles.container}>
        <Image
          style={{ width, height: width, }}
          source={{ uri: IMG_TEMP }}
        />
        <View style={styles.information}>
          <Text style={styles.Name}>
            {item.name.S}
          </Text>
          <Text style={styles.Activity_Level_TEMPORARY}>
              Activity Level: 0%
          </Text>
          <View style={styles.hours}>
            <Text style={styles.Section_Header}>Hours:</Text>
            <Text style={today == 0 ? styles.currentDay : styles.normalDay}>
                  Sunday:
              {' '}
              {_getHours(item, 0)}
            </Text>
            <Text style={today == 1 ? styles.currentDay : styles.normalDay}>
                  Monday:
              {' '}
              {_getHours(item, 1)}
            </Text>
            <Text style={today == 2 ? styles.currentDay : styles.normalDay}>
                  Tuesday:
              {' '}
              {_getHours(item, 2)}
            </Text>
            <Text style={today == 3 ? styles.currentDay : styles.normalDay}>
                  Wednesday:
              {' '}
              {_getHours(item, 3)}
            </Text>
            <Text style={today == 4 ? styles.currentDay : styles.normalDay}>
                  Thursday:
              {' '}
              {_getHours(item, 4)}
            </Text>
            <Text style={today == 5 ? styles.currentDay : styles.normalDay}>
                  Friday:
              {' '}
              {_getHours(item, 5)}
            </Text>
            <Text style={today == 6 ? styles.currentDay : styles.normalDay}>
                  Saturday:
              {' '}
              {_getHours(item, 6)}
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

/* Standardized text used throughout code */
const text = {
  fontFamily: 'System',
  letterSpacing: 1.92,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'column',
  },
  information: {
    padding: 20,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  Name: {
    ...text,
    fontWeight: 'bold',
    fontSize: 25,
    color: '#000',
    textAlign: 'left',
    flex: 1,
  },
  Activity_Level_TEMPORARY: {
    color: '#5e5b59',
    textAlign: 'left',
    paddingTop: 10,
    paddingBottom: 30,
    fontSize: 15,
    flex: 1,
  },
  hours: {
    flex: 1,
  },
  Section_Header: {
    ...text,
    fontWeight: 'bold',
    fontSize: 20,
    color: '#000',
    textAlign: 'left',
    paddingBottom: 5,
  },
  currentDay: {
    fontWeight: 'bold',
  },
  normalDay: {
  }
});

module.exports = LocationsDetailed;
