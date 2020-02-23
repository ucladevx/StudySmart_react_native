import React, { Component } from 'react';
import {
  SafeAreaView, StyleSheet, FlatList,
} from 'react-native';
import TimeRangeCard from '../../components/TimeRangeCard';

const hours = [...Array(24).keys()];

const timeRanges = {
  '12:00-1:00am': [0, 1],
  '1:00-2:00am': [1, 2],
  '2:00-3:00am': [2, 3],
  '3:00-4:00am': [3, 4],
  '4:00-5:00am': [4, 5],
  '5:00-6:00am': [5, 6],
  '6:00-7:00am': [6, 7],
  '7:00-8:00am': [7, 8],
  '8:00-9:00am': [8, 9],
  '9:00-10:00am': [9, 10],
  '10:00-11:00am': [10, 11],
  '11:00am-12:00pm': [11, 12],
  '12:00-1:00pm': [12, 13],
  '1:00-2:00pm': [13, 14],
  '2:00-3:00pm': [14, 15],
  '3:00-4:00pm': [15, 16],
  '4:00-5:00pm': [16, 17],
  '5:00-6:00pm': [17, 18],
  '6:00-7:00pm': [18, 19],
  '7:00-8:00pm': [19, 20],
  '8:00-9:00pm': [20, 21],
  '9:00-10:00pm': [21, 22],
  '10:00-11:00pm': [22, 23],
  '11:00pm-midnight': [23, 0],
};

class ClassroomsPreview extends Component {
  static navigationOptions = {
    header: () => { }
  }

  renderRow(item) {
    const { available } = this.props;
    const firstHour = available[item][0];
    const secondHour = available[item][30];
    const first = firstHour !== undefined ? firstHour : [];
    const second = secondHour !== undefined ? secondHour : [];
    const total = first.concat(second);

    const titles = Object.keys(timeRanges);

    if (total.length > 0) {
      return (
        <TimeRangeCard
          title={titles}
          available={total}
          hour={first}
          half={second}
        />
      );
    }
    return null;
  }

  render() {
    const { available } = this.props;

    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={hours}
          extraData={available}
          renderItem={({ item }) => this.renderRow(item)}
          keyExtractor={(item, index) => index.toString()}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
});

export default ClassroomsPreview;
