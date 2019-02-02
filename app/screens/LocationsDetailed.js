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
          style={{width:width, height:width,}}
          source={{ uri: item.Image_URL }}
        />
        <View style={styles.information}>
          <Text style={styles.Name}>{item.Name}</Text>

          {/* NEED TO CHANGE TO A PROGRESS BAR  */}
          <Text style={styles.Activity_Level_TEMPORARY}>
Activity Level:
            {' '}
            {item.Activity_Level}
%
          </Text>
          <View style = {styles.hours}>
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
        </View>
      </ScrollView>
    );
  }
}

/* Standardized text used throughout code */
const text = {
  fontFamily: 'System',
  letterSpacing: 1.92,
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection:'column',
  },
  information: {
    padding:20,
    flexDirection: 'column',
    justifyContent:'flex-end',
  },
  Name: {
    ...text,
    fontWeight: 'bold',
    fontSize: 25,
    color: '#000',
    textAlign: 'left',
    flex:1,
  },
  Activity_Level_TEMPORARY: {
    color:'#5e5b59',
    textAlign: 'left',
    paddingTop: 10,
    paddingBottom:30,
    fontSize: 15,
    flex:1,
  },
  hours:{
    flex:1,
  },
  Section_Header: {
    ...text,
    fontWeight:'bold',
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
