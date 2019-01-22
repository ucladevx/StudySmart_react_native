import React, { Component } from 'react';
import {
  StyleSheet, Text, ScrollView, Image, View, Dimensions
} from 'react-native';


const width = Dimensions.get('window').width;

export default class LocationsDetailed extends Component {
  constructor(props) {
    super(props);
    this.params = this.props.navigation.state.params;
  }

  // eslint-disable-next-line class-methods-use-this
  _generateHourString(openTime, closeTime) {
    let hour_string = '';
    if (openTime == 0 && closeTime == 0) {
      return '24 Hours';
    }
    if (openTime >= 0 && openTime < 11) {
      if (openTime == 0) {
        openTime = 12;
      }
      hour_string += openTime;
      hour_string += ' am - ';
    } else if (openTime == -1) {
      // closed for the day
      return 'CLOSED TODAY';
    } else {
      // convert 24 hour time to 12 hour
      if (openTime > 12 && openTime < 24) {
        openTime -= 12;
        hour_string += openTime;
        hour_string += ' pm - ';
      } else if (openTime == 24) {
        hour_string += '12 am - ';
      }
    }

    if (closeTime >= 0 && closeTime < 11) {
      hour_string += closeTime;
      hour_string += ' am';
    } else if (closeTime == -1) {
      // closed for the day
      return 'CLOSED TODAY';
    } else {
      // convert 24 hour time to 12 hour
      if (closeTime > 12 && closeTime < 24) {
        closeTime -= 12;
        hour_string += closeTime;
        hour_string += ' pm';
      } else if (closeTime == 24) {
        hour_string += '12 am';
      }
    }
    return hour_string;
  }

  render() {
    // const { navigate } = this.params.navigation;
    const { item } = this.props.navigation.state.params;
    const options = { weekday: 'long' };
    const current = new Date();
    const prnDt = current.toLocaleTimeString('en-us', options);
    const DayOfTheWeek = prnDt.substring(0, prnDt.indexOf(' '));
    return (
      <ScrollView style={styles.container}>
        <Image
          style={{
            width, height: width, resizeMode: 'contain', marginBottom: 15
          }}
          source={{ uri: item.Image_URL }}
        />
        <View style={styles.information}>
          <Text style={styles.Name}>{item.Name}</Text>

          {/* NEED TO CHANGE TO A PROGRESS BAR  */}
          <Text style={styles.Section_Header}>
Activity Level:
            {' '}
            {item.Activity_Level}
%
          </Text>

          <Text style={styles.Section_Header}>Hours:</Text>
          <Text style={DayOfTheWeek == 'Monday' ? styles.currentDay : styles.normalDay}>
Monday:
            {' '}
            {this._generateHourString(item.MondayOpen, item.MondayClosed)}
          </Text>
          <Text style={DayOfTheWeek == 'Tuesday' ? styles.currentDay : styles.normalDay}>
Tuesday:
            {' '}
            {this._generateHourString(item.TuesdayOpen, item.TuesdayClosed)}
          </Text>
          <Text style={DayOfTheWeek == 'Wednesday' ? styles.currentDay : styles.normalDay}>
Wednesday:
            {' '}
            {this._generateHourString(item.WednesdayOpen, item.WednesdayClosed)}
          </Text>
          <Text style={DayOfTheWeek == 'Thursday' ? styles.currentDay : styles.normalDay}>
Thursday:
            {' '}
            {this._generateHourString(item.ThursdayOpen, item.ThursdayClosed)}
          </Text>
          <Text style={DayOfTheWeek == 'Friday' ? styles.currentDay : styles.normalDay}>
Friday:
            {' '}
            {this._generateHourString(item.FridayOpen, item.FridayClosed)}
          </Text>
          <Text style={DayOfTheWeek == 'Saturday' ? styles.currentDay : styles.normalDay}>
Saturday:
            {' '}
            {this._generateHourString(item.SaturdayOpen, item.SaturdayClosed)}
          </Text>
          <Text style={DayOfTheWeek == 'Sunday' ? styles.currentDay : styles.normalDay}>
Sunday:
            {' '}
            {this._generateHourString(item.SundayOpen, item.SundayClosed)}
          </Text>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e0e0e0',
  },
  information: {
    marginLeft: 10,
    marginRight: 10,
  },
  Name: {
    fontSize: 30,
    color: '#000',
    textAlign: 'left',
  },
  Section_Header: {
    fontSize: 20,
    color: '#000',
    textAlign: 'left',
    marginTop: 10,
    marginBottom: 10,
  },
  Activity_Level_TEMPORARY: {
    textAlign: 'center',
    fontSize: 15,
    fontStyle: 'italic',
  },
  currentDay: {
    fontWeight: 'bold',
  },
  normalDay: {

  }
});

module.exports = LocationsDetailed;
